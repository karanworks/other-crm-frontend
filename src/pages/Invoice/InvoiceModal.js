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
import Flatpickr from "react-flatpickr";

function InvoiceModal({
  modal_list, // modal state
  tog_list, // to change modal state
  formHandleSubmit, // submit function for form
  validation, // to get the values from formik
  isEditingInvoice, // state of whether we are editing the user or not, if we are editing the user then form fields will have the values of that user
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
          <div className="mb-2">
            <Label htmlFor="amount" className="form-label">
              Amount
            </Label>

            <Input
              id="amount"
              name="amount"
              className="form-control"
              placeholder="Enter amount"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.amount || ""}
              invalid={
                validation.touched.amount && validation.errors.amount
                  ? true
                  : false
              }
            />

            {validation.touched.amount && validation.errors.amount ? (
              <FormFeedback type="invalid">
                {validation.errors.amount}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="balance" className="form-label">
              Amount
            </Label>

            <Input
              id="balance"
              name="balance"
              className="form-control"
              placeholder="Enter balance"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.balance || ""}
              invalid={
                validation.touched.balance && validation.errors.balance
                  ? true
                  : false
              }
            />

            {validation.touched.balance && validation.errors.balance ? (
              <FormFeedback type="invalid">
                {validation.errors.balance}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-3">
            <Label className="form-label">Payment Date</Label>
            <Flatpickr
              className="form-control"
              options={{
                dateFormat: "d M, Y",
              }}
              onChange={(date) => {
                const formattedDate = new Date(date).toLocaleDateString(
                  "en-GB"
                );
                validation.setFieldValue("paymentDate", formattedDate);
              }}
            />
          </div>

          <div className="mb-3">
            <Label className="form-label">Due Date</Label>
            <Flatpickr
              className="form-control"
              options={{
                dateFormat: "d M, Y",
              }}
              onChange={(date) => {
                const formattedDate = new Date(date).toLocaleDateString(
                  "en-GB"
                );
                validation.setFieldValue("dueDate", formattedDate);
              }}
            />
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {isEditingInvoice ? "Update Invoice" : "Save Invoice"}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default InvoiceModal;
