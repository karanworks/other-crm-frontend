import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import CRMReportFilter from "./CRMReportFilter";
import { Link } from "react-router-dom";

const CRMReport = () => {
  document.title = "CRM Report";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="CRM Report" pageTitle="Analytics" />
          <Row>
            <Col xs={12}>
              <Card style={{ padding: "10px" }}>
                <CardBody>
                  <CRMReportFilter />
                  <div className="d-flex justify-content-end">
                    <div className="pagination-wrap hstack gap-2">
                      <Link
                        className="page-item pagination-prev disabled"
                        to="#"
                      >
                        Previous
                      </Link>
                      <ul className="pagination listjs-pagination mb-0"></ul>
                      <Link className="page-item pagination-next" to="#">
                        Next
                      </Link>
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

export default CRMReport;
