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
import UserFormModal from "./UserFormModal";
import UserRemoveModal from "./UserRemoveModal";
import {
  notifyAddedUser,
  notifyDeletedUser,
  notifyUpdatedUser,
} from "./toasts";

const Users = () => {
  const [modal_list, setmodal_list] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [adminUsersData, setAdminUsersData] = useState([]);
  const [modal_delete, setmodal_delete] = useState(false);
  const [listUserId, setListUserId] = useState(null);

  function tog_list() {
    setmodal_list(!modal_list);
    setIsEditingUser(false);
  }
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  useEffect(() => {
    console.log("server url ->", process.env.REACT_APP_SERVER_URL);
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/users`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("user data on user page ->", res.data);
        setAdminUsersData(res.data);
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
      isEditingUser
        ? handleUserUpdate(adminUsersData.id)
        : handleAddUser(values);

      !isEditingUser && notifyAddedUser();
    },
  });

  function formHandleSubmit(e) {
    e.preventDefault();
    validation.handleSubmit();

    console.log("added user and updated user");
    return false;
  }

  function handleAddUser(values) {
    // update the new user in the users list
    setAdminUsersData((prevState) => ({
      ...prevState,
      users: [
        ...prevState.users,
        { id: values.userId, username: values.name, ...values },
      ],
    }));

    setmodal_list(false);

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/${adminUsersData.id}/register`,
        values,
        {
          withCredentials: true,
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log("error while registering user ->", error);
      });
  }

  function handleEditUser(userData) {
    setIsEditingUser(true);
    setmodal_list(!modal_list);
    setListUserId(userData.id);
    console.log("edit user id while editing ->", userData.id);

    validation.values.userId = userData.id;
    validation.values.name = userData.username;
    validation.values.password = userData.password;
    validation.values.crmEmail = userData.crmEmail;
    validation.values.crmPassword = userData.crmPassword;
    validation.values.agentMobile = userData.agentMobile;
  }

  function handleUserUpdate(adminId) {
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/${adminId}/${listUserId}/edit`,
        validation.values,
        { withCredentials: true }
      )
      .then((res) => {
        console.log("response while updating user", res);
        // filtering users so that updated user details can be updated instantly
        const updatedUsers = adminUsersData.users.map((user) => {
          if (user.id === listUserId) {
            return res.data;
          } else {
            return user;
          }
        });

        setAdminUsersData((prevState) => ({
          ...prevState,
          users: [...updatedUsers],
        }));
        setmodal_list(!modal_list);
        notifyUpdatedUser();
      })
      .catch((err) => {
        console.log("error while updating", err);
      });
  }

  function handleDeleteUser(adminId, userId) {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/${adminId}/${userId}/delete`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // filtering users so that deleted user can be updated instantly
        const filteredUsers = adminUsersData.users.filter(
          (user) => user.id !== userId
        );

        console.log("deleted user", res.data);
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

      {/* Add Modal */}
      <UserFormModal
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
        validation={validation}
        isEditingUser={isEditingUser}
      />

      {/* Remove Modal */}
      <UserRemoveModal
        modal_delete={modal_delete}
        tog_delete={tog_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteUser={() => handleDeleteUser(adminUsersData, listUserId)}
      />
    </React.Fragment>
  );
};

export default Users;
