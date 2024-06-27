import React, { useState, useEffect, useRef } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Input,
  Form,
  FormFeedback,
  Button,
  ButtonGroup,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Label,
  Alert,
} from "reactstrap";

import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Flatpickr from "react-flatpickr";

import {
  getClients,
  createClient,
  createDropdown,
  clientAlreadyExist,
} from "../../slices/AddClient/thunk";
import { createEvent } from "../../slices/Event/thunk";
import { useSelector } from "react-redux";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const AddClient = () => {
  const [singleCategoryOption, setSingleCategoryOption] = useState(null);

  const [addDropdownOpen, setAddDropdownOpen] = useState(false);

  const [selectedSingleGenre, setSelectedSingleGenre] = useState(null);

  const [selectedSingleStatus, setSelectedSingleStatus] = useState(null);

  const [eventContainer, setEventContainer] = useState([]);

  const flatpickrRef = useRef(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { userData, dropdowns, error } = useSelector(
    (state) => state.AddClient
  );

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  let SingleGenreOptions = dropdowns
    ?.map((dropdown) => {
      if (dropdown.category === "Project Genre") {
        return { value: dropdown.dropdownName, label: dropdown.dropdownName };
      }
    })
    .filter(Boolean);

  let SingleStatusOptions = dropdowns
    ?.map((dropdown) => {
      if (dropdown.category === "Project Status") {
        return { value: dropdown.dropdownName, label: dropdown.dropdownName };
      }
    })
    .filter(Boolean);

  function handleSelectSingleGenre(selectedSingle) {
    setSelectedSingleGenre(selectedSingle);
  }

  function handleSelectSingleStatus(selectedSingle) {
    setSelectedSingleStatus(selectedSingle);
  }

  const projectCategoryOptions = [
    { value: "Project Genre", label: "Project Genre" },
    { value: "Project Status", label: "Project Status" },
  ];

  function handleSelectSingle(selectedSingle) {
    setSingleCategoryOption(selectedSingle);
  }

  function handleEventNameChange(id, newName, leadMobileNo, clientName) {
    setEventContainer((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id
          ? { ...event, eventName: newName, leadMobileNo, clientName }
          : event
      )
    );

    validation.setFieldValue(
      "events",
      eventContainer.map((event) =>
        event.id === id
          ? { ...event, eventName: newName, leadMobileNo, clientName }
          : event
      )
    );
  }

  function handleEventDateChange(id, newDate, leadMobileNo, clientName) {
    setEventContainer((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id
          ? { ...event, eventDate: newDate, leadMobileNo, clientName }
          : event
      )
    );

    validation.setFieldValue(
      "events",
      eventContainer.map((event) =>
        event.id === id
          ? { ...event, eventDate: newDate, leadMobileNo, clientName }
          : event
      )
    );
  }

  function handleDeleteEventContainer(eventContainerId) {
    const filteredEventContainers = eventContainer?.filter((container) => {
      return container.id !== eventContainerId;
    });

    setEventContainer(filteredEventContainers);
    validation.setFieldValue("events", filteredEventContainers);
  }

  // formik setup
  const validation = useFormik({
    initialValues: {
      mobileNo: "",
      clientName: "",
      address: "",
      task: "",
      projectGenre: "",
      youtubeLink: "",
      projectDueDate: "",
      description: "",
      projectStatus: "",
      events: "",
    },
    validationSchema: Yup.object({
      clientName: Yup.string().required("Please enter client name"),
      mobileNo: Yup.string().required("Please enter mobile no"),
      address: Yup.string().required("Please enter address"),
      task: Yup.string().required("Please enter task"),
      description: Yup.string().required("Please enter description"),
      projectGenre: Yup.string().required("Please enter project genre"),
      projectStatus: Yup.string().required("Please select project status"),
      youtubeLink: Yup.string(),
      events: Yup.array(),
      projectDueDate: Yup.string().required("Please select project due date"),
    }),
    onSubmit: (values, { resetForm }) => {
      const { events } = values;
      if (events) {
        dispatch(createEvent(events));
      }

      dispatch(createClient(values));

      resetForm();
      setSelectedSingleGenre(null);
      setSelectedSingleStatus(null);
      if (flatpickrRef.current) {
        flatpickrRef.current.flatpickr.clear();
      }

      setTimeout(() => {
        navigate("/clients");
      }, 1000);
    },
  });

  const dropdownValidation = useFormik({
    initialValues: {
      category: "",
      dropdownName: "",
    },
    validationSchema: Yup.object({
      category: Yup.string().required("Please select category"),
      dropdownName: Yup.string().required("Please enter dropdown name "),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(createDropdown(values));
      setAddDropdownOpen(false);
      resetForm();
    },
  });

  // this function also gets triggered (with onSubmit method of formik) when submitting the register / edit lead from
  function formHandleSubmit(e) {
    e.preventDefault();

    validation.handleSubmit();
    return false;
  }
  function dropdownHandleSubmit(e) {
    e.preventDefault();
    dropdownValidation.handleSubmit();
    return false;
  }

  document.title = "Add Client";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Add Client" pageTitle="Lead Management" />
          <Row className="d-flex ">
            <Col lg={6}>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0" style={{ fontSize: "20px" }}>
                    Create Client
                  </h4>

                  <div className="d-flex" style={{ gap: "5px" }}>
                    {userData?.roleId === 1 ? (
                      <ButtonGroup>
                        <UncontrolledDropdown isOpen={addDropdownOpen}>
                          <DropdownToggle
                            tag="button"
                            className="btn btn-primary"
                            onClick={() => setAddDropdownOpen(!addDropdownOpen)}
                          >
                            Add Dropdown{" "}
                            <i className="mdi mdi-chevron-down"></i>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-md p-4">
                            <Form onSubmit={(e) => dropdownHandleSubmit(e)}>
                              <div className="mb-2">
                                <Label
                                  htmlFor="category"
                                  className="form-label"
                                >
                                  Dropdown Category
                                </Label>
                                <Select
                                  id="category"
                                  name="category"
                                  value={singleCategoryOption}
                                  onChange={(category) => {
                                    handleSelectSingle(category);
                                    dropdownValidation.setFieldValue(
                                      "category",
                                      category.value
                                    );
                                  }}
                                  options={projectCategoryOptions}
                                  placeholder="Select Category"
                                />
                              </div>

                              <div className="mb-2">
                                <Label
                                  htmlFor="dropdownName"
                                  className="form-label"
                                >
                                  Dropdown Name
                                </Label>

                                <Input
                                  id="dropdownName"
                                  name="dropdownName"
                                  className="form-control"
                                  placeholder="Hindi, Bhojpuri etc."
                                  type="text"
                                  onChange={dropdownValidation.handleChange}
                                  onBlur={dropdownValidation.handleBlur}
                                  value={dropdownValidation.values.dropdownName}
                                  invalid={
                                    dropdownValidation.touched.dropdownName &&
                                    dropdownValidation.errors.dropdownName
                                      ? true
                                      : false
                                  }
                                />

                                {dropdownValidation.touched.dropdownName &&
                                dropdownValidation.errors.dropdownName ? (
                                  <FormFeedback type="invalid">
                                    {dropdownValidation.errors.dropdownName}
                                  </FormFeedback>
                                ) : null}
                              </div>

                              <Button type="submit" className="btn btn-primary">
                                Add
                              </Button>
                            </Form>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </ButtonGroup>
                    ) : null}

                    {/* <button
                      className="btn btn-primary d-flex"
                      style={{ gap: "5px" }}
                      onClick={handleAddEventContainer}
                    >
                      {" "}
                      <i className="ri-calendar-event-line"></i>
                      <span>Add Event</span>
                    </button> */}
                  </div>
                </CardHeader>

                <CardBody>
                  {error ? (
                    <Alert
                      className="border-0 alert-warning text-center mb-2 mx-2"
                      role="alert"
                    >
                      {error}
                    </Alert>
                  ) : null}

                  <div className="listjs-table" id="campaignList">
                    <Form
                      className="tablelist-form"
                      onSubmit={(e) => formHandleSubmit(e)}
                    >
                      <div className="mb-3">
                        <Label htmlFor="mobileNo" className="form-label">
                          Mobile No
                        </Label>

                        <Input
                          id="mobileNo"
                          name="mobileNo"
                          className="form-control"
                          placeholder="Enter mobile name"
                          type="text"
                          onChange={(e) => {
                            validation.handleChange(e);
                            if (e.target.value.length >= 10) {
                              dispatch(clientAlreadyExist(e.target.value));
                            }
                          }}
                          onBlur={validation.handleBlur}
                          value={validation.values.mobileNo || ""}
                          invalid={
                            validation.touched.mobileNo &&
                            validation.errors.mobileNo
                              ? true
                              : false
                          }
                        />

                        {validation.touched.mobileNo &&
                        validation.errors.mobileNo ? (
                          <FormFeedback type="invalid">
                            {validation.errors.mobileNo}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="clientName" className="form-label">
                          Client Name
                        </Label>

                        <Input
                          id="clientName"
                          name="clientName"
                          className="form-control"
                          placeholder="Enter client name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.clientName || ""}
                          invalid={
                            validation.touched.clientName &&
                            validation.errors.clientName
                              ? true
                              : false
                          }
                        />

                        {validation.touched.clientName &&
                        validation.errors.clientName ? (
                          <FormFeedback type="invalid">
                            {validation.errors.clientName}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="address" className="form-label">
                          Address
                        </Label>

                        <Input
                          id="address"
                          name="address"
                          className="form-control"
                          placeholder="Enter address"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.address || ""}
                          invalid={
                            validation.touched.address &&
                            validation.errors.address
                              ? true
                              : false
                          }
                        />

                        {validation.touched.address &&
                        validation.errors.address ? (
                          <FormFeedback type="invalid">
                            {validation.errors.address}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="task" className="form-label">
                          Task
                        </Label>

                        <Input
                          id="task"
                          name="task"
                          className="form-control"
                          placeholder="Enter task"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.task || ""}
                          invalid={
                            validation.touched.task && validation.errors.task
                              ? true
                              : false
                          }
                        />

                        {validation.touched.task && validation.errors.task ? (
                          <FormFeedback type="invalid">
                            {validation.errors.task}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="projectGenre" className="form-label">
                          Project Genre
                        </Label>
                        <Select
                          id="projectGenre"
                          name="projectGenre"
                          value={selectedSingleGenre}
                          onChange={(genre) => {
                            handleSelectSingleGenre(genre);
                            validation.setFieldValue(
                              "projectGenre",
                              genre.value
                            );
                          }}
                          options={SingleGenreOptions}
                          placeholder="Select Genre"
                        />
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="clientName" className="form-label">
                          Youtube Link
                        </Label>

                        <Input
                          id="youtubeLink"
                          name="youtubeLink"
                          className="form-control"
                          placeholder="Enter Youtube Link"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.youtubeLink || ""}
                          invalid={
                            validation.touched.youtubeLink &&
                            validation.errors.youtubeLink
                              ? true
                              : false
                          }
                        />

                        {validation.touched.youtubeLink &&
                        validation.errors.youtubeLink ? (
                          <FormFeedback type="invalid">
                            {validation.errors.youtubeLink}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Project Due Date</Label>
                        <Flatpickr
                          ref={flatpickrRef}
                          className="form-control"
                          placeholder="Select Project Due Date"
                          options={{
                            dateFormat: "d M, Y",
                          }}
                          onChange={(date) => {
                            const formattedDate = new Date(
                              date
                            ).toLocaleDateString("en-GB");
                            validation.setFieldValue(
                              "projectDueDate",
                              formattedDate
                            );
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="description" className="form-label">
                          Description
                        </Label>

                        <Input
                          id="description"
                          name="description"
                          className="form-control"
                          placeholder="Enter description"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.description || ""}
                          invalid={
                            validation.touched.description &&
                            validation.errors.description
                              ? true
                              : false
                          }
                        />

                        {validation.touched.description &&
                        validation.errors.description ? (
                          <FormFeedback type="invalid">
                            {validation.errors.description}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="projectStatus" className="form-label">
                          Project Status
                        </Label>
                        <Select
                          id="projectStatus"
                          name="projectStatus"
                          value={selectedSingleStatus}
                          onChange={(status) => {
                            handleSelectSingleStatus(status);
                            validation.setFieldValue(
                              "projectStatus",
                              status.value
                            );
                          }}
                          options={SingleStatusOptions}
                          placeholder="Select Status"
                        />
                      </div>

                      {eventContainer?.length !== 0 && (
                        <div>
                          <span className="fs-18">Events</span>
                          <div>
                            {eventContainer?.map((eventWrapper) => (
                              <div
                                className="d-flex mb-2"
                                style={{ gap: "10px" }}
                                key={eventWrapper.id}
                              >
                                <div>
                                  <Input
                                    className="form-control"
                                    placeholder="Enter event name"
                                    type="text"
                                    value={eventWrapper.eventName}
                                    onChange={(e) =>
                                      handleEventNameChange(
                                        eventWrapper.id,
                                        e.target.value,
                                        validation.values.mobileNo,
                                        validation.values.clientName
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Flatpickr
                                    className="form-control"
                                    placeholder="Select event date"
                                    options={{
                                      dateFormat: "d M, Y",
                                    }}
                                    onChange={(date) => {
                                      const formattedDate = new Date(
                                        date
                                      ).toLocaleDateString("en-GB");

                                      handleEventDateChange(
                                        eventWrapper.id,
                                        formattedDate,
                                        validation.values.mobileNo,
                                        validation.values.clientName
                                      );
                                    }}
                                  />
                                </div>
                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-icon "
                                    onClick={() =>
                                      handleDeleteEventContainer(
                                        eventWrapper.id
                                      )
                                    }
                                  >
                                    <i className="ri-delete-bin-5-line"></i>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="text-end">
                        <button type="submit" className="btn btn-primary">
                          Save Client
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </div>
    </React.Fragment>
  );
};

export default AddClient;
