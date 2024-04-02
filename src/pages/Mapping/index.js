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
import MenuList from "./MenuList";
import DummyMenus from "../../Layouts/DummyMenuData";

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

                  <div
                    className="listjs-table"
                    id="userList"
                    style={{ display: "flex", gap: "35px" }}
                  >
                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="userTable"
                      >
                        <thead className="table-light">
                          <tr>
                            {MenuList?.map((menu) => (
                              <th data-sort="home">{menu.label}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          <tr>
                            {MenuList.map((menu) => (
                              <td
                                className="campaign-management"
                                style={{
                                  borderBottom: "none",
                                  verticalAlign: "top",
                                }}
                              >
                                {Array.isArray(menu.subItems) &&
                                menu.subItems.length > 0 ? (
                                  menu.subItems.map((subItem) => (
                                    <div
                                      key={subItem.label}
                                      style={{ display: "flex", gap: "5px" }}
                                    >
                                      <Input
                                        id="menu"
                                        name="menu"
                                        type="checkbox"
                                      />
                                      <Label
                                        htmlFor="menu"
                                        className="form-label"
                                      >
                                        {subItem.label}
                                      </Label>
                                    </div>
                                  ))
                                ) : (
                                  <div>No Submenus</div>
                                )}
                              </td>
                            ))}
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
