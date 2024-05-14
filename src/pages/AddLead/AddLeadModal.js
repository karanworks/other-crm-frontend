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

import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Select from "react-select";
import Flatpickr from "react-flatpickr";

function UserFormModal({
  modal_list, // modal state
  tog_list, // to change modal state
  formHandleSubmit, // submit function for form
  validation, // to get the values from formik
  isEditingLead, // state of whether we are editing the user or not, if we are editing the user then form fields will have the values of that user
  alreadyExistsError,
}) {
  const [selectedSingleGenre, setSelectedSingleGenre] = useState(null);
  const [selectedSingleStatus, setSelectedSingleStatus] = useState(null);

  const SingleGenreOptions = [
    { value: "Hindi", label: "Hindi" },
    { value: "Bhojpuri", label: "Bhojpuri" },
    { value: "Lokgeet", label: "Lokgeet" },
  ];
  const SingleStatusOptions = [
    { value: "Dummy", label: "Dummy" },
    { value: "Recording", label: "Recording" },
    { value: "Mix-Master", label: "Mix-Master" },
    { value: "Delivered", label: "Delivered" },
  ];

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
      <Form
        className="tablelist-form"
        onSubmit={(e) => formHandleSubmit(e, validation.userId)}
      >
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
              value={selectedSingleGenre}
              onChange={(genre) => {
                handleSelectSingleGenre(genre);
                validation.setFieldValue("projectGenre", genre);
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
              value={selectedSingleStatus}
              onChange={(status) => {
                handleSelectSingleStatus(status);
                validation.setFieldValue("projectStatus", status);
              }}
              options={SingleStatusOptions}
              placeholder="Select Status"
            />
          </div>
          <div className="mb-2">
            <Label className="form-label">Project due date</Label>
            <Flatpickr
              className="form-control"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.projectDueDate || ""}
              invalid={
                validation.touched.projectDueDate &&
                validation.errors.projectDueDate
                  ? true
                  : false
              }
              options={{
                dateFormat: "d M, Y",
              }}
              placeholder="Select Date"
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

export default UserFormModal;
