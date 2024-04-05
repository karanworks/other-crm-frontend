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

function UserFormModal({
  modal_list, // modal state
  tog_list, // to change modal state
  formHandleSubmit, // submit function for form
  validation, // to get the values from formik
  isEditingCampaign, // state of whether we are editing the user or not, if we are editing the user then form fields will have the values of that user
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
        Create new campaign
      </ModalHeader>
      <Form
        className="tablelist-form"
        onSubmit={(e) => formHandleSubmit(e, validation.userId)}
      >
        <ModalBody style={{ paddingTop: "0px" }}>
          {alreadyExistsError && (
            <Alert color="danger" style={{ marginBlock: "5px" }}>
              {alreadyExistsError}
            </Alert>
          )}
          <div className="mb-2">
            <Label htmlFor="campaignName" className="form-label">
              Campaign Name
            </Label>

            <Input
              id="campaignName"
              name="campaignName"
              className="form-control"
              placeholder="Enter campaign name"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.campaignName || ""}
              invalid={
                validation.touched.campaignName &&
                validation.errors.campaignName
                  ? true
                  : false
              }
            />

            {validation.touched.campaignName &&
            validation.errors.campaignName ? (
              <FormFeedback type="invalid">
                {validation.errors.campaignName}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="campaign_description" className="form-label">
              Campaign Description
            </Label>

            <Input
              id="campaignDescription"
              name="campaignDescription"
              className="form-control"
              placeholder="Enter Campaign Description"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.campaignDescription || ""}
              invalid={
                validation.touched.campaignDescription &&
                validation.errors.campaignDescription
                  ? true
                  : false
              }
            />

            {validation.touched.campaignDescription &&
            validation.errors.campaignDescription ? (
              <FormFeedback type="invalid">
                {validation.errors.campaignDescription}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="campaign_type" className="form-label">
              Campaign Type
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
                Select Campaign Type
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
              {isEditingCampaign ? "Update Campaign" : "Save Campaign"}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default UserFormModal;
