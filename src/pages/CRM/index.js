import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import CallHistory from "./CallHistory";
import Dialpad from "./Dialpad";
import CRMForm from "./CRMForm";
import CallLogs from "./CallLogs";
import Campaigns from "./Campaigns";
import Modes from "./Modes";

const CRM = () => {
  document.title = "CRM";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="CRM" pageTitle="Work" />
          <Row>
            <Col lg={2}>
              <Row>
                <Modes />
              </Row>
              <Row>
                <Campaigns />
              </Row>
              <Row>
                <CallLogs />
              </Row>
            </Col>
            <Col lg={8}>
              <CRMForm />
            </Col>
            <Col lg={2}>
              <Row>
                <Dialpad />
              </Row>
              <Row>
                <CallHistory />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CRM;
