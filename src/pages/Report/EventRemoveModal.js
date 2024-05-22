import { Button, Modal, ModalBody } from "reactstrap";

function PaymentRemoveModal({
  payement_modal_delete,
  payment_tog_delete,
  handleDeletePayment,
}) {
  return (
    <Modal
      isOpen={payement_modal_delete}
      toggle={() => {
        payment_tog_delete();
      }}
      className="modal zoomIn mt-0 mb-0"
      id="deleteRecordModal"
      centered
    >
      <div className="modal-header">
        <Button
          type="button"
          onClick={() => payment_tog_delete()}
          className="btn-close"
          aria-label="Close"
        ></Button>
      </div>
      <ModalBody>
        <div className="mt-2 text-center">
          <lord-icon
            src="https://cdn.lordicon.com/gsqxdxog.json"
            trigger="loop"
            colors="primary:#25a0e2,secondary:#00bd9d"
            style={{ width: "100px", height: "100px" }}
          ></lord-icon>
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4>Are you Sure ?</h4>
            <p className="mx-4 mb-0">
              Do you really want to Remove this payment ?
            </p>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            onClick={() => payment_tog_delete()}
          >
            Close
          </button>
          <button
            type="button"
            className="btn w-sm btn-primary"
            id="delete-record"
            onClick={handleDeletePayment}
          >
            Yes, Delete It!
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default PaymentRemoveModal;
