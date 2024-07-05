import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//redux
import { useSelector, useDispatch } from "react-redux";

import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
import { changePassword } from "../../slices/Profile/thunk";

const UserProfile = () => {
  const dispatch = useDispatch();

  const [email, setemail] = useState("admin@gmail.com");

  const [userName, setUserName] = useState("Admin");

  const { error } = useSelector((state) => state.Profile);

  useEffect(() => {
    if (sessionStorage.getItem("authUser")) {
      const obj = JSON.parse(sessionStorage.getItem("authUser"));

      setUserName(obj.data.username);
      setemail(obj.data.email);
    }
  }, [dispatch]);

  const validation = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(
        "Please Enter Your Current Password"
      ),
      newPassword: Yup.string().required("Please Enter Your New Password"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(changePassword(values));
      resetForm();
    },
  });

  document.title = "Profile";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="3">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="mx-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{userName || "Admin"}</h5>
                        <p className="mb-1">Email Id : {email}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change Password</h4>

          <Row>
            <Col lg="3">
              <Card>
                <CardBody>
                  <Form
                    className="form-horizontal"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    <div className="form-group mb-2">
                      <Label className="form-label">Current Password</Label>
                      <Input
                        name="currentPassword"
                        className="form-control"
                        placeholder="Enter Current Password"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.currentPassword || ""}
                        invalid={
                          validation.touched.currentPassword &&
                          validation.errors.currentPassword
                            ? true
                            : false
                        }
                      />
                      {validation.touched.currentPassword &&
                      validation.errors.currentPassword ? (
                        <FormFeedback type="invalid">
                          {validation.errors.currentPassword}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="form-group mb-2">
                      <Label className="form-label">New Password</Label>
                      <Input
                        name="newPassword"
                        className="form-control"
                        placeholder="Enter New Password"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.newPassword || ""}
                        invalid={
                          validation.touched.newPassword &&
                          validation.errors.newPassword
                            ? true
                            : false
                        }
                      />
                      {validation.touched.newPassword &&
                      validation.errors.newPassword ? (
                        <FormFeedback type="invalid">
                          {validation.errors.newPassword}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="text-center mt-4">
                      <Button type="submit" color="danger">
                        Update Password
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>{" "}
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default UserProfile;
