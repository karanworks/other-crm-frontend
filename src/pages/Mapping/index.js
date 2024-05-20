import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import RoleFormModal from "./RoleFormModal";
import RoleRemoveModal from "./RoleRemoveModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getMenus,
  getMenusByRole,
  changePermission,
  getRoles,
  createRole,
  updateRole,
  removeRole,
} from "../../slices/Mapping/thunk";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../slices/auth/login/thunk";

const Mapping = () => {
  const [modal_list, setmodal_list] = useState(false);
  const [checkedSubmenus, setCheckedSubmenus] = useState([]);
  const [editRole, setEditRole] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(0);
  const [modal_delete, setmodal_delete] = useState(false);

  const { user } = useSelector((state) => state.Login.user);
  const { roles, menus, menusByRole, error } = useSelector(
    (state) => state.Mapping
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      dispatch(logoutUser());
      navigate("/login");
      window.location.reload();
    }
  }, [dispatch, error]);

  useEffect(() => {
    const checkedSubmenuLabels = [];

    menus.forEach((menu) => {
      if (Array.isArray(menu.subItems)) {
        menu.subItems.forEach((subItem) => {
          const existsInMenuByRole =
            Array.isArray(menusByRole) &&
            menusByRole.some(
              (menuByRole) =>
                menuByRole.subItems &&
                menuByRole.subItems.some(
                  (menuByRoleSubItem) =>
                    menuByRoleSubItem.label === subItem.label
                )
            );
          if (existsInMenuByRole) {
            checkedSubmenuLabels.push(subItem.label);
          }
        });
      }
    });

    setCheckedSubmenus(checkedSubmenuLabels);
  }, [menusByRole]);

  useEffect(() => {
    dispatch(getRoles());
    dispatch(getMenus());
  }, [dispatch]);

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

    dispatch(
      changePermission({
        menuId,
        subMenuId,
        roleId: selectedRoleId,
      })
    );
  };

  // toggles register / edit role modal
  function tog_list() {
    setmodal_list(!modal_list);
  }

  //toggles remove role modal
  function tog_delete() {
    setmodal_delete(!modal_delete);
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
      editRole
        ? dispatch(updateRole({ roleId: selectedRoleId, values })) // handleRoleUpdate(selectedRoleId, values)
        : dispatch(createRole(values)); // handleAddRole(values);
    },
  });

  function handleRoleChange(e) {
    roleValidation.setFieldValue("name", e.target.value);
    setSelectedRoleId(e.target.value);
    dispatch(getMenusByRole(e.target.value));
  }

  function handleEditRole(e) {
    setEditRole(true);
    setmodal_list(!modal_list);

    const matchingRole = roles.find((role) => role.id == selectedRoleId);

    roleValidation.setValues({
      name: matchingRole.name,
    });

    // Set the selectedRoleId directly to match the edited role
    setSelectedRoleId(matchingRole.id);
  }

  function formHandleSubmit(e) {
    console.log("handle submit called");
    e.preventDefault();
    roleValidation.handleSubmit();
    setmodal_list(false);
    return false;
  }

  document.title = "Roles";
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
                    <div className="me-1">
                      <Input
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Enter Role Name"
                        type="select"
                        onChange={(e) => handleRoleChange(e)}
                        onBlur={roleValidation.handleBlur}
                        value={roleValidation.values.name || ""}
                        invalid={
                          roleValidation.touched.name &&
                          roleValidation.errors.name
                            ? true
                            : false
                        }
                      >
                        <option value="" disabled>
                          Select Role Name
                        </option>

                        {roles?.map((role) => (
                          <option value={role.id} key={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </Input>

                      {roleValidation.touched.name &&
                      roleValidation.errors.name ? (
                        <FormFeedback type="invalid">
                          {roleValidation.errors.name}
                        </FormFeedback>
                      ) : null}
                    </div>

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
                        disabled={!selectedRoleId}
                        onClick={handleEditRole}
                      >
                        <i className="ri-pencil-fill"></i> Edit Role Name
                      </Button>

                      <Button
                        color="danger"
                        className="add-btn me-1 btn-block"
                        id="create-btn"
                        disabled={!selectedRoleId}
                        onClick={() => tog_delete()}
                      >
                        <i className="ri-delete-bin-2-line"></i> Remove Role
                      </Button>
                    </div>
                  </Col>

                  {selectedRoleId ? (
                    <div
                      className="listjs-table"
                      id="userList"
                      style={{ display: "flex", gap: "35px" }}
                    >
                      <div className="table-responsive table-card mt-3 mb-1">
                        <table
                          className="table align-middle table-nowrap"
                          id="userTable"
                          style={{
                            borderTop: "1px solid #e9ebec",
                            borderRight: "1px solid #e9ebec",
                          }}
                        >
                          <thead className="table-light">
                            <tr>
                              {menus?.map((menu) => (
                                <th data-sort="home" key={menu.id}>
                                  {menu.label}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            <tr>
                              {/* menuLableId me "label" ki spelling galat hai database me glt thi to testing ke liye galat likh kar hi check kr rha */}
                              {menus.map((menu) => (
                                <td
                                  className="campaign-management"
                                  style={{
                                    borderLeft: "1px solid #e9ebec",
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
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "40px",
                        fontWeight: "bold",
                        height: "200px",
                        color: "#b5b5b5",
                      }}
                    >
                      <span>
                        {" "}
                        <i className="ri-user-fill"></i> Please select a role!
                      </span>
                    </div>
                  )}
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
        editRole={editRole}
      />

      <RoleRemoveModal
        modal_delete={modal_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteRole={() => {
          dispatch(removeRole(selectedRoleId));
          setmodal_delete(false);
        }}
      />
    </React.Fragment>
  );
};

export default Mapping;
