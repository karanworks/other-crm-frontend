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

function IVRDesignModal({
  modal_list, // modal state
  tog_list, // to change modal state
  formHandleSubmit, // submit function for form
  validation, // to get the values from formik
  alreadyExistsError,
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
          <div className="mb-2">
            <Label htmlFor="campaign_type" className="form-label">
              Select Department
            </Label>

            <Input
              id="campaignType"
              name="campaignType"
              className="form-control"
              placeholder="Enter Campaign Type"
              type="select"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.campaignType || ""}
              invalid={
                validation.touched.campaignType &&
                validation.errors.campaignType
                  ? true
                  : false
              }
            >
              <option value="" disabled>
                Select Department
              </option>
              <option value="outbound">Outbound</option>
              <option value="inbound">Inbound</option>
            </Input>

            {validation.touched.campaignType &&
            validation.errors.campaignType ? (
              <FormFeedback type="invalid">
                {validation.errors.campaignType}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="campaign_type" className="form-label">
              Select Speech
            </Label>

            <Input
              id="campaignType"
              name="campaignType"
              className="form-control"
              placeholder="Enter Campaign Type"
              type="select"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.campaignType || ""}
              invalid={
                validation.touched.campaignType &&
                validation.errors.campaignType
                  ? true
                  : false
              }
            >
              <option value="" disabled>
                Select Speech
              </option>
              <option value="outbound">Outbound</option>
              <option value="inbound">Inbound</option>
            </Input>

            {validation.touched.campaignType &&
            validation.errors.campaignType ? (
              <FormFeedback type="invalid">
                {validation.errors.campaignType}
              </FormFeedback>
            ) : null}
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

export default IVRDesignModal;
