import {
  Input,
  Label,
  Form,
  FormFeedback,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { label } from "yet-another-react-lightbox";

function EditClientModal({
  edit_client_modal, // modal state
  edit_client_tog_list, // to change modal state
  editClientHandleSubmit, // submit function for form
  clientValidation, // to get the values from formik
  isEditingClient, // state of whether we are editing the user or not, if we are editing the user then form fields will have the values of that user
  dropdowns,
}) {
  const [selectedSingleGenre, setSelectedSingleGenre] = useState(null);
  const [selectedSingleStatus, setSelectedSingleStatus] = useState(null);

  let SingleGenreOptions = dropdowns
    ?.map((dropdown) => {
      if (dropdown.category === "Project Genre") {
        return { value: dropdown.dropdownName, label: dropdown.dropdownName };
      }
    })
    .filter(Boolean);

  let SingleStatusOptions = dropdowns
    ?.map((dropdown) => {
      if (dropdown.category === "Project Status") {
        return { value: dropdown.dropdownName, label: dropdown.dropdownName };
      }
    })
    .filter(Boolean);

  function handleSelectSingleGenre(selectedSingle) {
    setSelectedSingleGenre(selectedSingle);
  }

  // Use useEffect to set the initial values for the select fields when editing a lead
  // useEffect(() => {
  //   if (isEditingLead) {
  //     const genre = SingleGenreOptions.find(
  //       (option) => option.value === clientValidation.values.projectGenre
  //     );
  //     setSelectedSingleGenre(genre);

  //     const status = SingleStatusOptions.find(
  //       (option) => option.value === clientValidation.values.projectStatus
  //     );
  //     setSelectedSingleStatus(status);
  //   }
  // }, [isEditingLead]);

  function handleSelectSingleStatus(selectedSingle) {
    setSelectedSingleStatus(selectedSingle);
  }

  return (
    <Modal
      isOpen={edit_client_modal}
      toggle={() => {
        edit_client_tog_list();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          edit_client_tog_list();
        }}
      >
        {" "}
        Create New Lead
      </ModalHeader>
      <Form
        className="tablelist-form"
        onSubmit={(e) => editClientHandleSubmit(e)}
      >
        <ModalBody style={{ paddingTop: "0px" }}>
          <div className="mb-2">
            <Label htmlFor="clientName" className="form-label">
              Client Name
            </Label>

            <Input
              id="clientName"
              name="clientName"
              className="form-control"
              placeholder="Enter client name"
              type="text"
              onChange={clientValidation.handleChange}
              onBlur={clientValidation.handleBlur}
              value={clientValidation.values.clientName || ""}
              invalid={
                clientValidation.touched.clientName &&
                clientValidation.errors.clientName
                  ? true
                  : false
              }
            />

            {clientValidation.touched.clientName &&
            clientValidation.errors.clientName ? (
              <FormFeedback type="invalid">
                {clientValidation.errors.clientName}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label htmlFor="mobileNo" className="form-label">
              Mobile No
            </Label>

            <Input
              id="mobileNo"
              name="mobileNo"
              className="form-control"
              placeholder="Enter mobile no"
              type="text"
              onChange={clientValidation.handleChange}
              onBlur={clientValidation.handleBlur}
              value={clientValidation.values.mobileNo || ""}
              invalid={
                clientValidation.touched.mobileNo &&
                clientValidation.errors.mobileNo
                  ? true
                  : false
              }
            />

            {clientValidation.touched.mobileNo &&
            clientValidation.errors.mobileNo ? (
              <FormFeedback type="invalid">
                {clientValidation.errors.mobileNo}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label htmlFor="address" className="form-label">
              Address
            </Label>

            <Input
              id="address"
              name="address"
              className="form-control"
              placeholder="Enter address"
              type="text"
              onChange={clientValidation.handleChange}
              onBlur={clientValidation.handleBlur}
              value={clientValidation.values.address || ""}
              invalid={
                clientValidation.touched.address &&
                clientValidation.errors.address
                  ? true
                  : false
              }
            />

            {clientValidation.touched.address &&
            clientValidation.errors.address ? (
              <FormFeedback type="invalid">
                {clientValidation.errors.address}
              </FormFeedback>
            ) : null}
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {isEditingClient ? "Update Client" : "Save Client"}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default EditClientModal;
