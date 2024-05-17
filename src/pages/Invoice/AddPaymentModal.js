import {
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormFeedback,
  Button,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import Flatpickr from "react-flatpickr";

function AddPaymentModal({
  add_payment_modal_list,
  add_Payment_tog_list,
  paymentValidation,
  paymentFormHandleSubmit,
  isEditingPayment,
}) {
  return (
    <Modal
      isOpen={add_payment_modal_list}
      toggle={() => {
        add_Payment_tog_list();
      }}
      centered
      style={{ width: "15%" }}
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          add_Payment_tog_list();
        }}
      >
        {" "}
        {isEditingPayment ? "Update Payment" : "Add Payment"}
      </ModalHeader>
      <Form
        className="tablelist-form"
        onSubmit={(e) => paymentFormHandleSubmit(e)}
      >
        <ModalBody style={{ paddingTop: "0px" }}>
          <div className="mb-2">
            <Label htmlFor="paymentAmount" className="form-label">
              Payment Amount
            </Label>

            <Input
              id="paymentAmount"
              name="paymentAmount"
              className="form-control"
              placeholder="Enter amount"
              type="text"
              onChange={paymentValidation.handleChange}
              onBlur={paymentValidation.handleBlur}
              value={paymentValidation.values.paymentAmount || ""}
              invalid={
                paymentValidation.touched.paymentAmount &&
                paymentValidation.errors.paymentAmount
                  ? true
                  : false
              }
            />

            {paymentValidation.touched.paymentAmount &&
            paymentValidation.errors.paymentAmount ? (
              <FormFeedback type="invalid">
                {paymentValidation.errors.paymentAmount}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label className="form-label">Payment Date</Label>
            <Flatpickr
              className="form-control"
              placeholder="Select Date"
              options={{
                dateFormat: "d/m/Y",
                defaultDate: paymentValidation.values.paymentDate || "",
              }}
              onChange={(date) => {
                const formattedDate = new Date(date).toLocaleDateString(
                  "en-GB"
                );
                paymentValidation.setFieldValue("paymentDate", formattedDate);
              }}
            />
          </div>

          <Button type="submit" className="btn " style={{ float: "right" }}>
            {isEditingPayment ? "Update" : "Add"}
          </Button>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default AddPaymentModal;
