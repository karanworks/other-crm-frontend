import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TeamStatus from "./TeamStatus";
import LiveData from "./LiveData";

const UserStatus = () => {
  document.title = "User Status";
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
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserStatus;
