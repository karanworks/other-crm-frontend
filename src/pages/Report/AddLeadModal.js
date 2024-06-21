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

function AddLeadModal({
  modal_list, // modal state
  tog_list, // to change modal state
  formHandleSubmit, // submit function for form
  validation, // to get the values from formik
  isEditingLead, // state of whether we are editing the user or not, if we are editing the user then form fields will have the values of that user
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
  useEffect(() => {
    if (isEditingLead) {
      const genre = SingleGenreOptions.find(
        (option) => option.value === validation.values.projectGenre
      );
      setSelectedSingleGenre(genre);

      const status = SingleStatusOptions.find(
        (option) => option.value === validation.values.projectStatus
      );
      setSelectedSingleStatus(status);
    }
  }, [isEditingLead]);

  function handleSelectSingleStatus(selectedSingle) {
    setSelectedSingleStatus(selectedSingle);
  }

  return (
    <Modal
      isOpen={modal_list}
      toggle={() => {
        tog_list();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          tog_list();
        }}
      >
        {" "}
        Create New Lead
      </ModalHeader>
      <Form className="tablelist-form" onSubmit={(e) => formHandleSubmit(e)}>
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
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.clientName || ""}
              invalid={
                validation.touched.clientName && validation.errors.clientName
                  ? true
                  : false
              }
            />

            {validation.touched.clientName && validation.errors.clientName ? (
              <FormFeedback type="invalid">
                {validation.errors.clientName}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label htmlFor="projectGenre" className="form-label">
              Project Genre
            </Label>
            <Select
              id="projectGenre"
              name="projectGenre"
              value={selectedSingleGenre}
              onChange={(genre) => {
                handleSelectSingleGenre(genre);
                validation.setFieldValue("projectGenre", genre.value);
              }}
              options={SingleGenreOptions}
              placeholder="Select Genre"
            />
          </div>

          <div className="mb-2">
            <Label htmlFor="projectStatus" className="form-label">
              Project Status
            </Label>
            <Select
              id="projectStatus"
              name="projectStatus"
              value={selectedSingleStatus}
              onChange={(status) => {
                handleSelectSingleStatus(status);
                validation.setFieldValue("projectStatus", status.value);
              }}
              options={SingleStatusOptions}
              placeholder="Select Status"
            />
          </div>

          <div className="mb-2">
            <Label htmlFor="clientName" className="form-label">
              Youtube Link
            </Label>

            <Input
              id="youtubeLink"
              name="youtubeLink"
              className="form-control"
              placeholder="Enter Youtube Link"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.youtubeLink || ""}
              invalid={
                validation.touched.youtubeLink && validation.errors.youtubeLink
                  ? true
                  : false
              }
            />

            {validation.touched.youtubeLink && validation.errors.youtubeLink ? (
              <FormFeedback type="invalid">
                {validation.errors.youtubeLink}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-3">
            <Label className="form-label">Project Due Date</Label>
            <Flatpickr
              className="form-control"
              placeholder="Select Project Due Date"
              options={{
                dateFormat: "d/m/Y",
                defaultDate: validation.values.projectDueDate || "",
              }}
              onChange={(date) => {
                const formattedDate = new Date(date).toLocaleDateString(
                  "en-GB"
                );
                validation.setFieldValue("projectDueDate", formattedDate);
              }}
            />
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {isEditingLead ? "Update Lead" : "Save Lead"}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default AddLeadModal;
