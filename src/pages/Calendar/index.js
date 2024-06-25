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

import { createSelector } from "reselect";
// import { getLeads } from "../../slices/AddLead/thunk";
import { getClients } from "../../slices/AddClient/thunk";
import { getEvents } from "../../slices/Report/thunk";
import { getPayments } from "../../slices/Payment/thunk";
import { getInvoices } from "../../slices/Invoice/thunk";

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
  const [singleInvoice, setSingleInvoice] = useState();

  const selectLayoutState = (state) => state.Calendar;
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (calender) => ({
      events: calender?.events,
      categories: calender?.categories,
      isEventUpdated: calender?.isEventUpdated,
    })
  );

  const { clients } = useSelector((state) => state.AddClient);
  const { payments } = useSelector((state) => state.Payment);
  const { invoices } = useSelector((state) => state.Invoice);
  const { allEvents } = useSelector((state) => state.Report);

  const clientsCalendarData = clients?.map((client) => {
    let dateStr = client.projectDueDate;

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

  // const calendarArray = [
  //   {
  //     id: 23,
  //     title: "something",
  //     start: "2024-05-12",
  //     className: "bg-primary",
  //   },
  //   {
  //     id: 24,
  //     title: "something",
  //     start: "2024-05-13",
  //     className: "bg-primary",
  //   },
  //   {
  //     id: 25,
  //     title: "something",
  //     start: "2024-05-14",
  //     className: "bg-primary",
  //   },
  //   {
  //     id: 26,
  //     title: "something",
  //     start: "2024-05-15",
  //     className: "bg-primary",
  //   },
  // ];

  // const calendarArray2 = [
  //   {
  //     id: 33,
  //     title: "nothing",
  //     start: "2024-05-23",
  //     className: "bg-danger",
  //   },
  //   {
  //     id: 34,
  //     title: "nothing",
  //     start: "2024-05-24",
  //     className: "bg-danger",
  //   },
  //   {
  //     id: 35,
  //     title: "nothing",
  //     start: "2024-05-25",
  //     className: "bg-danger",
  //   },
  //   {
  //     id: 36,
  //     title: "nothing",
  //     start: "2024-05-26",
  //     className: "bg-danger",
  //   },
  // ];

  // const allEventsThroughLeads = leads
  //   ?.map((lead) => {
  //     return lead.events;
  //   })
  //   .flat();

  const eventsCalendarData = allEvents?.map((event) => {
    let dateStr = event.eventDate;

    // Split the date string into day, month, and year components
    let [day, month, year] = dateStr.split("/");

    // Rearrange and format the components into "YYYY-MM-DD"
    let formattedDateStr = `${year}-${month}-${day}`;

    return {
      id: event.id,
      title: event.clientName + " - " + event.eventName,
      start: formattedDateStr,
      className: "bg-danger-subtle",
    };
  });

  const calendarData = [...eventsCalendarData, ...clientsCalendarData];

  useEffect(() => {
    dispatch(getClients());
    dispatch(getEvents());
    dispatch(getInvoices());
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

    setEvent({
      id: event.id,
      title: event._def.title,
      start: event._def.extendedProps.projectDueDate,
      status: event._def.extendedProps.projectStatus,
      genre: event._def.extendedProps.projectGenre,
      youtubeLink: event._def.extendedProps.youtubeLink,
      className: event._def.ui.classNames[0],
      defaultDate: er_date,
      datetag: r_date,
    });

    // finding invoice from calendar event name
    const selectedInvoice = invoices?.find(
      (invoice) => invoice.clientName === event._def.title
    );

    setSingleInvoice(selectedInvoice);

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

  document.title = "Calendar";
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
                        {calendarData &&
                          calendarData.map((event, key) => (
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
                        events={calendarData}
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
                  <div>
                    <div className="d-flex ">
                      <div className="flex-grow-1 d-flex align-items-center">
                        <div className="flex-shrink-0 me-2">
                          <i className="ri-shield-user-line text-muted fs-36"></i>
                        </div>
                        <div className="flex-grow-1 d-flex align-items-center">
                          <h6
                            className="d-block fw-semibold mb-0 fs-36"
                            id="event-start-date-tag"
                          >
                            {event?.title?.split(" - ")[0]}
                          </h6>
                        </div>
                      </div>
                    </div>

                    {event?.className === "bg-danger-subtle" && (
                      <div className="d-flex ">
                        <div className="flex-grow-1 d-flex align-items-center">
                          <div className="flex-shrink-0 me-2">
                            <i className="ri-calendar-event-line text-muted fs-17"></i>
                          </div>
                          <div className="flex-grow-1">
                            <h6
                              className="d-block fw-semibold mb-0 fs-20"
                              id="event-start-date-tag"
                            >
                              Event - {event?.title?.split(" - ")[1]}
                            </h6>
                          </div>
                        </div>
                      </div>
                    )}

                    {event?.className === "bg-danger-subtle" ? null : (
                      <div className="d-flex mt-2" style={{ gap: "20px" }}>
                        <div className="d-flex ">
                          <div className="flex-grow-1 d-flex align-items-center">
                            <div className="flex-shrink-0 me-2">
                              <i className="ri-calendar-event-line text-muted fs-17"></i>
                            </div>
                            <div className="flex-grow-1">
                              <h6
                                className="d-block fw-semibold mb-0 fs-17"
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
                              <i className="ri-earth-line text-muted fs-17"></i>
                            </div>
                            <div className="flex-grow-1">
                              <h6
                                className="d-block fw-semibold mb-0 fs-17"
                                id="event-start-date-tag"
                              >
                                {event?.genre}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {event?.className === "bg-danger-subtle" ? null : (
                      <div className="d-flex " style={{ gap: "20px" }}>
                        <div className="d-flex ">
                          <div className="flex-grow-1 d-flex align-items-center">
                            <div className="flex-shrink-0 me-2">
                              <i className="ri-timer-line text-muted fs-17"></i>
                            </div>
                            <div className="flex-grow-1">
                              <h6
                                className="d-block fw-semibold mb-0 fs-17"
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
                              <i className="ri-youtube-line text-muted fs-17"></i>
                            </div>
                            <div className="flex-grow-1">
                              <h6
                                className="d-block fw-semibold mb-0 fs-17"
                                id="event-start-date-tag"
                              >
                                <a href={event?.youtubeLink}>YouTube Link</a>
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {event?.className === "bg-danger-subtle" ? null : (
                    <div className="table-responsive mt-4">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5>Payments</h5>
                        </div>

                        <div className="d-flex " style={{ gap: "10px" }}>
                          {singleInvoice && (
                            <>
                              <span className="fs-15 fw-bold text-muted">
                                Total - ₹{singleInvoice.totalAmount}
                              </span>
                              <span className="fs-15 fw-bold text-muted">
                                Balance - ₹{singleInvoice.balance}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {singleInvoice ? (
                        <table className="table table-bordered table-nowrap align-middle mb-0">
                          <thead>
                            <tr>
                              <th scope="col" style={{ width: "40%" }}>
                                Amount
                              </th>
                              <th scope="col" style={{ width: "40%" }}>
                                Date
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {singleInvoice?.payments.map((payment) => (
                              <tr key={payment.id}>
                                <td>₹{payment.paymentAmount} </td>
                                <td>{payment.paymentDate}</td>
                              </tr>
                            ))}

                            <tr>
                              <td>
                                <span className="fs-15">Total Amount Paid</span>
                              </td>
                              <td>
                                {/* <span className="fs-15">₹5000</span> */}
                                <span className="fs-15">
                                  ₹
                                  {singleInvoice?.payments.reduce(
                                    (acc, curr) => {
                                      return acc + parseInt(curr.paymentAmount);
                                    },
                                    0
                                  )}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ) : (
                        <p className="fs-22 text-muted fst-italic">
                          {" "}
                          No Payments Made Yet{" "}
                        </p>
                      )}
                    </div>
                  )}
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
