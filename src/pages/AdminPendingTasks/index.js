import React, { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getLeads } from "../../slices/AddLead/thunk";
import { useSelector } from "react-redux";
import YoutubeLogo from "./youtube_logo.webp";

const AdminPendingTasks = () => {
  const { leads } = useSelector((state) => state.AddLead);

  const dispatch = useDispatch();

  function isDatePast(dateString) {
    // Split the date string into day, month, and year
    var parts = dateString.split("/");
    // JavaScript counts months from 0 to 11, so we subtract 1 from the month
    var dateObject = new Date(parts[2], parts[1] - 1, parts[0]);

    // Get the current date
    var currentDate = new Date();

    // Compare the dates
    if (dateObject < currentDate) {
      return true;
    } else {
      return false;
    }
  }

  const pastLeads = leads
    ?.map(function (lead) {
      if (isDatePast(lead.projectDueDate)) {
        return lead;
      }
    })
    .filter(Boolean);

  console.log("PROJECT DUE DATE ->", pastLeads);

  useEffect(() => {
    dispatch(getLeads());
  }, [dispatch]);

  document.title = "Pending Tasks";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Pending Task" pageTitle="Lead Management" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Pendint Tasks</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="campaignList">
                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="customerTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th scope="col" style={{ width: "50px" }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="checkAll"
                                  value="option"
                                />
                              </div>
                            </th>
                            <th className="sort" data-sort="client_name">
                              Client Name
                            </th>
                            <th className="sort" data-sort="project_genre">
                              Project Genre
                            </th>
                            <th className="sort" data-sort="project_due_date">
                              Project Due Date
                            </th>
                            <th
                              className="sort"
                              data-sort="project_youtube_link"
                            >
                              Project YouTube Link
                            </th>
                            <th className="sort" data-sort="project_status">
                              Project Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {pastLeads?.map((lead) => (
                            <tr key={lead?.id}>
                              <th scope="row">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="checkAll"
                                    value="option1"
                                  />
                                </div>
                              </th>
                              <td className="client-name">{lead.clientName}</td>
                              <td className="project-genre">
                                {lead.projectGenre}
                              </td>
                              <td className="project-date">
                                {lead.projectDueDate}
                              </td>
                              <td className="project-youtube-link">
                                <a href={lead.youtubeLink} target="blank">
                                  {/* Youtube Link */}

                                  <img
                                    src={YoutubeLogo}
                                    height="50px"
                                    width="50px"
                                  />
                                </a>
                              </td>
                              <td className="project-status">
                                <span className="badge border border-primary text-primary fs-13">
                                  {" "}
                                  {lead.projectStatus}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

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
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </div>
    </React.Fragment>
  );
};

export default AdminPendingTasks;
