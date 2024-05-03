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
import Select from "react-select";

function DesignModal({
  modal_list, // modal state
  tog_list, // to change modal state
  formHandleSubmit, // submit function for form
  validation, // to get the values from formik
  alreadyExistsError,
  departmentOptions,
  selectedDepartmentOption,
  handleSelectDepartmentOption,
}) {
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
        Add IVR
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
          <div className="mb-3">
            <Select
              value={selectedDepartmentOption}
              onChange={() => {
                handleSelectDepartmentOption();
              }}
              options={departmentOptions}
              placeholder="Select Department"
              style={{ border: "2px solid red" }}
            />
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Create IVR
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default DesignModal;
