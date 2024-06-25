import React, { useEffect, useState } from "react";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import LeadRemoveModal from "./LeadRemoveModal";
import { useDispatch } from "react-redux";

import {
  getLeads,
  createLead,
  removeLead,
  updateLead,
} from "../../slices/AddLead/thunk";
import { useSelector } from "react-redux";
import YoutubeLogo from "./youtube_logo.webp";
import EventsViewModal from "../Tasks/EventsViewModal";
// import AddTaskModal from "./AddTaskModal2";
import AddTaskModal from "./AddTaskModal";
import {
  createEvent,
  getEvents,
  updateEvent,
  removeEvent,
} from "../../slices/Report/thunk";
import { getTasks } from "../../slices/Task/thunk";
import EventRemoveModal from "./EventRemoveModal";
import EditClientModal from "./EditClientModal";

const Clients = () => {
  const [add_task_modal, setAdd_task_modal] = useState(false);

  const [event_modal_delete, setEvent_modal_delete] = useState(false);

  // const [add_task_view_modal, setAddTask_view_modal] = useState(false);
  // const [add_event_view_modal, setAddEvent_view_modal] = useState(false);

  const [isEditingEvent, setIsEditingEvent] = useState(false);

  const [listEventId, setListEventId] = useState(null);

  // needed this for creating event
  const [selectedClientName, setSelectedClientName] = useState("");

  const [selectedLeadMobileNo, setSelectedLeadMobileNo] = useState("");

  // separater

  // const [modal_list, setmodal_list] = useState(false);

  const [edit_client_modal, setEdit_client_modal] = useState(false);

  // const [isEditingLead, setIsEditingLead] = useState(false);

  const [isEditingClient, setIsEditingClient] = useState(false);

  const [modal_delete, setmodal_delete] = useState(false);

  // const [listLeadId, setListLeadId] = useState(null);

  const [listClientId, setListClientId] = useState(null);

  const dispatch = useDispatch();

  const { leads, dropdowns, error } = useSelector((state) => state.AddLead);
  const { leadEvents } = useSelector((state) => state.Report);

  // toggles register / edit lead modal
  function edit_client_tog_list() {
    setEdit_client_modal(!edit_client_modal);
    setIsEditingClient(false);
  }

  // toggles delete lead confirmation modal
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  function add_task_tog_list() {
    setAdd_task_modal(!add_task_modal);
  }

  function event_tog_delete() {
    setEvent_modal_delete(!event_modal_delete);
  }

  function add_event_tog_list() {
    setAddEvent_view_modal(!add_event_view_modal);
    setIsEditingEvent(false);
  }

  useEffect(() => {
    dispatch(getLeads());
  }, [dispatch]);

  // formik setup
  const taskValidation = useFormik({
    initialValues: {
      taskName: "",
      projectGenre: "",
      projectStatus: "",
      projectDueDate: "",
      youtubeLink: "",
      description: "",
    },
    validationSchema: Yup.object({
      taskName: Yup.string().required("Please enter task name"),
      projectGenre: Yup.string().required("Please enter project genre"),
      projectStatus: Yup.string().required("Please select project status"),
      projectDueDate: Yup.string().required("Please select project due date"),
      youtubeLink: Yup.string(),
      description: Yup.string(),
    }),
    onSubmit: (values) => {
      // : dispatch(createLead(values));

      setEdit_client_modal(false);
    },
  });
  const clientValidation = useFormik({
    initialValues: {
      clientName: "",
      mobileNo: "",
      address: "",
    },
    validationSchema: Yup.object({
      clientName: Yup.string().required("Please enter client name"),
      mobileNo: Yup.string().required("Please enter mobile no"),
      address: Yup.string().required("Please enter address"),
    }),
    onSubmit: (values) => {
      // isEditingEvent
      //   ? dispatch(updateEvent({ ...values, listEventId }))
      //   : dispatch(
      //       createEvent({
      //         ...values,
      //         clientName: selectedClientName,
      //         leadMobileNo: selectedLeadMobileNo,
      //       })
      //     );
      isEditingClient && dispatch(updateLead({ values, listClientId }));

      setAddEvent_view_modal(false);
    },
  });

  // this function also gets triggered (with onSubmit method of formik) when submitting the register / edit lead from
  function formHandleSubmit(e) {
    e.preventDefault();
    taskValidation.handleSubmit();
    return false;
  }
  function eventFormHandleSubmit(e) {
    e.preventDefault();
    clientValidation.handleSubmit();
    return false;
  }

  // to update the values of register form when editing the lead
  function handleEditClient(client) {
    console.log("EDIT CLIENT CALLED ->", client);
    setIsEditingClient(true);
    setEdit_client_modal(!edit_client_modal);
    setListClientId(client.id);

    clientValidation.setValues({
      clientName: client.clientName,
      mobileNo: client.mobileNo,
      address: client.address,
    });
  }

  document.title = "Clients";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Clients" pageTitle="Lead Management" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Clients</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="campaignList">
                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="customerTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th scope="col" style={{ width: "50px" }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="checkAll"
                                  value="option"
                                />
                              </div>
                            </th>
                            <th className="sort" data-sort="client_name">
                              Client Name
                            </th>
                            <th className="sort" data-sort="mobile_no">
                              Mobile No
                            </th>
                            <th className="sort" data-sort="project_genre">
                              Address
                            </th>

                            <th className="sort" data-sort="added_by">
                              Added By
                            </th>

                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {leads?.map((client) => (
                            <tr key={client?.id}>
                              <th scope="row">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="checkAll"
                                    value="option1"
                                  />
                                </div>
                              </th>
                              <td className="client-name">
                                {client.clientName}
                              </td>
                              <td className="client-name">{client.mobileNo}</td>

                              <td className="project-date">{client.address}</td>

                              <td className="added_by">
                                <div>
                                  <div
                                    style={{ borderBottom: "1px solid gray" }}
                                  >
                                    <span> {client.addedBy.username}</span>
                                  </div>
                                  <div>
                                    <span
                                      className="text-muted"
                                      style={{ fontSize: "12px" }}
                                    >
                                      {" "}
                                      {client.addedBy.branch
                                        ? client.addedBy.branch
                                        : "Admin"}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <div className="d-flex gap-2">
                                  <div className="viewEvents">
                                    <button
                                      className="btn btn-sm btn-success e"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => {
                                        add_task_tog_list();
                                        // dispatch(getEvents(lead.mobileNo));
                                        // dispatch(getTasks(lead.id));
                                        setSelectedClientName(
                                          client.clientName
                                        );
                                        setSelectedLeadMobileNo(
                                          client.mobileNo
                                        );
                                      }}
                                    >
                                      Add Task
                                    </button>
                                  </div>

                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => {
                                        handleEditClient(client);
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-danger remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      onClick={() => {
                                        setListClientId(client.id);
                                        setmodal_delete(true);
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <Link
                          className="page-item pagination-prev disabled"
                          to="#"
                        >
                          Previous
                        </Link>
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        <Link className="page-item pagination-next" to="#">
                          Next
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </div>

      {/* Add Modal */}
      <EditClientModal
        edit_client_modal={edit_client_modal}
        edit_client_tog_list={edit_client_tog_list}
        formHandleSubmit={formHandleSubmit}
        clientValidation={clientValidation}
        isEditingClient={isEditingClient}
        dropdowns={dropdowns}
      />

      {/* Remove Modal */}
      <LeadRemoveModal
        modal_delete={modal_delete}
        tog_delete={tog_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteCampaign={() => {
          dispatch(updateLead({ listClientId, status: 0 }));
          setmodal_delete(false);
        }}
      />

      {/* <EventsViewModal
        events_view_modal={events_view_modal}
        events_view_tog_list={events_view_tog_list}
        add_event_tog_list={add_event_tog_list}
        event_tog_delete={event_tog_delete}
        setListEventId={setListEventId}
        leadEvents={leadEvents}
        handleEditEvent={handleEditEvent}
      /> */}

      <EventRemoveModal
        event_modal_delete={event_modal_delete}
        event_tog_delete={event_tog_delete}
        handleDeleteEvent={() => {
          dispatch(updateEvent({ listEventId, status: 0 }));
          event_tog_delete();
        }}
      />

      <AddTaskModal
        add_task_modal={add_task_modal}
        add_task_tog_list={add_task_tog_list}
        // eventValidation={eventValidation}
        isEditingEvent={isEditingEvent}
        eventFormHandleSubmit={eventFormHandleSubmit}
        formHandleSubmit={formHandleSubmit}
        taskValidation={taskValidation}
        dropdowns={dropdowns}
      />
    </React.Fragment>
  );
};

export default Clients;
