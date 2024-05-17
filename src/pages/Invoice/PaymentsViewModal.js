import { Modal, ModalBody, ModalHeader } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";

function PaymentsViewModal({
  payments_view_modal_list,
  payements_view_tog_list,
  add_Payment_tog_list,
  currentInvoicePayments,
  payment_tog_delete,
}) {
  return (
    <Modal
      isOpen={payments_view_modal_list}
      toggle={() => {
        payements_view_tog_list();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          payements_view_tog_list();
        }}
      >
        {" "}
        Oggy's Payments
      </ModalHeader>

      <ModalBody style={{ paddingTop: "0px" }}>
        <div className="table-responsive mt-2">
          <table className="table table-bordered table-nowrap align-middle mb-0">
            <thead>
              <tr>
                <th scope="col" style={{ width: "40%" }}>
                  Amount
                </th>
                <th scope="col" style={{ width: "40%" }}>
                  Date
                </th>
                <th scope="col" style={{ width: "20%" }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentInvoicePayments?.map((payment) => (
                <tr>
                  <td>₹{payment.amount}</td>
                  <td>{payment.date}</td>
                  <td>
                    <div className="hstack gap-2">
                      <button
                        className="btn btn-sm btn-soft-info edit-list"
                        onClick={() => {}}
                      >
                        <i className="ri-pencil-fill align-bottom" />
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger remove-list"
                        onClick={() => {
                          payment_tog_delete();
                        }}
                      >
                        <i className="ri-delete-bin-5-fill align-bottom" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2">
                  <span className="fs-15">Total Amount Paid</span>
                </td>
                <td>
                  <span className="fs-15">500</span>
                </td>
              </tr>
            </tbody>
          </table>

          <div
            className="payment"
            style={{ marginTop: "20px", float: "right" }}
          >
            <button
              className="btn btn-sm btn-success payment-item-btn"
              data-bs-toggle="modal"
              data-bs-target="#showModal"
              onClick={() => {
                add_Payment_tog_list();
              }}
            >
              Add payment
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default PaymentsViewModal;
