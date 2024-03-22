import React, { useEffect, useState } from "react";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import CampaignFormModal from "./CampaignFormModal";
import CampaignRemoveModal from "./CampaignRemoveModal";
import {
  notifyAddedCampaign,
  notifyDeletedCampaign,
  notifyUpdatedCampaign,
} from "./toasts";

const Campaign = () => {
  // register / edit user modal state whether modal is open or not
  const [modal_list, setmodal_list] = useState(false);
  // this state triggers when editing the user
  const [isEditingCampaign, setIsEditingCampaign] = useState(false);
  // admin details with users that he has added
  const [adminUsersData, setAdminUsersData] = useState([]);
  // delete user confirmation modal state
  const [modal_delete, setmodal_delete] = useState(false);
  // when we click on edit / delete user button this state stores that user's id, had to make this state because I needed to have that user's id to make changes to it
  const [listCampaignId, setListCampaignId] = useState(null);

  // toggles register / edit user modal
  function tog_list() {
    setmodal_list(!modal_list);
    setIsEditingCampaign(false);
  }

  // toggles delete user confirmation modal
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  // To get users when /users page renders for the first time
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/campaigns`, {
        withCredentials: true,
      })
      .then((res) => {
        setAdminUsersData(res.data);
      })
      .catch((err) => {
        console.log("error while fetching users on user page ->", err);
      });
  }, []);

  // formik setup
  const validation = useFormik({
    initialValues: {
      campaignName: "",
      campaignDescription: "",
      campaignType: "",
      // have not added callback, dnc, amd field intentionally
    },
    validationSchema: Yup.object({
      campaignName: Yup.string().required("Please enter campaign name"),
      campaignDescription: Yup.string().required(
        "Please enter campaign description"
      ),
      campaignType: Yup.string().required("Please select campaign type"),
      // have not added callback, dnc, amd field intentionally
    }),
    onSubmit: (values) => {
      isEditingCampaign
        ? handleCampaignUpdate(adminUsersData.id)
        : handleAddCampaign(values);

      !isEditingCampaign && notifyAddedCampaign();
    },
  });

  // this function also gets triggered (with onSubmit method of formik) when submitting the register / edit user from
  function formHandleSubmit(e) {
    e.preventDefault();
    validation.handleSubmit();

    return false;
  }

  function handleAddCampaign(values) {
    // update the new user in the users list instantly
    setAdminUsersData((prevState) => ({
      ...prevState,
      campaigns: [
        ...prevState.campaigns,
        { ...values, callback: 0, dnc: 0, amd: 0 },
      ],
    }));

    setmodal_list(false);

    // user register api call
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/${adminUsersData.id}/campaign/create`,
        values,
        {
          withCredentials: true,
        }
      )
      .then((result) => {
        console.log("campaign created ->", result);
      })
      .catch((error) => {
        console.log("error while registering user ->", error);
      });
  }

  // to update the values of register form when editing the user
  function handleEditCampaign(campaignData) {
    setIsEditingCampaign(true);
    setmodal_list(!modal_list);
    setListCampaignId(campaignData.id);

    validation.values.campaignName = campaignData.campaignName;
    validation.values.campaignDescription = campaignData.campaignDescription;
    validation.values.campaignType = campaignData.campaignType;
  }

  // after making an edit and clicking on update user button this function updates the user details
  function handleCampaignUpdate(adminId) {
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/${adminId}/campaign/${listCampaignId}/edit`,
        validation.values,
        { withCredentials: true }
      )
      .then((res) => {
        // filtering users so that updated user details can be updated instantly
        const updatedCampaigns = adminUsersData.campaigns.map((campaign) => {
          if (campaign.id === listCampaignId) {
            return res.data;
          } else {
            return campaign;
          }
        });

        setAdminUsersData((prevState) => ({
          ...prevState,
          campaigns: [...updatedCampaigns],
        }));
        setmodal_list(!modal_list);
        notifyUpdatedCampaign();
      })
      .catch((err) => {
        console.log("error while updating", err);
      });
  }

  // to delete a user
  function handleDeleteCampaign(adminId, campaignId) {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/${adminId}/campaign/${campaignId}/delete`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // filtering users so that deleted user can be updated instantly
        const filteredCampaigns = adminUsersData.campaigns.filter(
          (campaign) => campaign.id !== campaignId
        );

        setAdminUsersData((prevState) => ({
          ...prevState,
          campaigns: filteredCampaigns,
        }));
        setmodal_delete(false);
        notifyDeletedCampaign();
      })
      .catch((err) => {
        console.log("error while deleting user", err);
      });
  }

  document.title = "Campaign";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title="Campaign Management"
            pageTitle="Operational Configuration"
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Create a campaign</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="campaignList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto">
                        <div>
                          <Button
                            color="primary"
                            className="add-btn me-1"
                            onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add Campaign
                          </Button>
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
                              Campaign Name
                            </th>
                            <th
                              className="sort"
                              data-sort="campaign_description"
                            >
                              Campaign Description
                            </th>
                            <th className="sort" data-sort="callback">
                              Callback
                            </th>
                            <th className="sort" data-sort="dnc">
                              DNC
                            </th>
                            <th className="sort" data-sort="amd">
                              AMD
                            </th>
                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {adminUsersData?.campaigns?.map((campaign) => (
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
                          ))}
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
      <CampaignFormModal
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
        validation={validation}
        isEditingCampaign={isEditingCampaign}
      />

      {/* Remove Modal */}
      <CampaignRemoveModal
        modal_delete={modal_delete}
        tog_delete={tog_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteCampaign={() =>
          handleDeleteCampaign(adminUsersData, listCampaignId)
        }
      />
    </React.Fragment>
  );
};

export default Campaign;
