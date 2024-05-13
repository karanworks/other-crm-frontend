import { createSlice, current } from "@reduxjs/toolkit";
import { getDesign, createDesign, removeDesign, updateDesign } from "./thunk";
import { toast } from "react-toastify";

export const initialState = {
  designData: [],
  departments: [],
  design: [],
  alreadyExistsError: null,
  error: "",
  selectedIvrCampaignId: null,
  departmentNumbers: null,
};

const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    changeIvrCampaign(state, action) {
      const selectedCampaign = state.designData.ivrCampaigns?.find(
        (campaign) => campaign.ivrCampaignName === action.payload
      );

      if (selectedCampaign) {
        state.selectedIvrCampaignId = selectedCampaign.id;

        const numbersOfIvrCamapaign = state.designData?.ivrCampaigns?.find(
          (campaign) => campaign.id === state.selectedIvrCampaignId
        );

        if (numbersOfIvrCamapaign && numbersOfIvrCamapaign.numbers) {
          state.numbers = numbersOfIvrCamapaign.numbers;

          const departments = numbersOfIvrCamapaign.numbers.map((number) => {
            return number.department;
          });

          const uniqueDepartments = departments.filter(
            (department, index, self) => index === self.indexOf(department)
          );

          state.departments = uniqueDepartments;
        } else {
          state.departments = [];
        }
      } else {
        state.selectedIvrCampaignId = null;
        state.departments = [];
      }
    },

    changeDepartment(state, action) {
      console.log(
        "results after changing department ->",
        current(state.designData)
      );

      const selectedCampaign = state.designData.ivrCampaigns.find(
        (campaign) => {
          return campaign.id === state.selectedIvrCampaignId;
        }
      );

      const numbers = selectedCampaign?.numbers
        .map((number) => {
          if (number.department === action.payload) {
            return { name: number.name, number: number.number };
          }
        })
        .filter((num) => num !== undefined);

      state.departmentNumbers = numbers;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDesign.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.designData = action.payload?.data;
        state.error = "";
      }
    });
    builder.addCase(createDesign.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.alreadyExistsError = action.payload.message;
        state.error = "";
      } else {
        state.alreadyExistsError = null;
        state.error = "";

        const newItem = action.payload.data; // Assuming action.payload.data contains the new item returned from the backend

        const parentId = newItem.parentId; // Assuming the parent ID is included in the new item

        // Check if designs array exists in designData
        if (state.designData.designs) {
          // If parentId is null, push the new item directly into designs array
          if (parentId === null) {
            state.designData.designs.push(newItem);
          } else {
            // Find the parent item
            const findParent = (items) => {
              for (let i = 0; i < items?.length; i++) {
                if (items[i].id === parentId) {
                  return items[i];
                } else if (items[i].items?.length > 0) {
                  const parent = findParent(items[i].items);
                  if (parent) return parent;
                }
              }
              return null;
            };

            // Find the parent
            const parent = findParent(state.designData.designs);

            // If parent is found
            if (parent) {
              if (parent.items === null) {
                parent.items = [];
              }

              if (Array.isArray(newItem.numbers)) {
                newItem.numbers.forEach((item) => {
                  parent.items.push(item);
                });
              } else {
                parent.items.push(newItem);
              }

              toast.success("IVR Design has been added !", {
                position: "bottom-center",
                autoClose: 3000,
                theme: "colored",
              });
            } else {
              console.log("Parent not found!");
            }
          }
        } else {
          console.log("Designs array not found!");
        }
      }
    });

    builder.addCase(updateDesign.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.alreadyExistsError = action.payload.message;
        state.error = "";
      } else {
        const updatedDesign = action.payload.data.updatedDesign;
        console.log("DESIGN AFTER UPDATION", updatedDesign);

        if (updatedDesign.parentId === null) {
          state.designData = {
            ...state.designData,
            designs: state.designData.designs.map((design) => {
              if (design.id === updatedDesign.id) {
                return updatedDesign;
              } else {
                return design;
              }
            }),
          };
        } else {
          state.designData = {
            ...state.designData,
            designs: updateParentWithUpdatedChildren(
              state.designData.designs,
              updatedDesign
            ),
          };
        }

        state.alreadyExistsError = null;
        state.error = "";
        toast.success("Design details updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(removeDesign.fulfilled, (state, action) => {
      state.error = "";

      const deletedItem = action.payload.data.deletedParent;

      if (!deletedItem.parentId) {
        state.designData = {
          ...state.designData,
          designs: state.designData.designs.filter(
            (design) => design.id !== deletedItem.id
          ),
        };
      } else {
        state.designData = {
          ...state.designData,
          designs: state.designData.designs.map((design) => {
            const updatedItems = removeItemFromDesign(
              design.items,
              deletedItem.id
            );
            return { ...design, items: updatedItems };
          }),
        };

        toast.error("Design has been removed!", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
  },
});

function updateParentWithUpdatedChildren(designs, updatedItem) {
  return designs.map((design) => {
    if (design.id === updatedItem.parentId) {
      return {
        ...design,
        items: updateChildren(design.items, updatedItem),
      };
    } else if (design.items) {
      return {
        ...design,
        items: updateParentWithUpdatedChildren(design.items, updatedItem),
      };
    } else {
      return design;
    }
  });
}

function updateChildren(items, updatedItem) {
  return items.map((item) => {
    if (item.id === updatedItem.id) {
      return updatedItem;
    } else if (item.items) {
      return {
        ...item,
        items: updateChildren(item.items, updatedItem),
      };
    } else {
      return item;
    }
  });
}

function removeItemFromDesign(items, deleteId) {
  return items
    .map((item) => {
      // If the current item's ID matches the deleteId, remove it
      if (item.id === deleteId) {
        return null; // returning null will filter out this item
      }

      // If the current item has child items, recursively remove from them
      if (item.items && item.items.length !== 0) {
        const updatedChildItems = removeItemFromDesign(item.items, deleteId);
        return { ...item, items: updatedChildItems };
      }

      return item; // if not deleted, return the item as is
    })
    .filter(Boolean); // filter out null items (deleted items)
}

export default designSlice.reducer;
export const { changeIvrCampaign, changeDepartment } = designSlice.actions;
