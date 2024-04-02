import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";

const Mapping = () => {
  const [modal_list, setmodal_list] = useState(false);
  const [checkedSubmenus, setCheckedSubmenus] = useState([]);

  const menuDataOfUser = useSelector((state) => state.Login.user.menus);

  useEffect(() => {
    checkAndSetCheckedSubmenus();
  }, []); // Run once on component mount

  console.log("menu data from store ->", menuDataOfUser);
  console.log("dummy data ->", DummyMenus);

  // Function to check and set checked submenus
  const checkAndSetCheckedSubmenus = () => {
    const checkedSubmenuLabels = [];

    MenuList.forEach((menu) => {
      if (Array.isArray(menu.subItems)) {
        menu.subItems.forEach((subItem) => {
          const existsInDummy = menuDataOfUser.some(
            (dummyMenu) =>
              dummyMenu.subItems &&
              dummyMenu.subItems.some(
                (dummySubItem) => dummySubItem.label === subItem.label
              )
          );
          if (existsInDummy) {
            checkedSubmenuLabels.push(subItem.label);
          }
        });
      }
    });

    setCheckedSubmenus(checkedSubmenuLabels);
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (e, menuId, subMenuId) => {
    const { checked, id } = e.target;
    if (checked) {
      setCheckedSubmenus((prevChecked) => [...prevChecked, id]);
    } else {
      setCheckedSubmenus((prevChecked) =>
        prevChecked.filter((item) => item !== id)
      );
    }

    console.log("menu id ->", menuId);
    console.log("subMenu id ->", subMenuId);
  };

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
                        <i className="ri-pencil-fill"></i> Edit Role Name
                      </Button>

                      <Button
                        color="danger"
                        className="add-btn me-1 btn-block"
                        id="create-btn"
                      >
                        <i className="ri-delete-bin-2-line"></i> Remove Role
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
                              <th data-sort="home" key={menu.id}>
                                {menu.label}
                              </th>
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
                                key={menu.id}
                              >
                                {Array.isArray(menu.subItems) &&
                                menu.subItems.length > 0 ? (
                                  menu.subItems.map((subItem) => (
                                    <div
                                      key={subItem.id}
                                      style={{ display: "flex", gap: "5px" }}
                                    >
                                      <Input
                                        id={subItem.label}
                                        name={subItem.label}
                                        type="checkbox"
                                        checked={checkedSubmenus.includes(
                                          subItem.label
                                        )}
                                        onChange={(e) =>
                                          handleCheckboxChange(
                                            e,
                                            menu.id,
                                            subItem.id
                                          )
                                        }
                                      />
                                      <Label
                                        htmlFor={subItem.label}
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
