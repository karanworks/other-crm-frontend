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

function AddTaskModal({
  modal_list, // modal state
  tog_list, // to change modal state
  formHandleSubmit, // submit function for form
  validation, // to get the values from formik
  isEditingTask, // state of whether we are editing the user or not, if we are editing the user then form fields will have the values of that user
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
    if (isEditingTask) {
      const genre = SingleGenreOptions.find(
        (option) => option.value === validation.values.projectGenre
      );
      setSelectedSingleGenre(genre);

      const status = SingleStatusOptions.find(
        (option) => option.value === validation.values.projectStatus
      );
      setSelectedSingleStatus(status);
    }
  }, [isEditingTask]);

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
        Update Task
      </ModalHeader>
      <Form className="tablelist-form" onSubmit={(e) => formHandleSubmit(e)}>
        <ModalBody style={{ paddingTop: "0px" }}>
          <div className="mb-2">
            <Label htmlFor="taskName" className="form-label">
              Task Name
            </Label>

            <Input
              id="taskName"
              name="taskName"
              className="form-control"
              placeholder="Enter task name"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.taskName || ""}
              invalid={
                validation.touched.taskName && validation.errors.taskName
                  ? true
                  : false
              }
            />

            {validation.touched.taskName && validation.errors.taskName ? (
              <FormFeedback type="invalid">
                {validation.errors.taskName}
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

          <div className="mb-2">
            <Label htmlFor="description" className="form-label">
              Description
            </Label>

            <Input
              id="description"
              name="description"
              className="form-control"
              placeholder="Enter description"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.description || ""}
              invalid={
                validation.touched.description && validation.errors.description
                  ? true
                  : false
              }
            />

            {validation.touched.description && validation.errors.description ? (
              <FormFeedback type="invalid">
                {validation.errors.description}
              </FormFeedback>
            ) : null}
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {isEditingTask ? "Update Task" : "Save Task"}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default AddTaskModal;
