import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

const Users = () => {
  // const adminData = JSON.parse(sessionStorage.getItem("authUser"));

  // const adminData = useSelector((state) => state.Login);
  // let adminUsersData = adminData?.user?.users;
  const [adminUsersData, setAdminUseraData] = useState([]);

  const [modal_list, setmodal_list] = useState(false);
  function tog_list() {
    setmodal_list(!modal_list);
  }

  const [modal_delete, setmodal_delete] = useState(false);
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  useEffect(() => {
    // const noUserData = Object.keys(adminData.user).length === 0;

    // if (!noUserData) {
    //   setAdminUserData(adminData);
    // } else {

    // }

    axios
      .get("http://localhost:3001/users", { withCredentials: true })
      .then((res) => {
        console.log("user data on user page ->", res.data);
        setAdminUseraData(res.data);
      })
      .catch((err) => {
        console.log("error while fetching users on user page ->", err);
      });
  }, []);

  const validation = useFormik({
    initialValues: {
      userId: "",
      name: "",
      password: "",
      crmEmail: "",
      crmPassword: "",
      agentMobile: "",
    },
    validationSchema: Yup.object({
      userId: Yup.string().required("Please enter User Id"),
      name: Yup.string().required("Please enter Name"),
      password: Yup.string().required("Please enter password"),
      crmEmail: Yup.string().required("Please enter CRM Email"),
      crmPassword: Yup.string().required("Please enter CRM Password"),
      agentMobile: Yup.string().required("Please enter Agent Mobile"),
    }),
    onSubmit: (values) => {
      // this code works for default login feature
      console.log(values);

      axios
        .post(`http://localhost:3001/${adminData.user.id}/register`, values, {
          withCredentials: true,
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log("error while registering user ->", error);
        });
    },
  });

  document.title = "Users";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Users" pageTitle="System Configuration" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Create a user</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="customerList">
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
                            Add User
                          </Button>
                        </div>
                      </Col>
                      <Col className="col-sm">
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
                      </Col>
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
                            <th className="sort" data-sort="customer_name">
                              User ID
                            </th>
                            <th className="sort" data-sort="email">
                              Name
                            </th>
                            <th className="sort" data-sort="phone">
                              Device Id
                            </th>
                            <th className="sort" data-sort="date">
                              Agent Mobile
                            </th>
                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {adminUsersData?.users?.map((user) => (
                            <tr key={user?.id}>
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
                              <td className="id">
                                <Link to="#" className="fw-medium link-primary">
                                  {user.id}
                                </Link>
                              </td>
                              <td className="customer_name">{user.username}</td>
                              <td className="email">{user.email}</td>
                              <td className="phone">{user.agentMobile}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-success remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      onClick={() => tog_delete()}
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
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={modal_list}
        toggle={() => {
          tog_list();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            tog_list();
          }}
        >
          {" "}
          Add User{" "}
        </ModalHeader>
        <Form
          className="tablelist-form"
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <ModalBody style={{ paddingTop: "0px" }}>
            <div className="mb-2">
              <Label htmlFor="userId" className="form-label">
                User Id
              </Label>

              <Input
                id="userId"
                name="userId"
                className="form-control"
                placeholder="Enter User Id"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.userId || ""}
                invalid={
                  validation.touched.userId && validation.errors.userId
                    ? true
                    : false
                }
              />

              {validation.touched.userId && validation.errors.userId ? (
                <FormFeedback type="invalid">
                  {validation.errors.userId}
                </FormFeedback>
              ) : null}

              {/* 
              <input
                type="text"
                className="form-control"
                id="userId"
                placeholder="Enter user id"
              /> */}
            </div>
            <div className="mb-2">
              <Label htmlFor="name" className="form-label">
                Name
              </Label>

              <Input
                id="name"
                name="name"
                className="form-control"
                placeholder="Enter Name"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.name || ""}
                invalid={
                  validation.touched.name && validation.errors.name
                    ? true
                    : false
                }
              />

              {validation.touched.name && validation.errors.name ? (
                <FormFeedback type="invalid">
                  {validation.errors.name}
                </FormFeedback>
              ) : null}

              {/* <input
                type="name"
                className="form-control"
                id="name"
                placeholder="Enter user's name"
              /> */}
            </div>

            <div className="mb-2">
              <Label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </Label>

              <Input
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter Password"
                type="password"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.password || ""}
                invalid={
                  validation.touched.password && validation.errors.password
                    ? true
                    : false
                }
              />

              {validation.touched.password && validation.errors.password ? (
                <FormFeedback type="invalid">
                  {validation.errors.password}
                </FormFeedback>
              ) : null}

              {/* <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter user's password"
              /> */}
            </div>

            <div className="mb-2">
              <Label htmlFor="crmEmail" className="form-label">
                CRM Email
              </Label>

              <Input
                id="crmEmail"
                name="crmEmail"
                className="form-control"
                placeholder="Enter CRM Email"
                type="email"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.crmEmail || ""}
                invalid={
                  validation.touched.crmEmail && validation.errors.crmEmail
                    ? true
                    : false
                }
              />

              {validation.touched.crmEmail && validation.errors.crmEmail ? (
                <FormFeedback type="invalid">
                  {validation.errors.crmEmail}
                </FormFeedback>
              ) : null}

              {/* <input
                type="text"
                className="form-control"
                id="crmEmail"
                placeholder="Enter CRM email"
              /> */}
            </div>
            <div className="mb-2">
              <Label htmlFor="crmPassword" className="form-label">
                CRM Password
              </Label>

              <Input
                id="crmPassword"
                name="crmPassword"
                className="form-control"
                placeholder="Enter CRM Password"
                type="password"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.crmPassword || ""}
                invalid={
                  validation.touched.crmPassword &&
                  validation.errors.crmPassword
                    ? true
                    : false
                }
              />

              {validation.touched.crmPassword &&
              validation.errors.crmPassword ? (
                <FormFeedback type="invalid">
                  {validation.errors.crmPassword}
                </FormFeedback>
              ) : null}

              {/* <input
                type="text"
                className="form-control"
                id="crmPassword"
                placeholder="Enter CRM password"
              /> */}
            </div>
            <div className="mb-2">
              <Label htmlFor="agentMobile" className="form-label">
                Agent Mobile
              </Label>

              <Input
                id="agentMobile"
                name="agentMobile"
                className="form-control"
                placeholder="Enter Agent Mobile"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.agentMobile || ""}
                invalid={
                  validation.touched.agentMobile &&
                  validation.errors.agentMobile
                    ? true
                    : false
                }
              />

              {validation.touched.agentMobile &&
              validation.errors.agentMobile ? (
                <FormFeedback type="invalid">
                  {validation.errors.agentMobile}
                </FormFeedback>
              ) : null}

              {/* 
              <input
                type="number"
                className="form-control"
                id="agentMobile"
                placeholder="Enter Agent Mobile Number"
              /> */}
            </div>

            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                Save User
              </button>
            </div>
          </ModalBody>
        </Form>
      </Modal>

      {/* Remove Modal */}
      <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
        }}
        className="modal fade zoomIn"
        id="deleteRecordModal"
        centered
      >
        <div className="modal-header">
          <Button
            type="button"
            onClick={() => setmodal_delete(false)}
            className="btn-close"
            aria-label="Close"
          >
            {" "}
          </Button>
        </div>
        <ModalBody>
          <div className="mt-2 text-center">
            <lord-icon
              src="https://cdn.lordicon.com/gsqxdxog.json"
              trigger="loop"
              colors="primary:#25a0e2,secondary:#00bd9d"
              style={{ width: "100px", height: "100px" }}
            ></lord-icon>
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Are you Sure ?</h4>
              <p className="text-muted mx-4 mb-0">
                Are you Sure You want to Remove this Record ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button
              type="button"
              className="btn w-sm btn-light"
              onClick={() => setmodal_delete(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn w-sm btn-primary"
              id="delete-record"
            >
              Yes, Delete It!
            </button>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Users;
