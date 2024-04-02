import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import RoleFormModal from "./RoleFormModal";

const Mapping = () => {
  const [modal_list, setmodal_list] = useState(false);

  // toggles register / edit user modal
  function tog_list() {
    setmodal_list(!modal_list);
  }

  // formik setup
  const roleValidation = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter role name"),
    }),
    onSubmit: (values) => {
      isEditingUser
        ? handleUserUpdate(adminUsersData.id)
        : handleAddUser(values);
    },
  });

  function formHandleSubmit(e) {
    console.log("handle submit called");
    e.preventDefault();
    validation.handleSubmit();
    return false;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Mapping" pageTitle="System Configuration" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Mapping</h4>
                </CardHeader>

                <CardBody>
                  <Col
                    className="col-sm-auto"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Input
                      id="roleName"
                      name="roleName"
                      className="form-control me-1"
                      placeholder="Select Role Name"
                      style={{ width: "max-content" }}
                      type="select"
                    >
                      <option value="" disabled>
                        Select Role
                      </option>

                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                    </Input>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        color="primary"
                        className="add-btn me-1"
                        id="create-btn"
                        onClick={() => tog_list()}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Add
                        Role
                      </Button>
                      <Button
                        color="primary"
                        className="add-btn me-1 btn-block"
                        id="create-btn"
                        onClick={() => tog_list()}
                      >
                        <i class="ri-pencil-fill"></i> Edit Role Name
                      </Button>

                      <Button
                        color="danger"
                        className="add-btn me-1 btn-block"
                        id="create-btn"
                      >
                        <i class="ri-delete-bin-2-line"></i> Remove Role
                      </Button>
                    </div>
                  </Col>
                  {/* <div
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "15px",
                    }}
                  >
                    <Input
                      id="roleName"
                      name="roleName"
                      className="form-control"
                      placeholder="Select Role Name"
                      style={{ width: "max-content" }}
                      type="select"
                    >
                      <option value="" disabled>
                        Select Campaign Type
                      </option>

                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                    </Input>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        color="primary"
                        className="add-btn me-1 btn-block"
                        id="create-btn"
                        onClick={() => tog_list()}
                      >
                        <i class="ri-pencil-fill"></i> Edit Name
                      </Button>

                      <Button
                        color="danger"
                        className="add-btn me-1 btn-block"
                        id="create-btn"
                      >
                        <i class="ri-delete-bin-2-line"></i> Remove Role
                      </Button>
                    </div>
                  </div> */}
                  <div
                    className="listjs-table"
                    id="userList"
                    style={{ display: "flex", gap: "35px" }}
                  >
                    {/* <div
                      className="table-responsive table-card mt-3 mb-1"
                      style={{ flex: "1", border: "1px solid #d2d4d2" }}
                    >
                      <table
                        className="table align-middle table-nowrap"
                        id="userTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th data-sort="s_no">S.No</th>
                            <th data-sort="role">Role</th>
                            <th data-sort="menus">Menus</th>

                            <th data-sort="action" style={{ width: "15px" }}>
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          <tr>
                            <td className="s_no">1</td>
                            <td className="role">Admin</td>
                            <td className="menus">Menus</td>

                            <td>
                              <div
                                className="d-flex gap-2"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
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
                    </div> */}

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="userTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th data-sort="menu">Home</th>
                            <th data-sort="submenu">System Configuration</th>
                            <th data-sort="campaign-management">
                              Campaign Management
                            </th>
                            <th data-sort="lead-management">Lead Management</th>
                            <th data-sort="other-management">
                              Other Management
                            </th>
                            <th data-sort="monitoring">Monitoring</th>
                            <th data-sort="quality">Quality</th>
                            <th data-sort="analytics">Analytics</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          <tr>
                            <td
                              className="home"
                              style={{
                                borderBottom: "none",
                                verticalAlign: "top",
                              }}
                            >
                              <div>
                                <span> No Submenus </span>
                              </div>
                            </td>
                            <td
                              className="system-configuration"
                              style={{
                                borderBottom: "none",
                                verticalAlign: "top",
                              }}
                            >
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Input
                                  id="users"
                                  name="users"
                                  type="checkbox"
                                />
                                <Label htmlFor="users" className="form-label">
                                  User
                                </Label>
                              </div>
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Input id="menu" name="menu" type="checkbox" />
                                <Label htmlFor="menu" className="form-label">
                                  ACL Rules
                                </Label>
                              </div>
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Input id="menu" name="menu" type="checkbox" />
                                <Label htmlFor="menu" className="form-label">
                                  User ModeMaster
                                </Label>
                              </div>
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Input id="menu" name="menu" type="checkbox" />
                                <Label htmlFor="menu" className="form-label">
                                  Menu Mapping
                                </Label>
                              </div>
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Input id="menu" name="menu" type="checkbox" />
                                <Label htmlFor="menu" className="form-label">
                                  User Status Colour
                                </Label>
                              </div>
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Input id="menu" name="menu" type="checkbox" />
                                <Label htmlFor="menu" className="form-label">
                                  User Mode Permission
                                </Label>
                              </div>
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Input id="menu" name="menu" type="checkbox" />
                                <Label htmlFor="menu" className="form-label">
                                  Extension Detail
                                </Label>
                              </div>
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Input id="menu" name="menu" type="checkbox" />
                                <Label htmlFor="menu" className="form-label">
                                  Disposition
                                </Label>
                              </div>
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Input id="menu" name="menu" type="checkbox" />
                                <Label htmlFor="menu" className="form-label">
                                  Callback Policy
                                </Label>
                              </div>
                            </td>
                            <td
                              className="campaign-management"
                              style={{
                                borderBottom: "none",
                                verticalAlign: "top",
                              }}
                            >
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Input id="menu" name="menu" type="checkbox" />
                                <Label htmlFor="menu" className="form-label">
                                  Campaign
                                </Label>
                              </div>
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Input id="menu" name="menu" type="checkbox" />
                                <Label htmlFor="menu" className="form-label">
                                  CRM Configuration
                                </Label>
                              </div>
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Input id="menu" name="menu" type="checkbox" />
                                <Label htmlFor="menu" className="form-label">
                                  Mapping
                                </Label>
                              </div>
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Input id="menu" name="menu" type="checkbox" />
                                <Label htmlFor="menu" className="form-label">
                                  Campaign Transfer Mapping
                                </Label>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <RoleFormModal
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
        roleValidation={roleValidation}
      />
    </React.Fragment>
  );
};

export default Mapping;
