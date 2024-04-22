import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TeamStatus from "./TeamStatus";
import LiveData from "./LiveData";
import LiveStatus from "./LiveStatus";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../slices/auth/login/thunk";
import { monitoringGet } from "../../slices/UserStatus/thunk";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const UserStatus = () => {
  document.title = "User Status";

  const { error } = useSelector((state) => state.Monitoring);

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
    dispatch(monitoringGet());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="User Status" pageTitle="Monitoring" />
          <Row>
            <Col xs={12}>
              <LiveData />
            </Col>
          </Row>

          <Row>
            <Col>
              <TeamStatus />
            </Col>
          </Row>

          <Row>
            <Col>
              <LiveStatus />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserStatus;
