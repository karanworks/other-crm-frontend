import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  Card,
  CardBody,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
} from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import listPlugin from "@fullcalendar/list";

//redux
import { useSelector, useDispatch } from "react-redux";

import BreadCrumb from "../../Components/Common/BreadCrumb";
import DeleteModal from "../../Components/Common/DeleteModal";

//Simple bar
import SimpleBar from "simplebar-react";
import UpcommingEvents from "./UpcommingEvents";

import {
  getEvents as onGetEvents,
  getCategories as onGetCategories,
  addNewEvent as onAddNewEvent,
  deleteEvent as onDeleteEvent,
  updateEvent as onUpdateEvent,
  resetCalendar,
} from "../../slices/calendar/thunk";
import { createSelector } from "reselect";
import { getLeads } from "../../slices/AddLead/thunk";

const Calender = () => {
  const dispatch = useDispatch();
  const [event, setEvent] = useState({});
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedNewDay, setSelectedNewDay] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [upcommingevents, setUpcommingevents] = useState([]);
  const [isEditButton, setIsEditButton] = useState(true);

  const selectLayoutState = (state) => state.Calendar;
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (calender) => ({
      events: calender?.events,
      categories: calender?.categories,
      isEventUpdated: calender?.isEventUpdated,
    })
  );
  // Inside your component
  const { events, categories, isEventUpdated } = useSelector(
    selectLayoutProperties
  );

  const { leads } = useSelector((state) => state.AddLead);

  console.log("LEADS ->", leads);

  const leadsCalendarData = leads?.map((lead) => {
    let dateStr = lead.projectDueDate;

    // Split the date string into day, month, and year components
    let [day, month, year] = dateStr.split("/");

    // Rearrange and format the components into "YYYY-MM-DD"
    let formattedDateStr = `${year}-${month}-${day}`;

    return {
      id: lead.id,
      title: lead.clientName,
      start: formattedDateStr,
      className: "bg-primary-subtle",
      projectDueDate: lead.projectDueDate,
      projectStatus: lead.projectStatus,
      projectGenre: lead.projectGenre,
      youtubeLink: lead.youtubeLink,
    };
  });

  useEffect(() => {
    dispatch(onGetEvents());
    dispatch(onGetCategories());
    dispatch(getLeads());
  }, [dispatch]);

  /**
   * Handling the modal state
   */
  const toggle = () => {
    if (modal) {
      setModal(false);
      setEvent(null);
      setIsEdit(false);
      // setIsEditButton(true);
    } else {
      setModal(true);
    }
  };

  const str_dt = function formatDate(date) {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var d = new Date(date),
      month = "" + monthNames[d.getMonth()],
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [day + " " + month, year].join(",");
  };

  const date_r = function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  };

  /**
   * Handling click on event on calendar
   */
  const handleEventClick = (arg) => {
    console.log("HANDLE EVENT CLICK ->", arg.event);
    // const event = arg.event;
    const event = arg.event;

    const st_date = event.start;
    const ed_date = event.end;
    const r_date =
      ed_date == null
        ? str_dt(st_date)
        : str_dt(st_date) + " to " + str_dt(ed_date);
    const er_date =
      ed_date == null
        ? date_r(st_date)
        : date_r(st_date) + " to " + date_r(ed_date);

    // setEvent({
    //   id: event.id,
    //   title: event.title,
    //   start: event.start,
    //   end: event.end,
    //   className: event.classNames,
    //   category: event.classNames[0],
    //   location: event._def.extendedProps.location,
    //   description: event._def.extendedProps.description,
    //   defaultDate: er_date,
    //   datetag: r_date,
    // });
    setEvent({
      id: event.id,
      title: event._def.title,
      start: event._def.extendedProps.projectDueDate,
      status: event._def.extendedProps.projectStatus,
      genre: event._def.extendedProps.projectGenre,
      youtubeLink: event._def.extendedProps.youtubeLink,
      defaultDate: er_date,
      datetag: r_date,
    });

    setIsEdit(true);
    // setIsEditButton(false);
    toggle();
  };
  /**
   * On delete event
   */
  const handleDeleteEvent = () => {
    dispatch(onDeleteEvent(event.id));
    setDeleteModal(false);
    toggle();
  };

  // events validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: (event && event.title) || "",
      category: (event && event.category) || "",
      location: (event && event.location) || "",
      description: (event && event.description) || "",
      defaultDate: (event && event.defaultDate) || "",
      datetag: (event && event.datetag) || "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Event Name"),
      category: Yup.string().required("Please Select Your Category"),
    }),
    onSubmit: (values) => {
      var updatedDay = "";
      if (selectedNewDay) {
        updatedDay = new Date(selectedNewDay[1]);
        updatedDay.setDate(updatedDay.getDate() + 1);
      }

      if (isEdit) {
        const updateEvent = {
          id: event.id,
          title: values.title,
          className: values.category,
          start: selectedNewDay ? selectedNewDay[0] : event.start,
          end: selectedNewDay ? updatedDay : event.end,
          location: values.location,
          description: values.description,
        };
        // update event
        dispatch(onUpdateEvent(updateEvent));
        validation.resetForm();
      } else {
        const newEvent = {
          id: Math.floor(Math.random() * 100),
          title: values["title"],
          start: selectedDay ? selectedNewDay[0] : new Date(),
          end: selectedDay ? updatedDay : new Date(),
          className: values.category,
          location: values["location"],
          description: values["description"],
        };
        // save new event
        dispatch(onAddNewEvent(newEvent));
        validation.resetForm();
      }
      setSelectedDay(null);
      setSelectedNewDay(null);
      toggle();
    },
  });

  document.title = "Calendar | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEvent}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Calendar" pageTitle="Lead Management" />
          <Row>
            <Col xs={12}>
              <Row>
                <Col xl={3}>
                  <div>
                    <h5 className="mb-1">Upcoming Events</h5>
                    <p className="text-muted">Don't miss scheduled events</p>
                    <SimpleBar
                      className="pe-2 me-n1 mb-3"
                      style={{ height: "400px" }}
                    >
                      <div id="upcoming-event-list">
                        {leadsCalendarData &&
                          leadsCalendarData.map((event, key) => (
                            <UpcommingEvents event={event} key={key} />
                          ))}
                      </div>
                    </SimpleBar>
                  </div>
                </Col>

                <Col xl={9}>
                  <Card className="card-h-100">
                    <CardBody>
                      <FullCalendar
                        plugins={[
                          BootstrapTheme,
                          dayGridPlugin,
                          interactionPlugin,
                          listPlugin,
                        ]}
                        initialView="dayGridMonth"
                        slotDuration={"00:15:00"}
                        handleWindowResize={true}
                        themeSystem="bootstrap"
                        headerToolbar={{
                          left: "prev,next today",
                          center: "title",
                          // right: "dayGridMonth,dayGridWeek,dayGridDay,listWeek",
                          right: "dayGridMonth,listWeek",
                        }}
                        events={leadsCalendarData}
                        editable={true}
                        // droppable={true}
                        selectable={true}
                        // dateClick={handleDateClick}
                        eventClick={handleEventClick}
                        // drop={onDrop}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <div style={{ clear: "both" }}></div>

              <Modal isOpen={modal} id="event-modal" centered>
                <ModalHeader
                  toggle={toggle}
                  tag="h5"
                  className="p-3 bg-info-subtle modal-title"
                >
                  {/* {!!isEdit ? "Edit Event" : "Add Event"} */}
                  Details
                </ModalHeader>
                <ModalBody>
                  {/* <Form
                    // className={
                    //   !!isEdit
                    //     ? "needs-validation view-event"
                    //     : "needs-validation"
                    // }
                    name="event-form"
                    id="form-event"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  > */}
                  {/* {!!isEdit ? (
                      <div className="text-end">
                        <Link
                          to="#"
                          className="btn btn-sm btn-soft-primary"
                          id="edit-event-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            submitOtherEvent();
                            return false;
                          }}
                        >
                          Edit
                        </Link>
                      </div>
                    ) : null} */}

                  <div>
                    <div className="d-flex ">
                      <div className="flex-grow-1 d-flex align-items-center">
                        <div className="flex-shrink-0 me-2">
                          <i className="ri-shield-user-line text-muted fs-22"></i>
                        </div>
                        <div className="flex-grow-1">
                          <h6
                            className="d-block fw-semibold mb-0 fs-16"
                            id="event-start-date-tag"
                          >
                            {event?.title}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <div className="flex-grow-1 d-flex align-items-center">
                        <div className="flex-shrink-0 me-2">
                          <i class="ri-calendar-event-line text-muted fs-22"></i>
                        </div>
                        <div className="flex-grow-1">
                          <h6
                            className="d-block fw-semibold mb-0 fs-16"
                            id="event-start-date-tag"
                          >
                            {event?.start}
                          </h6>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex ">
                      <div className="flex-grow-1 d-flex align-items-center">
                        <div className="flex-shrink-0 me-2">
                          <i class="ri-pages-line text-muted fs-22"></i>
                        </div>
                        <div className="flex-grow-1">
                          <h6
                            className="d-block fw-semibold mb-0 fs-16"
                            id="event-start-date-tag"
                          >
                            {event?.genre}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <div className="flex-grow-1 d-flex align-items-center">
                        <div className="flex-shrink-0 me-2">
                          <i class="ri-timer-line text-muted fs-22"></i>
                        </div>
                        <div className="flex-grow-1">
                          <h6
                            className="d-block fw-semibold mb-0 fs-16"
                            id="event-start-date-tag"
                          >
                            {event?.status}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <div className="flex-grow-1 d-flex align-items-center">
                        <div className="flex-shrink-0 me-2">
                          <i class="ri-youtube-line text-muted fs-22"></i>
                        </div>
                        <div className="flex-grow-1">
                          <h6
                            className="d-block fw-semibold mb-0 fs-16"
                            id="event-start-date-tag"
                          >
                            <a href={event?.youtubeLink}>YouTube</a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="event-details">
                    <div className="d-flex mb-2">
                      <div className="flex-grow-1 d-flex align-items-center">
                        <div className="flex-shrink-0 me-3">
                          <i className="ri-calendar-event-line text-muted fs-16"></i>
                        </div>
                        <div className="flex-grow-1">
                          <h6
                            className="d-block fw-semibold mb-0"
                            id="event-start-date-tag"
                          >
                            {/* {event ? event.title : ""} */}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <div className="flex-shrink-0 me-3">
                        <i className="ri-map-pin-line text-muted fs-16"></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="d-block fw-semibold mb-0">
                          {" "}
                          <span id="event-location-tag">
                            {event && event.location !== undefined
                              ? event.location
                              : "No Location"}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <div className="d-flex mb-3">
                      <div className="flex-shrink-0 me-3">
                        <i className="ri-discuss-line text-muted fs-16"></i>
                      </div>
                      <div className="flex-grow-1">
                        <p
                          className="d-block text-muted mb-0"
                          id="event-description-tag"
                        >
                          {event && event.description !== undefined
                            ? event.description
                            : "No Description"}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <Row className="event-form">
                      <Col xs={12}>
                        <div className="mb-3">
                          <Label className="form-label">Type</Label>
                          <Input
                            className={
                              !!isEdit
                                ? "form-select d-none"
                                : "form-select d-block"
                            }
                            name="category"
                            id="event-category"
                            type="select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.category || ""}
                            // invalid={
                            //   validation.touched.category &&
                            //   validation.errors.category
                            //     ? true
                            //     : false
                            // }
                          >
                            <option value="bg-danger-subtle">Danger</option>
                            <option value="bg-success-subtle">Success</option>
                            <option value="bg-primary-subtle">Primary</option>
                            <option value="bg-info-subtle">Info</option>
                            <option value="bg-dark-subtle">Dark</option>
                            <option value="bg-warning-subtle">Warning</option>
                          </Input>
                          {validation.touched.category &&
                          validation.errors.category ? (
                            <FormFeedback type="invalid">
                              {validation.errors.category}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div className="mb-3">
                          <Label className="form-label">Event Name</Label>
                          <Input
                            className={
                              !!isEdit
                                ? "form-control d-none"
                                : "form-control d-block"
                            }
                            placeholder="Enter event name"
                            type="text"
                            name="title"
                            id="event-title"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.title || ""}
                            // invalid={
                            //   validation.touched.title &&
                            //   validation.errors.title
                            //     ? true
                            //     : false
                            // }
                          />
                          {validation.touched.title &&
                          validation.errors.title ? (
                            <FormFeedback type="invalid">
                              {validation.errors.title}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div className="mb-3">
                          <Label>Event Date</Label>
                          <div
                            className={
                              !!isEdit ? "input-group d-none" : "input-group"
                            }
                          >
                            <Flatpickr
                              className="form-control"
                              id="event-start-date"
                              name="defaultDate"
                              placeholder="Select Date"
                              value={validation.values.defaultDate || ""}
                              options={{
                                mode: "range",
                                dateFormat: "Y-m-d",
                              }}
                              onChange={(date) => {
                                setSelectedNewDay(date);
                              }}
                            />
                            <span className="input-group-text">
                              <i className="ri-calendar-event-line"></i>
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div className="mb-3">
                          <Label htmlFor="event-location">Location</Label>
                          <div>
                            <Input
                              type="text"
                              className={
                                !!isEdit
                                  ? "form-control d-none"
                                  : "form-control d-block"
                              }
                              name="location"
                              id="event-location"
                              placeholder="Event location"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={
                                validation.values.location || "No Location"
                              }
                              // invalid={
                              //   validation.touched.location &&
                              //   validation.errors.location
                              //     ? true
                              //     : false
                              // }
                            />
                            {validation.touched.location &&
                            validation.errors.location ? (
                              <FormFeedback type="invalid">
                                {validation.errors.location}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div className="mb-3">
                          <Label className="form-label">Description</Label>
                          <textarea
                            className={
                              !!isEdit
                                ? "form-control d-none"
                                : "form-control d-block"
                            }
                            id="event-description"
                            name="description"
                            placeholder="Enter a description"
                            rows="3"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={
                              validation.values.description || "No Description"
                            }
                            // invalid={
                            //   validation.touched.description &&
                            //   validation.errors.description
                            //     ? true
                            //     : false
                            // }
                          ></textarea>
                          {validation.touched.description &&
                          validation.errors.description ? (
                            <FormFeedback type="invalid">
                              {validation.errors.description}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row> */}
                  {/* <div className="hstack gap-2 justify-content-end">
                      {!!isEdit && (
                        <button
                          type="button"
                          className="btn btn-soft-danger"
                          id="btn-delete-event"
                          onClick={() => setDeleteModal(true)}
                        >
                          <i className="ri-close-line align-bottom"></i> Delete
                        </button>
                      )}
                      {isEditButton && (
                        <button
                          type="submit"
                          className="btn btn-success"
                          id="btn-save-event"
                        >
                          {!!isEdit ? "Edit Event" : "Add Event"}
                        </button>
                      )}
                    </div> */}
                  {/* </Form> */}
                </ModalBody>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Calender.propTypes = {
  events: PropTypes.any,
  categories: PropTypes.array,
  className: PropTypes.string,
  onGetEvents: PropTypes.func,
  onAddNewEvent: PropTypes.func,
  onUpdateEvent: PropTypes.func,
  onDeleteEvent: PropTypes.func,
  onGetCategories: PropTypes.func,
};

export default Calender;
