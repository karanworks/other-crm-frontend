import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import imgpattern from "../../assets/images/landing/img-pattern.png";

const Dashboard = () => {
  document.title = "Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        {/* <div className="bg-overlay bg-overlay-pattern"></div> */}
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={8} sm={10}>
              <div className="text-center mt-lg-5 pt-5">
                <h1 className="display-6 fw-semibold mb-3 lh-base">
                  Welcome to <span className="text-success">Vedo Records </span>
                </h1>
                <p className="lead lh-base">BY CHANDRAVEDO PRODUCTION</p>

                {/* <div className="d-flex gap-2 justify-content-center mt-4">
                  <Link to="/register" className="btn btn-primary">
                    Get Started{" "}
                    <i className="ri-arrow-right-line align-middle ms-1"></i>
                  </Link>
                  <Link to="/pages-pricing" className="btn btn-danger">
                    View Plans <i className="ri-eye-line align-middle ms-1"></i>
                  </Link>
                </div> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
