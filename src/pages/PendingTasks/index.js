import React, { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// import { getLeads } from "../../slices/AddLead/thunk";
import { getClients } from "../../slices/AddClient/thunk";
import { useSelector } from "react-redux";
import YoutubeLogo from "./youtube_logo.webp";
import { getPendingTasks } from "../../slices/PendingTasks/thunk";

const PendingTasks = () => {
  const { clients } = useSelector((state) => state.AddClient);
  const { pendingTasks } = useSelector((state) => state.PendingTasks);

  const dispatch = useDispatch();

  console.log("PENDING TASKS ->", pendingTasks);

  const pastLeads = clients;

  useEffect(() => {
    dispatch(getClients());
    dispatch(getPendingTasks());
  }, [dispatch]);

  function utcToIstDateFormatter(dateString) {
    const tempDate = dateString;

    const dateObj = tempDate && new Date(tempDate);

    const options = {
      day: "2-digit", // Ensure two digits for day
      month: "2-digit", // Ensure two digits for month
      year: "numeric", // Four-digit year
    };

    return dateObj?.toLocaleDateString("en-IN", options);
  }

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
                  <h4 className="card-title mb-0">Pending Tasks</h4>
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
                            <th className="sort" data-sort="task_name">
                              Task Name
                            </th>
                            <th className="sort" data-sort="client_name">
                              Client Name
                            </th>
                            <th className="sort" data-sort="project_genre">
                              Project Genre
                            </th>
                            <th className="sort" data-sort="project_status">
                              Project Status
                            </th>
                            <th className="sort" data-sort="project_due_date">
                              Project Due Date
                            </th>
                            <th className="sort" data-sort="youtube_link">
                              Youtube Link
                            </th>
                            <th className="sort" data-sort="description">
                              Description
                            </th>
                            <th className="sort" data-sort="added_by">
                              Added By
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {pendingTasks?.map((task) => (
                            <tr key={task.id}>
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
                              <td className="task-name">{task.task}</td>
                              <td className="client-name">{task.clientName}</td>
                              <td className="project_genre">
                                {task.projectGenre}
                              </td>
                              <td className="project_status">
                                {task.projectStatus}
                              </td>
                              <td className="project_due_date">
                                {utcToIstDateFormatter(task.projectDueDate)}
                              </td>
                              <td className="youtube_link">
                                <a href={task.youtubeLink} target="blank">
                                  {/* Youtube Link */}

                                  <img
                                    src={YoutubeLogo}
                                    height="50px"
                                    width="50px"
                                  />
                                </a>
                              </td>
                              <td className="address">{task.description}</td>
                              <td className="added_by">
                                <div>
                                  <div
                                    style={{ borderBottom: "1px solid gray" }}
                                  >
                                    <span> {task.addedBy.username}</span>
                                  </div>
                                  <div>
                                    <span
                                      className="text-muted"
                                      style={{ fontSize: "12px" }}
                                    >
                                      {" "}
                                      {task.addedBy.branch
                                        ? task.addedBy.branch
                                        : "Admin"}
                                    </span>
                                  </div>
                                </div>
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

export default PendingTasks;
