import { Modal, ModalBody, ModalHeader } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";

function EventsViewModal({
  events_view_modal,
  events_view_tog_list,
  add_event_tog_list,
  event_tog_delete,
  setListEventId,
  // handleEditPayment,
  // events,
}) {
  return (
    <Modal
      isOpen={events_view_modal}
      toggle={() => {
        events_view_tog_list();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          events_view_tog_list();
        }}
      >
        Events
      </ModalHeader>

      <ModalBody style={{ paddingTop: "0px" }}>
        <div className="table-responsive mt-2">
          <table className="table table-bordered table-nowrap align-middle mb-0">
            <thead>
              <tr>
                <th scope="col" style={{ width: "40%" }}>
                  Event
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
              <tr>
                <td>Recording</td>
                <td>24/05/2024</td>
                <td>
                  <div className="hstack gap-2">
                    <button
                      className="btn btn-sm btn-soft-info edit-list"
                      onClick={() => {
                        // handleEditPayment(payment);
                      }}
                    >
                      <i className="ri-pencil-fill align-bottom" />
                    </button>
                    <button
                      className="btn btn-sm btn-soft-danger remove-list"
                      onClick={() => {
                        event_tog_delete();
                        setListEventId(event.id);
                      }}
                    >
                      <i className="ri-delete-bin-5-fill align-bottom" />
                    </button>
                  </div>
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
                add_event_tog_list();
              }}
            >
              Add event
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default EventsViewModal;
