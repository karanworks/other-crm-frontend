import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const CallHistory = () => {
  document.title = "Call History";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Call History" pageTitle="Work" />
          <Row>
            <Col xs={12}></Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CallHistory;
