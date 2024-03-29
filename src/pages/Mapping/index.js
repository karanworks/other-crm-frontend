import React from "react";
import {
  Breadcrumb,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";

const Mapping = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Users" pageTitle="System Configuration" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Mapping</h4>
                </CardHeader>

                <CardBody>
                  <div
                    className="listjs-table"
                    id="userList"
                    style={{ display: "flex", gap: "35px" }}
                  >
                    <div
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
                    </div>
                    <div
                      className="table-responsive table-card mt-3 mb-1"
                      style={{ flex: "1", border: "1px solid #d2d4d2" }}
                    >
                      <table
                        className="table align-middle table-nowrap"
                        id="userTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th data-sort="menu">Menu</th>
                            <th data-sort="submenu">Sub Menu</th>

                            <th data-sort="allowed">Allowed</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          <tr>
                            <td className="menu">
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Input id="menu" name="menu" type="checkbox" />
                                <Label htmlFor="menu" className="form-label">
                                  System Configuration
                                </Label>
                              </div>
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Input id="menu" name="menu" type="checkbox" />
                                <Label htmlFor="menu" className="form-label">
                                  Campaign Management
                                </Label>
                              </div>
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Input id="menu" name="menu" type="checkbox" />
                                <Label htmlFor="menu" className="form-label">
                                  Lead Management
                                </Label>
                              </div>
                            </td>
                            <td className="subMenu">
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Input id="menu" name="menu" type="checkbox" />
                                <Label htmlFor="menu" className="form-label">
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
                            </td>
                            <td className="allowed">
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Input id="menu" name="menu" type="checkbox" />
                                <Label htmlFor="menu" className="form-label">
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
    </React.Fragment>
  );
};

export default Mapping;
