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

function AddPaymentModal({ add_payment_modal_list, add_Payment_tog_list }) {
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
        Add Payment
      </ModalHeader>
      <Form className="tablelist-form">
        <ModalBody style={{ paddingTop: "0px" }}>
          <div className="mb-2">
            <Label htmlFor="clientName" className="form-label">
              Amount
            </Label>
            <Input
              id="totalAmount"
              name="totalAmount"
              className="form-control"
              placeholder="Enter amount"
              type="text"
            />
          </div>
          <div className="mb-2">
            <Label htmlFor="clientName" className="form-label">
              Date
            </Label>
            <Input
              id="totalAmount"
              name="totalAmount"
              className="form-control"
              placeholder="Enter amount"
              type="text"
            />
          </div>
          <Button type="submit" className="btn " style={{ float: "right" }}>
            Add
          </Button>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default AddPaymentModal;
