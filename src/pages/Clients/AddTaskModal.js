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
  add_task_modal,
  add_task_tog_list,
  formHandleSubmit,
  taskValidation,
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
  //       (option) => option.value === taskValidation.values.projectGenre
  //     );
  //     setSelectedSingleGenre(genre);

  //     const status = SingleStatusOptions.find(
  //       (option) => option.value === taskValidation.values.projectStatus
  //     );
  //     setSelectedSingleStatus(status);
  //   }
  // }, [isEditingLead]);

  function handleSelectSingleStatus(selectedSingle) {
    setSelectedSingleStatus(selectedSingle);
  }

  return (
    <Modal
      isOpen={add_task_modal}
      toggle={() => {
        add_task_tog_list();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          add_task_tog_list();
        }}
      >
        {" "}
        Create New Task
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
              onChange={taskValidation.handleChange}
              onBlur={taskValidation.handleBlur}
              value={taskValidation.values.taskName || ""}
              invalid={
                taskValidation.touched.taskName &&
                taskValidation.errors.taskName
                  ? true
                  : false
              }
            />

            {taskValidation.touched.taskName &&
            taskValidation.errors.taskName ? (
              <FormFeedback type="invalid">
                {taskValidation.errors.taskName}
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
                taskValidation.setFieldValue("projectGenre", genre.value);
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
                taskValidation.setFieldValue("projectStatus", status.value);
              }}
              options={SingleStatusOptions}
              placeholder="Select Status"
            />
          </div>

          <div className="mb-3">
            <Label className="form-label">Project Due Date</Label>
            <Flatpickr
              className="form-control"
              placeholder="Select Project Due Date"
              options={{
                dateFormat: "d/m/Y",
                defaultDate: taskValidation.values.projectDueDate || "",
              }}
              onChange={(date) => {
                const formattedDate = new Date(date).toLocaleDateString(
                  "en-GB"
                );
                taskValidation.setFieldValue("projectDueDate", formattedDate);
              }}
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
              onChange={taskValidation.handleChange}
              onBlur={taskValidation.handleBlur}
              value={taskValidation.values.youtubeLink || ""}
              invalid={
                taskValidation.touched.youtubeLink &&
                taskValidation.errors.youtubeLink
                  ? true
                  : false
              }
            />

            {taskValidation.touched.youtubeLink &&
            taskValidation.errors.youtubeLink ? (
              <FormFeedback type="invalid">
                {taskValidation.errors.youtubeLink}
              </FormFeedback>
            ) : null}
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
              onChange={taskValidation.handleChange}
              onBlur={taskValidation.handleBlur}
              value={taskValidation.values.description || ""}
              invalid={
                taskValidation.touched.description &&
                taskValidation.errors.description
                  ? true
                  : false
              }
            />

            {taskValidation.touched.description &&
            taskValidation.errors.description ? (
              <FormFeedback type="invalid">
                {taskValidation.errors.description}
              </FormFeedback>
            ) : null}
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default AddTaskModal;
