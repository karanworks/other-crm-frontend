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

function InvoiceModal({
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
        Create New Invoice
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
            <Label htmlFor="campaignName" className="form-label">
              Amount
            </Label>

            <Input
              id="campaignName"
              name="campaignName"
              className="form-control"
              placeholder="Enter amount"
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

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {isEditingCampaign ? "Update Invoice" : "Save Invoice"}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default InvoiceModal;
