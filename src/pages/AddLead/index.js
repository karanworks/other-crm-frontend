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
  Button,
  ButtonGroup,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddLeadModal from "./AddLeadModal";
import LeadRemoveModal from "./LeadRemoveModal";
import { useDispatch } from "react-redux";
import {
  getCampaigns,
  createCampaign,
  removeCampaign,
  updateCampaign,
} from "../../slices/Campaigns/thunk";
import {
  getLeads,
  createLead,
  removeLead,
  updateLead,
} from "../../slices/AddLead/thunk";
import { logoutUser } from "../../slices/auth/login/thunk";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from "react-select";

const AddLead = () => {
  const [modal_list, setmodal_list] = useState(false);

  // const [isEditingCampaign, setIsEditingCampaign] = useState(false);
  const [isEditingLead, setIsEditingLead] = useState(false);

  const [modal_delete, setmodal_delete] = useState(false);

  // const [listCampaignId, setListCampaignId] = useState(null);
  const [listLeadId, setListLeadId] = useState(null);

  const [singleCategoryOption, setSingleCategoryOption] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { campaigns, alreadyExistsError, error } = useSelector(
  //   (state) => state.Campaigns
  // );
  const { leads, error } = useSelector((state) => state.AddLead);

  const projectCategoryOptions = [
    { value: "Project Genre", label: "Project Genre" },
    { value: "Project Status", label: "Project Status" },
  ];

  function handleSelectSingle(selectedSingle) {
    setSingleCategoryOption(selectedSingle);
  }

  useEffect(() => {
    if (error) {
      dispatch(logoutUser());
      navigate("/login");
      window.location.reload();
    }
  }, [dispatch, error]);

  // toggles register / edit campaign modal
  function tog_list() {
    setmodal_list(!modal_list);
    setIsEditingLead(false);
  }

  // toggles delete campaign confirmation modal
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  // useEffect(() => {
  //   if (alreadyExistsError) {
  //     setmodal_list(!modal_list);
  //   }
  // }, [alreadyExistsError]);

  // useEffect(() => {
  //   dispatch(getCampaigns());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getLeads());
  }, [dispatch]);

  // formik setup
  const validation = useFormik({
    initialValues: {
      clientName: "",
      projectGenre: "",
      projectStatus: "",
      projectDueDate: "",
      youtubeLink: "",
    },
    validationSchema: Yup.object({
      clientName: Yup.string().required("Please enter client name"),
      projectGenre: Yup.string().required("Please enter project genre"),
      projectStatus: Yup.string().required("Please select project status"),
      projectDueDate: Yup.string(),
      // .required("Please select project due date"),
      youtubeLink: Yup.string(),
    }),
    onSubmit: (values) => {
      console.log("ADD LEAD FORM ->", values);

      isEditingLead
        ? dispatch(updateLead({ values, listLeadId }))
        : dispatch(createLead(values));

      setmodal_list(false);
    },
  });

  // this function also gets triggered (with onSubmit method of formik) when submitting the register / edit campaign from
  function formHandleSubmit(e) {
    e.preventDefault();
    validation.handleSubmit();
    return false;
  }

  // to update the values of register form when editing the campaign
  function handleEditCampaign(campaignData) {
    setIsEditingLead(true);
    setmodal_list(!modal_list);
    setListLeadId(campaignData.id);

    validation.values.campaignName = campaignData.campaignName;
    validation.values.campaignDescription = campaignData.campaignDescription;
    validation.values.campaignType = campaignData.campaignType;
  }

  document.title = "Add Lead";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Add Lead" pageTitle="Lead Management" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Create Lead</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="campaignList">
                    <Row className="g-4 mb-3">
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
                            <UncontrolledDropdown>
                              <DropdownToggle
                                tag="button"
                                className="btn btn-primary"
                              >
                                Add Dropdown{" "}
                                <i className="mdi mdi-chevron-down"></i>
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-md p-4">
                                <form>
                                  <div className="mb-2">
                                    <label
                                      className="form-label"
                                      htmlFor="exampleDropdownFormEmail"
                                    >
                                      Dropdown Category
                                    </label>
                                    <Select
                                      value={singleCategoryOption}
                                      onChange={handleSelectSingle}
                                      options={projectCategoryOptions}
                                      placeholder="Select Genre"
                                    />
                                  </div>
                                  <div className="mb-2">
                                    <label
                                      className="form-label"
                                      htmlFor="exampleDropdownFormEmail"
                                    >
                                      Dropdown Name
                                    </label>
                                    <Input
                                      type="email"
                                      className="form-control"
                                      id="exampleDropdownFormEmail"
                                      placeholder="Hindi, Bhojpuri etc."
                                    />
                                  </div>

                                  <Button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    Add
                                  </Button>
                                </form>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </ButtonGroup>
                        </div>
                      </Col>
                      {/* search input for future if needed */}
                      {/* <Col className="col-sm">
                        <div className="d-flex justify-content-sm-end">
                          <div className="search-box ms-2">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Search..."
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>
                      </Col> */}
                    </Row>

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
                            <th className="sort" data-sort="campaign_name">
                              Client Name
                            </th>
                            <th
                              className="sort"
                              data-sort="campaign_description"
                            >
                              Project Genre
                            </th>
                            <th className="sort" data-sort="dnc">
                              Project Due Date
                            </th>
                            <th className="sort" data-sort="amd">
                              Project YouTube Link
                            </th>
                            <th className="sort" data-sort="callback">
                              Project Status
                            </th>
                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {/* {campaigns?.map((campaign) => (
                            <tr key={campaign?.id}>
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
                              <td className="campaign-name">
                                {campaign.campaignName}
                              </td>
                              <td className="campaign-description">
                                {campaign.campaignDescription}
                              </td>
                              <td className="campaign-callback">
                                {campaign.callback}
                              </td>
                              <td className="campaign-dnc">{campaign.dnc}</td>
                              <td className="campaign-amd">{campaign.amd}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => {
                                        handleEditCampaign(campaign);
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-success remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      onClick={() => {
                                        setListCampaignId(campaign.id);
                                        setmodal_delete(true);
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))} */}
                        </tbody>
                      </table>
                      <div className="noresult" style={{ display: "none" }}>
                        <div className="text-center">
                          <lord-icon
                            src="https://cdn.lordicon.com/msoeawqm.json"
                            trigger="loop"
                            colors="primary:#25a0e2,secondary:#00bd9d"
                            style={{ width: "75px", height: "75px" }}
                          ></lord-icon>
                          <h5 className="mt-2">Sorry! No Result Found</h5>
                          <p className="text-muted mb-0">
                            We've searched more than 150+ Orders We did not find
                            any orders for you search.
                          </p>
                        </div>
                      </div>
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
      />

      {/* Remove Modal */}
      <LeadRemoveModal
        modal_delete={modal_delete}
        tog_delete={tog_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteCampaign={() => {
          dispatch(removeCampaign(listLeadId));
          setmodal_delete(false);
        }}
      />
    </React.Fragment>
  );
};

export default AddLead;
