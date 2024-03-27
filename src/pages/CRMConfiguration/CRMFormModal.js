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

function CRMFieldFormModal({
  crmFormModalList, // modal state
  crmFormModalToggleList, // to change modal state
  crmFieldFormHandleSubmit, // submit function for form
  crmFieldValidation, // to get the values from formik
  crmFields,
}) {
  const sortedFields = crmFields.sort((a, b) => a.position - b.position);

  return (
    <Modal
      isOpen={crmFormModalList}
      toggle={() => {
        crmFormModalToggleList();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          crmFormModalToggleList();
        }}
      >
        {" "}
        CRM Form{" "}
      </ModalHeader>
      <Form
        className="tablelist-form"
        onSubmit={(e) =>
          crmFieldFormHandleSubmit(e, crmFieldValidation.caption)
        }
      >
        <ModalBody style={{ paddingTop: "0px" }}>
          {sortedFields?.map((crmField) => (
            <div className="mb-2" key={crmField.id}>
              <Label htmlFor="caption" className="form-label">
                {crmField.caption}
              </Label>

              <Input
                id="caption"
                name="caption"
                className="form-control"
                type={crmField.type}
              />
            </div>
          ))}

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default CRMFieldFormModal;
