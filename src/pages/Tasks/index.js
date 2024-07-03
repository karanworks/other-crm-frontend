import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddTaskModal from "./AddTaskModal";
import TaskRemoveModal from "./TaskRemoveModal";
import { useDispatch } from "react-redux";
// import { getClients, updateClient } from "../../slices/AddClient/thunk";
import { useSelector } from "react-redux";
import YoutubeLogo from "./youtube_logo.webp";
import EventsViewModal from "./EventsViewModal";
import AddEventModal from "./AddEventModal";
import { createEvent, getEvents, updateEvent } from "../../slices/Event/thunk";
import EventRemoveModal from "./EventRemoveModal";
import { getTasks, updateTask, searchTask } from "../../slices/Task/thunk";
import Loader from "../../Components/Common/Loader";
import debounceSearch from "../../utils/debounceSearch";

const Tasks = () => {
  const [events_view_modal, setEvents_view_modal] = useState(false);

  const [event_modal_delete, setEvent_modal_delete] = useState(false);

  const [add_event_view_modal, setAddEvent_view_modal] = useState(false);

  const [isEditingEvent, setIsEditingEvent] = useState(false);

  const [listEventId, setListEventId] = useState(null);

  const [modal_list, setmodal_list] = useState(false);

  const [isEditingTask, setIsEditingTask] = useState(false);

  const [modal_delete, setmodal_delete] = useState(false);

  const [listTaskId, setListTaskId] = useState(null);

  const [selectedTaskClientId, setSelectedTaskClientId] = useState(null);

  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { dropdowns } = useSelector((state) => state.AddClient);
  const { leadEvents } = useSelector((state) => state.Event);
  const { tasks, searchedTasks } = useSelector((state) => state.Task);

  const handleSearch = debounceSearch((e) => {
    dispatch(searchTask(e.target.value));
  });

  // toggles register / edit lead modal
  function tog_list() {
    setmodal_list(!modal_list);
    setIsEditingTask(false);
  }

  function utcToIstDateFormatter(dateString) {
    // Create a Date object from the UTC date string
    const utcDate = new Date(dateString);

    // Get the time in milliseconds
    const utcTime = utcDate.getTime();

    // Define the IST offset in milliseconds (IST is UTC + 5:30)
    const istOffset = 5.5 * 60 * 60 * 1000;

    // Calculate the IST time
    const istTime = new Date(utcTime + istOffset);

    // Format the IST date to a readable string
    return istTime.toISOString().replace("T", " ").slice(0, 19).split(" ")[0];
    //  dateObj?.toLocaleDateString("en-IN", options);
  }

  // toggles delete lead confirmation modal
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  function events_view_tog_list() {
    setEvents_view_modal(!events_view_modal);
  }

  function event_tog_delete() {
    setEvent_modal_delete(!event_modal_delete);
  }

  function add_event_tog_list() {
    setAddEvent_view_modal(!add_event_view_modal);
    setIsEditingEvent(false);
  }

  useEffect(() => {
    setLoading(true);
    // dispatch(getClients()).finally(() => setLoading(false));
    dispatch(getTasks()).finally(() => setLoading(false));
  }, [dispatch]);

  // formik setup
  const validation = useFormik({
    initialValues: {
      taskName: "",
      projectGenre: "",
      projectStatus: "",
      youtubeLink: "",
      projectDueDate: "",
      description: "",
    },
    validationSchema: Yup.object({
      taskName: Yup.string().required("Please enter client name"),
      projectGenre: Yup.string().required("Please enter project genre"),
      projectStatus: Yup.string().required("Please select project status"),
      projectDueDate: Yup.string().required("Please select project due date"),
      youtubeLink: Yup.string(),
      description: Yup.string().required("Please enter description"),
    }),
    onSubmit: (values) => {
      isEditingTask && dispatch(updateTask({ values, listTaskId }));
      // : dispatch(createLead(values));

      setmodal_list(false);
    },
  });
  const eventValidation = useFormik({
    initialValues: {
      eventName: "",
      eventDate: "",
    },
    validationSchema: Yup.object({
      eventName: Yup.string().required("Please enter event name"),
      eventDate: Yup.string().required("Please enter event date"),
    }),
    onSubmit: (values) => {
      isEditingEvent
        ? dispatch(updateEvent({ ...values, listEventId }))
        : dispatch(
            createEvent({
              ...values,
              clientId: selectedTaskClientId,
              taskId: selectedTaskId,
            })
          );

      setAddEvent_view_modal(false);
    },
  });

  // this function also gets triggered (with onSubmit method of formik) when submitting the register / edit lead from
  function formHandleSubmit(e) {
    e.preventDefault();
    validation.handleSubmit();
    return false;
  }
  function eventFormHandleSubmit(e) {
    e.preventDefault();
    eventValidation.handleSubmit();
    return false;
  }

  // to update the values of register form when editing the lead
  function handleEditTask(task) {
    setIsEditingTask(true);
    setmodal_list(!modal_list);
    setListTaskId(task.id);

    validation.setValues({
      taskName: task.task,
      projectGenre: task.projectGenre,
      projectStatus: task.projectStatus,
      youtubeLink: task.youtubeLink,
      projectDueDate: task.projectDueDate,
      description: task.description,
    });
  }

  function handleEditEvent(event) {
    setIsEditingEvent(true);
    setListEventId(event.id);
    setAddEvent_view_modal(!add_event_view_modal);

    eventValidation.setValues({
      eventName: event.eventName,
      eventDate: event.eventDate,
    });
  }

  document.title = "Tasks";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Tasks" pageTitle="Lead Management" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Tasks</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table">
                    <Row className="g-2 mb-3 d-flex justify-content-between">
                      <Col className="col-lg-auto" style={{ width: "350px" }}>
                        <div className="d-flex align-items-center gap-2">
                          <Input
                            id="searchKeyword"
                            name="searchKeyword"
                            className="form-control"
                            type="text"
                            placeholder="Search Task Name, Client Name, Genre"
                            onChange={handleSearch}
                          />
                        </div>
                      </Col>
                    </Row>
                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="customerTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th className="sort" data-sort="task_name">
                              Task Name
                            </th>
                            <th className="sort" data-sort="client_name">
                              Client Name
                            </th>
                            <th className="sort" data-sort="project_genre">
                              Project Genre
                            </th>
                            <th className="sort" data-sort="project_status">
                              Project Status
                            </th>
                            <th className="sort" data-sort="project_due_date">
                              Project Due Date
                            </th>
                            <th className="sort" data-sort="youtube_link">
                              Youtube Link
                            </th>
                            <th className="sort" data-sort="description">
                              Description
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
                          {loading ? (
                            <tr>
                              <td
                                colSpan={7}
                                style={{
                                  border: "none",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                <Loader />
                              </td>
                            </tr>
                          ) : (
                            (searchedTasks.length !== 0
                              ? searchedTasks
                              : tasks
                            )?.map((task) => (
                              <tr key={task.id}>
                                <td className="task-name">{task.task}</td>
                                <td className="client-name">
                                  {task.clientName}
                                </td>
                                <td className="project_genre">
                                  {task.projectGenre}
                                </td>
                                <td className="project_status">
                                  {task.projectStatus}
                                </td>
                                <td className="project_due_date">
                                  {utcToIstDateFormatter(task.projectDueDate)}
                                </td>
                                <td className="youtube_link">
                                  <a href={task.youtubeLink} target="blank">
                                    {/* Youtube Link */}

                                    <img
                                      src={YoutubeLogo}
                                      height="50px"
                                      width="50px"
                                    />
                                  </a>
                                </td>
                                <td className="address">{task.description}</td>
                                <td className="added_by">
                                  <div>
                                    <div
                                      style={{ borderBottom: "1px solid gray" }}
                                    >
                                      {console.log(
                                        "ADDED BY USERNAME ERROR ->",
                                        task
                                      )}
                                      <span> {task.addedBy.username}</span>
                                    </div>
                                    <div>
                                      <span
                                        className="text-muted"
                                        style={{ fontSize: "12px" }}
                                      >
                                        {" "}
                                        {task.addedBy.branch
                                          ? task.addedBy.branch
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
                                          events_view_tog_list();
                                          dispatch(getEvents(task.id));
                                          setSelectedTaskClientId(
                                            task.clientId
                                          );
                                          setSelectedTaskId(task.id);
                                        }}
                                      >
                                        View Events
                                      </button>
                                    </div>

                                    <div className="edit">
                                      <button
                                        className="btn btn-sm btn-primary edit-item-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#showModal"
                                        onClick={() => {
                                          handleEditTask(task);
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
                                          setListTaskId(task.id);
                                          setmodal_delete(true);
                                        }}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
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
      <AddTaskModal
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
        validation={validation}
        isEditingTask={isEditingTask}
        dropdowns={dropdowns}
      />

      {/* Remove Modal */}
      <TaskRemoveModal
        modal_delete={modal_delete}
        tog_delete={tog_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteTask={() => {
          dispatch(updateTask({ listTaskId, status: 0 }));
          setmodal_delete(false);
        }}
      />

      <EventsViewModal
        events_view_modal={events_view_modal}
        events_view_tog_list={events_view_tog_list}
        add_event_tog_list={add_event_tog_list}
        event_tog_delete={event_tog_delete}
        setListEventId={setListEventId}
        leadEvents={leadEvents}
        handleEditEvent={handleEditEvent}
      />

      <EventRemoveModal
        event_modal_delete={event_modal_delete}
        event_tog_delete={event_tog_delete}
        handleDeleteEvent={() => {
          dispatch(updateEvent({ listEventId, status: 0 }));
          event_tog_delete();
        }}
      />

      <AddEventModal
        add_event_view_modal={add_event_view_modal}
        add_event_tog_list={add_event_tog_list}
        eventValidation={eventValidation}
        isEditingEvent={isEditingEvent}
        eventFormHandleSubmit={eventFormHandleSubmit}
      />
    </React.Fragment>
  );
};

export default Tasks;
