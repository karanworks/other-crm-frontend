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

const CRMConfiguration = () => {
  // register / edit user modal state whether modal is open or not
  const [modal_list, setmodal_list] = useState(false);
  // this state triggers when editing the user
  const [isEditingUser, setIsEditingUser] = useState(false);
  // admin details with users that he has added
  const [adminUsersData, setAdminUsersData] = useState([]);
  // delete user confirmation modal state
  const [modal_delete, setmodal_delete] = useState(false);
  // when we click on edit / delete user button this state stores that user's id, had to make this state because I needed to have that user's id to make changes to it
  const [listUserId, setListUserId] = useState(null);

  // toggles register / edit user modal
  function tog_list() {
    setmodal_list(!modal_list);
    setIsEditingUser(false);
  }

  // toggles delete user confirmation modal
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  // formik setup
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
      isEditingUser
        ? handleUserUpdate(adminUsersData.id)
        : handleAddUser(values);

      !isEditingUser && notifyAddedUser();
    },
  });

  // this function also gets triggered (with onSubmit method of formik) when submitting the register / edit user from
  function formHandleSubmit(e) {
    e.preventDefault();
    validation.handleSubmit();

    return false;
  }

  function handleAddUser(values) {
    // update the new user in the users list instantly
    setAdminUsersData((prevState) => ({
      ...prevState,
      users: [
        ...prevState.users,
        { id: values.userId, username: values.name, ...values },
      ],
    }));

    setmodal_list(false);
  }

  // to update the values of register form when editing the user
  function handleEditUser(userData) {
    setIsEditingUser(true);
    setmodal_list(!modal_list);
    setListUserId(userData.id);

    validation.values.userId = userData.id;
    validation.values.name = userData.username;
    validation.values.password = userData.password;
    validation.values.crmEmail = userData.crmEmail;
    validation.values.crmPassword = userData.crmPassword;
    validation.values.agentMobile = userData.agentMobile;
  }

  // after making an edit and clicking on update user button this function updates the user details
  function handleUserUpdate(adminId) {
    // axios
    //   .patch(
    //     `${process.env.REACT_APP_SERVER_URL}/${adminId}/user/${listUserId}/edit`,
    //     validation.values,
    //     { withCredentials: true }
    //   )
    //   .then((res) => {
    //     console.log("response while updating user", res);
    //     // filtering users so that updated user details can be updated instantly
    //     const updatedUsers = adminUsersData.users.map((user) => {
    //       if (user.id === listUserId) {
    //         return res.data;
    //       } else {
    //         return user;
    //       }
    //     });
    //     setAdminUsersData((prevState) => ({
    //       ...prevState,
    //       users: [...updatedUsers],
    //     }));
    //     setmodal_list(!modal_list);
    //     notifyUpdatedUser();
    //   })
    //   .catch((err) => {
    //     console.log("error while updating", err);
    //   });
  }

  // to delete a user
  function handleDeleteUser(adminId, userId) {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/${adminId}/user/${userId}/delete`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // filtering users so that deleted user can be updated instantly
        const filteredUsers = adminUsersData.users.filter(
          (user) => user.id !== userId
        );

        setAdminUsersData((prevState) => ({
          ...prevState,
          users: filteredUsers,
        }));
        setmodal_delete(false);
        notifyDeletedUser();
      })
      .catch((err) => {
        console.log("error while deleting user", err);
      });
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
                        <div>
                          <Button
                            color="primary"
                            className="add-btn me-1"
                            onClick={() => tog_list()}
                            id="show-btn"
                          >
                            <i className="ri-search-line search-icon"> </i>
                            Show CRM
                          </Button>
                        </div>
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
                              <td className="name">{user.username}</td>
                              <td className="email">{user.email}</td>
                              <td className="agent_mobile">
                                {user.agentMobile}
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => {
                                        handleEditUser(user);
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
                                        setListUserId(user.id);
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
    </React.Fragment>
  );
};

export default CRMConfiguration;
