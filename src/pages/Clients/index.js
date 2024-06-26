import React, { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import LeadRemoveModal from "./ClientRemoveModal";
import { useDispatch } from "react-redux";

import { getClients, updateClient } from "../../slices/AddClient/thunk";
import { useSelector } from "react-redux";
import AddTaskModal from "./AddTaskModal";
import EditClientModal from "./EditClientModal";
import { createTask } from "../../slices/Task/thunk";
import ClientRemoveModal from "./ClientRemoveModal";

const Clients = () => {
  const [add_task_modal, setAdd_task_modal] = useState(false);

  const [selectedClientName, setSelectedClientName] = useState("");

  const [selectedClientId, setSelectedClientId] = useState("");

  const [edit_client_modal, setEdit_client_modal] = useState(false);

  const [isEditingClient, setIsEditingClient] = useState(false);

  const [modal_delete, setmodal_delete] = useState(false);

  const [listClientId, setListClientId] = useState(null);

  const dispatch = useDispatch();

  const { clients, dropdowns, error } = useSelector((state) => state.AddClient);

  // toggles register / edit lead modal
  function edit_client_tog_list() {
    setEdit_client_modal(!edit_client_modal);
    setIsEditingClient(false);
  }

  // toggles delete lead confirmation modal
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  function add_task_tog_list() {
    setAdd_task_modal(!add_task_modal);
  }

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  // formik setup
  const taskValidation = useFormik({
    initialValues: {
      taskName: "",
      projectGenre: "",
      projectStatus: "",
      projectDueDate: "",
      youtubeLink: "",
      description: "",
    },
    validationSchema: Yup.object({
      taskName: Yup.string().required("Please enter task name"),
      projectGenre: Yup.string().required("Please enter project genre"),
      projectStatus: Yup.string().required("Please select project status"),
      projectDueDate: Yup.string().required("Please select project due date"),
      youtubeLink: Yup.string(),
      description: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        createTask({
          ...values,
          clientId: selectedClientId,
          clientName: selectedClientName,
        })
      );

      setAdd_task_modal(false);
      resetForm();
    },
  });
  const clientValidation = useFormik({
    initialValues: {
      clientName: "",
      mobileNo: "",
      address: "",
    },
    validationSchema: Yup.object({
      clientName: Yup.string().required("Please enter client name"),
      mobileNo: Yup.string().required("Please enter mobile no"),
      address: Yup.string().required("Please enter address"),
    }),
    onSubmit: (values, { resetForm }) => {
      isEditingClient && dispatch(updateClient({ values, listClientId }));
      setEdit_client_modal(false);
      resetForm();
    },
  });

  // this function also gets triggered (with onSubmit method of formik) when submitting the register / edit lead from
  function formHandleSubmit(e) {
    e.preventDefault();
    taskValidation.handleSubmit();
    return false;
  }
  function editClientHandleSubmit(e) {
    e.preventDefault();
    clientValidation.handleSubmit();
    return false;
  }

  // to update the values of register form when editing the lead
  function handleEditClient(client) {
    setIsEditingClient(true);
    setEdit_client_modal(!edit_client_modal);
    setListClientId(client.id);

    clientValidation.setValues({
      clientName: client.clientName,
      mobileNo: client.mobileNo,
      address: client.address,
    });
  }

  document.title = "Clients";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Clients" pageTitle="Lead Management" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Clients</h4>
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
                            <th className="sort" data-sort="mobile_no">
                              Mobile No
                            </th>
                            <th className="sort" data-sort="project_genre">
                              Address
                            </th>

                            <th className="sort" data-sort="added_by">
                              Added By
                            </th>

                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {clients?.map((client) => (
                            <tr key={client?.id}>
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
                              <td className="client-name">
                                {client.clientName}
                              </td>
                              <td className="client-name">{client.mobileNo}</td>

                              <td className="project-date">{client.address}</td>

                              <td className="added_by">
                                <div>
                                  <div
                                    style={{ borderBottom: "1px solid gray" }}
                                  >
                                    <span> {client.addedBy.username}</span>
                                  </div>
                                  <div>
                                    <span
                                      className="text-muted"
                                      style={{ fontSize: "12px" }}
                                    >
                                      {" "}
                                      {client.addedBy.branch
                                        ? client.addedBy.branch
                                        : "Admin"}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <div className="d-flex gap-2">
                                  <div className="viewEvents">
                                    <button
                                      className="btn btn-sm btn-success e"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => {
                                        add_task_tog_list();
                                        setSelectedClientName(
                                          client.clientName
                                        );
                                        setSelectedClientId(client.id);
                                      }}
                                    >
                                      Add Task
                                    </button>
                                  </div>

                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => {
                                        handleEditClient(client);
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-danger remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      onClick={() => {
                                        setListClientId(client.id);
                                        setmodal_delete(true);
                                      }}
                                    >
                                      Remove
                                    </button>
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

      {/* Add Modal */}
      <EditClientModal
        edit_client_modal={edit_client_modal}
        edit_client_tog_list={edit_client_tog_list}
        editClientHandleSubmit={editClientHandleSubmit}
        clientValidation={clientValidation}
        isEditingClient={isEditingClient}
        dropdowns={dropdowns}
      />

      {/* Remove Modal */}
      <ClientRemoveModal
        modal_delete={modal_delete}
        tog_delete={tog_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteCampaign={() => {
          dispatch(updateClient({ listClientId, status: 0 }));
          setmodal_delete(false);
        }}
      />

      <AddTaskModal
        add_task_modal={add_task_modal}
        add_task_tog_list={add_task_tog_list}
        formHandleSubmit={formHandleSubmit}
        taskValidation={taskValidation}
        dropdowns={dropdowns}
      />
    </React.Fragment>
  );
};

export default Clients;
