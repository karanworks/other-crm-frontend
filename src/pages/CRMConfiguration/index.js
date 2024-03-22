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
  Form,
  FormFeedback,
  Input,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import CRMFieldFormModal from "./CRMFieldFormModal";

const CRMConfiguration = () => {
  // register / edit user modal state whether modal is open or not
  const [modal_list, setmodal_list] = useState(false);
  // this state triggers when editing the user
  const [isEditingUser, setIsEditingUser] = useState(false);
  // admin details with users that he has added
  // const [adminUsersData, setAdminUsersData] = useState([]);
  // delete user confirmation modal state
  // const [modal_delete, setmodal_delete] = useState(false);
  // when we click on edit / delete user button this state stores that user's id, had to make this state because I needed to have that user's id to make changes to it
  // const [listUserId, setListUserId] = useState(null);

  function tog_list() {
    setmodal_list(!modal_list);
    setIsEditingUser(false);
  }

  // toggles delete user confirmation modal
  // function tog_delete() {
  //   setmodal_delete(!modal_delete);
  // }

  // formik setup
  const crmFieldValidation = useFormik({
    initialValues: {
      caption: "",
      type: "",
      required: "",
      readOnly: "",
      position: "",
    },
    validationSchema: Yup.object({
      caption: Yup.string().required("Please enter caption"),
      type: Yup.string().required("Please select type"),
      required: Yup.string().required(
        "Please select whether field is required"
      ),
      readOnly: Yup.string().required(
        "Please select whether field is read only"
      ),
      position: Yup.string().required("Please enter position"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const campaignTypeValidation = useFormik({
    initialValues: {
      campaignName: "",
    },
    validationSchema: Yup.object({
      campaignName: Yup.string().required("Please select a campaign"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  function showCampaignFormHandleSubmit(e) {
    e.preventDefault();
    campaignTypeValidation.handleSubmit();

    console.log("campaign type form called!");

    return false;
  }

  function crmFieldFormHandleSubmit(e) {
    e.preventDefault();
    crmFieldValidation.handleSubmit();

    return false;
  }

  document.title = "Users";
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
                  <h4 className="card-title mb-0">CRM Configuration</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto">
                        <Form
                          style={{ display: "flex", gap: "10px" }}
                          onSubmit={(e) =>
                            showCampaignFormHandleSubmit(
                              e,
                              campaignTypeValidation.caption
                            )
                          }
                        >
                          <div className="mb-2">
                            <Input
                              id="campaignType"
                              name="campaignType"
                              className="form-control"
                              placeholder="Enter Campaign Type"
                              type="select"
                              onChange={campaignTypeValidation.handleChange}
                              onBlur={campaignTypeValidation.handleBlur}
                              value={
                                campaignTypeValidation.values.campaignType || ""
                              }
                              invalid={
                                campaignTypeValidation.touched.campaignType &&
                                campaignTypeValidation.errors.campaignType
                                  ? true
                                  : false
                              }
                            >
                              <option value="" disabled>
                                Select Campaign Type
                              </option>
                              <option value="outbound">Outbound</option>
                              <option value="inbound">Inbound</option>
                            </Input>

                            {campaignTypeValidation.touched.campaignType &&
                            campaignTypeValidation.errors.campaignType ? (
                              <FormFeedback type="invalid">
                                {campaignTypeValidation.errors.campaignType}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div>
                            <Button
                              color="primary"
                              className="add-btn me-1"
                              type="submit"
                              id="show-btn"
                            >
                              <i className="ri-search-line search-icon"> </i>
                              Show CRM
                            </Button>
                          </div>
                        </Form>
                      </Col>
                      <Col
                        className="col-sm-auto"
                        style={{ marginLeft: "auto" }}
                      >
                        <div>
                          <Button
                            color="primary"
                            className="add-btn me-1"
                            onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            CRM Field
                          </Button>
                        </div>
                      </Col>
                    </Row>

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="userTable"
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
                            <th className="sort" data-sort="caption">
                              Caption
                            </th>
                            <th className="sort" data-sort="type">
                              Type
                            </th>
                            <th className="sort" data-sort="required">
                              Required
                            </th>
                            <th className="sort" data-sort="readOnly">
                              Read Only
                            </th>
                            <th className="sort" data-sort="position">
                              Position
                            </th>
                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          <tr>
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
                            <td className="caption">Field caption</td>
                            <td className="type">text</td>
                            <td className="required">yes</td>
                            <td className="readOnly">yes</td>
                            <td className="position">1</td>
                            <td>
                              <div className="d-flex gap-2">
                                <div className="edit">
                                  <button
                                    className="btn btn-sm btn-primary edit-item-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#showModal"
                                    onClick={() => {}}
                                  >
                                    Edit
                                  </button>
                                </div>
                                <div className="remove">
                                  <button
                                    className="btn btn-sm btn-success remove-item-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteRecordModal"
                                    onClick={() => {}}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
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
      <CRMFieldFormModal
        modal_list={modal_list}
        tog_list={tog_list}
        crmFieldValidation={crmFieldValidation}
        isEditingUser={isEditingUser}
        crmFieldFormHandleSubmit={crmFieldFormHandleSubmit}
      />
    </React.Fragment>
  );
};

export default CRMConfiguration;
