import React, { useEffect, useState } from "react";
import axios from "axios";

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
} from "reactstrap";

import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddLeadModal from "./AddLeadModal";
import LeadRemoveModal from "./LeadRemoveModal";
import { useDispatch } from "react-redux";

import {
  getLeads,
  createLead,
  removeLead,
  updateLead,
  createDropdown,
} from "../../slices/AddLead/thunk";
import { logoutUser } from "../../slices/auth/login/thunk";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from "react-select";
import YoutubeLogo from "./youtube_logo.webp";

const Report = () => {
  const [modal_list, setmodal_list] = useState(false);

  const [isEditingLead, setIsEditingLead] = useState(false);

  const [modal_delete, setmodal_delete] = useState(false);

  const [listLeadId, setListLeadId] = useState(null);

  const [singleCategoryOption, setSingleCategoryOption] = useState(null);

  const [addDropdownOpen, setAddDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { leads, dropdowns, error } = useSelector((state) => state.AddLead);

  const projectCategoryOptions = [
    { value: "Project Genre", label: "Project Genre" },
    { value: "Project Status", label: "Project Status" },
  ];

  function handleSelectSingle(selectedSingle) {
    setSingleCategoryOption(selectedSingle);
  }

  // toggles register / edit lead modal
  function tog_list() {
    setmodal_list(!modal_list);
    setIsEditingLead(false);
  }

  // toggles delete lead confirmation modal
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  useEffect(() => {
    dispatch(getLeads());
  }, [dispatch]);

  // formik setup
  const validation = useFormik({
    initialValues: {
      clientName: "",
      projectGenre: "",
      projectStatus: "",
      youtubeLink: "",
      // projectDueDate: "",
    },
    validationSchema: Yup.object({
      clientName: Yup.string().required("Please enter client name"),
      projectGenre: Yup.string().required("Please enter project genre"),
      projectStatus: Yup.string().required("Please select project status"),
      youtubeLink: Yup.string(),
      // projectDueDate: Yup.string(),
      // .required("Please select project due date"),
    }),
    onSubmit: (values) => {
      console.log("ADD LEAD FORM ->", values);

      isEditingLead
        ? dispatch(updateLead({ values, listLeadId }))
        : dispatch(createLead(values));

      setmodal_list(false);
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
    onSubmit: (values) => {
      dispatch(createDropdown(values));
      setAddDropdownOpen(false);
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

  // to update the values of register form when editing the lead
  function handleEditLead(lead) {
    setIsEditingLead(true);
    setmodal_list(!modal_list);
    setListLeadId(lead.id);

    validation.values.clientName = lead.clientName;
    validation.values.projectGenre = lead.projectGenre;
    validation.values.projectStatus = lead.projectStatus;
    validation.values.youtubeLink = lead.youtubeLink;
    // YOUTUBELINK, DUE DATE FIELD REMAINING HERE
  }

  document.title = "Report";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Report" pageTitle="Lead Management" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Report</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="campaignList">
                    {/* <Row className="g-4 mb-3">
                      <Col className="col-sm-auto">
                        <div className="d-flex">
                          <div>
                            <Button
                              color="primary"
                              className="add-btn me-1"
                              onClick={() => tog_list()}
                              id="create-btn"
                            >
                              <i className="ri-add-line align-bottom me-1"></i>{" "}
                              Add Lead
                            </Button>
                          </div>
                          <ButtonGroup>
                            <UncontrolledDropdown isOpen={addDropdownOpen}>
                              <DropdownToggle
                                tag="button"
                                className="btn btn-primary"
                                onClick={() =>
                                  setAddDropdownOpen(!addDropdownOpen)
                                }
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
                                      value={
                                        dropdownValidation.values.dropdownName
                                      }
                                      invalid={
                                        dropdownValidation.touched
                                          .dropdownName &&
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

                                  <Button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    Add
                                  </Button>
                                </Form>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </ButtonGroup>
                        </div>
                      </Col>
                    </Row> */}

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
                            <th className="sort" data-sort="project_genre">
                              Project Genre
                            </th>
                            <th className="sort" data-sort="project_due_date">
                              Project Due Date
                            </th>
                            <th
                              className="sort"
                              data-sort="project_youtube_link"
                            >
                              Project YouTube Link
                            </th>
                            <th className="sort" data-sort="project_status">
                              Project Status
                            </th>
                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {leads?.map((lead) => (
                            <tr key={lead?.id}>
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
                              <td className="client-name">{lead.clientName}</td>
                              <td className="project-genre">
                                {lead.projectGenre}
                              </td>
                              <td className="project-date">
                                {lead.projectDueDate}
                              </td>
                              <td className="project-youtube-link">
                                <a href={lead.youtubeLink} target="blank">
                                  {/* Youtube Link */}

                                  <img
                                    src={YoutubeLogo}
                                    height="50px"
                                    width="50px"
                                  />
                                </a>
                              </td>
                              <td className="project-status">
                                <span className="badge border border-primary text-primary fs-13">
                                  {" "}
                                  {lead.projectStatus}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => {
                                        handleEditLead(lead);
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
                                        setListLeadId(lead.id);
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
      <AddLeadModal
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
        validation={validation}
        isEditingLead={isEditingLead}
        dropdowns={dropdowns}
      />

      {/* Remove Modal */}
      <LeadRemoveModal
        modal_delete={modal_delete}
        tog_delete={tog_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteCampaign={() => {
          dispatch(removeLead(listLeadId));
          setmodal_delete(false);
        }}
      />
    </React.Fragment>
  );
};

export default Report;
