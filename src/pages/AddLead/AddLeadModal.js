import {
  Alert,
  Input,
  Label,
  Form,
  FormFeedback,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { Field, ErrorMessage, validateYupSchema } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Select from "react-select";
import Flatpickr from "react-flatpickr";

function AddLeadModal({
  modal_list, // modal state
  tog_list, // to change modal state
  formHandleSubmit, // submit function for form
  validation, // to get the values from formik
  isEditingLead, // state of whether we are editing the user or not, if we are editing the user then form fields will have the values of that user
  alreadyExistsError,
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
          {/* {alreadyExistsError && (
            <Alert color="danger" style={{ marginBlock: "10px" }}>
              {alreadyExistsError}
            </Alert>
          )} */}
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
          {/* <div className="mb-2">
            <label htmlFor="projectDueDate" className="form-label">
              Project due date
            </label>
            <Field name="projectDueDate">
              {({ field, form }) => (
                <Flatpickr
                  id="projectDueDate"
                  name={field.name}
                  className={`form-control ${
                    form.errors.projectDueDate &&
                    form.touched.projectDueDate &&
                    "is-invalid"
                  }`}
                  options={{
                    dateFormat: "d M, Y",
                  }}
                  value={field.value}
                  onChange={(date) => form.setFieldValue(field.name, date)}
                  onBlur={field.onBlur}
                  placeholder="Select Date"
                />
              )}
            </Field>
            <ErrorMessage
              name="projectDueDate"
              component="div"
              className="invalid-feedback"
            />
          </div> */}

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
