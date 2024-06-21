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

function AddBranchModal({
  branch_modal_list,
  branch_tog_list,
  branchFormHandleSubmit,
  branchValidation,
  alreadyRegisteredError,
}) {
  return (
    <Modal
      isOpen={branch_modal_list}
      toggle={() => {
        branch_tog_list();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          branch_tog_list();
        }}
      >
        Add Branch
      </ModalHeader>
      <Form
        className="tablelist-form"
        onSubmit={(e) => branchFormHandleSubmit(e)}
      >
        <ModalBody style={{ paddingTop: "0px" }}>
          {/* {alreadyRegisteredError && (
            <Alert color="danger" style={{ marginBlock: "10px" }}>
              {alreadyRegisteredError}
            </Alert>
          )} */}

          <div className="mb-2">
            <Label htmlFor="branchName" className="form-label">
              Branch Name
            </Label>

            <Input
              id="branchName"
              name="branchName"
              className="form-control"
              placeholder="Enter Branch Name"
              type="text"
              onChange={branchValidation.handleChange}
              onBlur={branchValidation.handleBlur}
              value={branchValidation.values.branchName || ""}
              invalid={
                branchValidation.touched.branchName &&
                branchValidation.errors.branchName
                  ? true
                  : false
              }
            />

            {branchValidation.touched.branchName &&
            branchValidation.errors.branchName ? (
              <FormFeedback type="invalid">
                {branchValidation.errors.branchName}
              </FormFeedback>
            ) : null}
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Add Branch
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default AddBranchModal;
