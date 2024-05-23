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

function AddEventModal({
  add_event_view_modal,
  add_event_tog_list,
  eventValidation,
  eventFormHandleSubmit,
  isEditingEvent,
}) {
  return (
    <Modal
      isOpen={add_event_view_modal}
      toggle={() => {
        add_event_tog_list();
      }}
      centered
      style={{ width: "15%" }}
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          add_event_tog_list();
        }}
      >
        {" "}
        {isEditingEvent ? "Update Event" : "Add Event"}
      </ModalHeader>
      <Form
        className="tablelist-form"
        onSubmit={(e) => eventFormHandleSubmit(e)}
      >
        <ModalBody style={{ paddingTop: "0px" }}>
          <div className="mb-2">
            <Label htmlFor="eventName" className="form-label">
              Event Name
            </Label>

            <Input
              id="eventName"
              name="eventName"
              className="form-control"
              placeholder="Enter event name"
              type="text"
              onChange={eventValidation.handleChange}
              onBlur={eventValidation.handleBlur}
              value={eventValidation.values.eventName || ""}
              invalid={
                eventValidation.touched.eventName &&
                eventValidation.errors.eventName
                  ? true
                  : false
              }
            />

            {eventValidation.touched.eventName &&
            eventValidation.errors.eventName ? (
              <FormFeedback type="invalid">
                {eventValidation.errors.eventName}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label className="form-label">Event Date</Label>
            <Flatpickr
              className="form-control"
              placeholder="Select Date"
              options={{
                dateFormat: "d/m/Y",
                defaultDate: eventValidation.values.eventDate || "",
              }}
              onChange={(date) => {
                const formattedDate = new Date(date).toLocaleDateString(
                  "en-GB"
                );
                eventValidation.setFieldValue("eventDate", formattedDate);
              }}
            />
          </div>

          <Button type="submit" className="btn " style={{ float: "right" }}>
            {isEditingEvent ? "Update" : "Add"}
          </Button>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default AddEventModal;
