import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import LoginHistoryFilter from "./LoginHistoryFilter";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginHistoryGet } from "../../slices/LoginHistory/thunk";
import { logoutUser } from "../../slices/auth/login/thunk";

const LoginHistory = () => {
  document.title = "Login History";

  const { error } = useSelector((state) => state.LoginHistory);

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
    dispatch(loginHistoryGet());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Login History" pageTitle="Work" />
          <Row>
            <Col xs={12}>
              <LoginHistoryFilter />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default LoginHistory;
