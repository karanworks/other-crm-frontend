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
        Create new IVR Campaign
      </ModalHeader>
      <Form
        className="tablelist-form"
        onSubmit={(e) => formHandleSubmit(e, validation.userId)}
      >
        <ModalBody style={{ paddingTop: "0px" }}>
          {alreadyExistsError && (
            <Alert color="danger" style={{ marginBlock: "10px" }}>
              {alreadyExistsError}
            </Alert>
          )}
          <div className="mb-2">
            <Label htmlFor="ivrCampaignName" className="form-label">
              IVR Campaign Name
            </Label>

            <Input
              id="ivrCampaignName"
              name="ivrCampaignName"
              className="form-control"
              placeholder="Enter campaign name"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.ivrCampaignName || ""}
              invalid={
                validation.touched.ivrCampaignName &&
                validation.errors.ivrCampaignName
                  ? true
                  : false
              }
            />

            {validation.touched.ivrCampaignName &&
            validation.errors.ivrCampaignName ? (
              <FormFeedback type="invalid">
                {validation.errors.ivrCampaignName}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="campaign_description" className="form-label">
              IVR Campaign Description
            </Label>

            <Input
              id="ivrCampaignDescription"
              name="ivrCampaignDescription"
              className="form-control"
              placeholder="Enter Campaign Description"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.ivrCampaignDescription || ""}
              invalid={
                validation.touched.ivrCampaignDescription &&
                validation.errors.ivrCampaignDescription
                  ? true
                  : false
              }
            />

            {validation.touched.ivrCampaignDescription &&
            validation.errors.ivrCampaignDescription ? (
              <FormFeedback type="invalid">
                {validation.errors.ivrCampaignDescription}
              </FormFeedback>
            ) : null}
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {isEditingCampaign ? "Update IVR Campaign" : "Save IVR Campaign"}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default UserFormModal;
