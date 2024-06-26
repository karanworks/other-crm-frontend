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

import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  createUser,
  removeUser,
  updateUser,
} from "../../slices/Users/thunk";
import {
  createBranchDropdown,
  getBranchDropdowns,
} from "../../slices/BranchDropdown/thunk";
import AddBranchModal from "./AddBranchModal";

const Users = () => {
  // register / edit user modal state whether modal is open or not
  const [modal_list, setmodal_list] = useState(false);
  // branch modal
  const [branch_modal_list, set_branch_modal_list] = useState(false);
  // this state triggers when editing the user
  const [isEditingUser, setIsEditingUser] = useState(false);
  // delete user confirmation modal state
  const [modal_delete, setmodal_delete] = useState(false);
  // when we click on edit / delete user button this state stores that user's id, had to make this state because I needed to have that user's id to make changes to it
  const [listUserId, setListUserId] = useState(null);
  // fetching all the roles
  const [roles, setRoles] = useState([]);

  const { users, alreadyRegisteredError } = useSelector((state) => state.Users);
  const { branchDropdowns } = useSelector((state) => state.BranchDropdowns);

  const dispatch = useDispatch();

  // toggles register / edit user modal
  function tog_list() {
    setmodal_list(!modal_list);
    setIsEditingUser(false);
  }
  function branch_tog_list() {
    set_branch_modal_list(!branch_modal_list);
  }

  // toggles delete user confirmation modal
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/roles`, {
        withCredentials: true,
      })
      .then((res) => {
        setRoles(res.data);
      })
      .catch((error) => {
        console.log("error while fetching roles ->", error);
      });
  }, []);

  useEffect(() => {
    if (alreadyRegisteredError) {
      setmodal_list(!modal_list);
    }
  }, [alreadyRegisteredError]);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getBranchDropdowns());
  }, [dispatch]);

  // formik setup
  const validation = useFormik({
    initialValues: {
      name: "",
      roleId: "",
      branchId: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter Name"),
      roleId: Yup.string().required("Please select user role"),
      branchId: Yup.string().required("Please select branch"),
      email: Yup.string().required("Please enter CRM Email"),
      password: Yup.string().required("Please enter CRM Password"),
    }),
    onSubmit: (values, { resetForm }) => {
      isEditingUser
        ? dispatch(updateUser({ values, userId: listUserId }))
        : dispatch(createUser(values));

      resetForm();
    },
  });

  // this function also gets triggered (with onSubmit method of formik) when submitting the register / edit user from
  function formHandleSubmit(e) {
    e.preventDefault();

    validation.handleSubmit();

    setmodal_list(false);
    return false;
  }

  const branchValidation = useFormik({
    initialValues: {
      branchName: "",
    },
    validationSchema: Yup.object({
      branchName: Yup.string().required("Please Enter Branch Name"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(createBranchDropdown(values));

      resetForm();
    },
  });

  // this function also gets triggered (with onSubmit method of formik) when submitting the register / edit user from
  function branchFormHandleSubmit(e) {
    e.preventDefault();

    branchValidation.handleSubmit();

    set_branch_modal_list(false);
    return false;
  }

  function handleRoleChange(e) {
    validation.setFieldValue("roleId", e.target.value);
  }
  function handleBranchChange(e) {
    validation.setFieldValue("branchId", e.target.value);
  }

  // to update the values of register form when editing the user
  function handleEditUser(userData) {
    setIsEditingUser(true);
    setmodal_list(!modal_list);
    setListUserId(userData.id);

    // setting the value of role according to roleId because in select element roleId is used as value
    const roleName = roles.find((role) => role.id === userData.roleId);
    const branch = branchDropdowns.find(
      (br) => br.branchDropdownName === userData.branch
    );

    validation.setValues({
      name: userData.username,
      email: userData.email,
      password: userData.password,
      roleId: roleName.id,
      branchId: branch.id,
    });
  }

  document.title = "Users";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Users" pageTitle="Admin Tools" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Create a user</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-2 mb-3">
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
                      <Col className="col-sm-auto">
                        <div>
                          <Button
                            color="primary"
                            className="add-btn me-1"
                            onClick={() => branch_tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add Branch
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
                            <th className="sort" data-sort="user_id">
                              User ID
                            </th>
                            <th className="sort" data-sort="name">
                              Name
                            </th>
                            <th className="sort" data-sort="email">
                              Email
                            </th>
                            <th className="sort" data-sort="branch">
                              Branch
                            </th>

                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {users?.map((user) => (
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
                                  {user?.id}
                                </Link>
                              </td>
                              <td className="name">{user?.username}</td>
                              <td className="email">{user?.email}</td>
                              <td className="branch">{user?.branch}</td>

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
                                      className="btn btn-sm btn-danger remove-item-btn"
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
        alreadyRegisteredError={alreadyRegisteredError}
        handleRoleChange={handleRoleChange}
        handleBranchChange={handleBranchChange}
        roles={roles}
        branchDropdowns={branchDropdowns}
      />

      {/* Remove Modal */}
      <UserRemoveModal
        modal_delete={modal_delete}
        tog_delete={tog_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteUser={() => {
          dispatch(removeUser({ userId: listUserId }));
          setmodal_delete(false);
        }}
      />

      <AddBranchModal
        branch_modal_list={branch_modal_list}
        branch_tog_list={branch_tog_list}
        branchFormHandleSubmit={branchFormHandleSubmit}
        branchValidation={branchValidation}
      />
    </React.Fragment>
  );
};

export default Users;
