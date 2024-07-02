import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import InvoiceModal from "./InvoiceModal";
import InvoiceRemoveModal from "./InvoiceRemoveModal";
import { useDispatch } from "react-redux";
import {
  getInvoices,
  createInvoice,
  removeInvoice,
  updateInvoice,
} from "../../slices/Invoice/thunk";

import {
  getPayments,
  createPayment,
  removePayment,
  updatePayment,
} from "../../slices/Payment/thunk";

import { updateTasks } from "../../slices/AddClient/reducer";
import { getClients } from "../../slices/AddClient/thunk";

import { useSelector } from "react-redux";
import PaymentsViewModal from "./PaymentsViewModal";
import AddPaymentModal from "./AddPaymentModal";
import PaymentRemoveModal from "./PaymentRemoveModal";
import Loader from "../../Components/Common/Loader";

const Invoice = () => {
  const [modal_list, setmodal_list] = useState(false);

  const [payments_view_modal_list, setPayments_view_modal_list] =
    useState(false);

  const [add_payment_modal_list, setAdd_payment_modal_list] = useState(false);

  const [isEditingInvoice, setIsEditingInvoice] = useState(false);

  const [isEditingPayment, setIsEditingPayment] = useState(false);

  const [modal_delete, setmodal_delete] = useState(false);

  const [payement_modal_delete, setPayment_modal_delete] = useState(false);

  const [listInvoiceId, setListInvoiceId] = useState(null);

  const [listPaymentId, setListPaymentId] = useState(null);

  const [selectedSingleStatus, setSelectedSingleStatus] = useState(null);

  const [selectedSingleTask, setSelectedSingleTask] = useState(null);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { invoices, error } = useSelector((state) => state.Invoice);
  const { clients, tasks } = useSelector((state) => state.AddClient);
  const { payments } = useSelector((state) => state.Payment);

  function tog_list() {
    setmodal_list(!modal_list);
    setIsEditingInvoice(false);
  }

  function payements_view_tog_list() {
    setPayments_view_modal_list(!payments_view_modal_list);
  }

  function add_Payment_tog_list() {
    setAdd_payment_modal_list(!add_payment_modal_list);
    setIsEditingPayment(false);
  }

  function payment_tog_delete() {
    setPayment_modal_delete(!payement_modal_delete);
  }
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  useEffect(() => {
    setLoading(true);
    dispatch(getInvoices()).finally(() => setLoading(false));
    dispatch(getClients());
  }, [dispatch]);

  // formik setup
  const validation = useFormik({
    initialValues: {
      clientId: "",
      taskId: "",
      totalAmount: "",
      paymentAmount: "",
      paymentDate: "",
      balance: "",
      paymentDueDate: "",
    },
    validationSchema: Yup.object({
      clientId: Yup.string().required("Please select client"),
      taskId: Yup.string().required("Please select task"),
      totalAmount: Yup.string().required("Please enter total amount"),
      paymentAmount: Yup.string(),
      paymentDate: Yup.string(),
      paymentDueDate: Yup.string().required("Please select due date"),
    }),

    onSubmit: (values, { resetForm }) => {
      isEditingInvoice
        ? dispatch(updateInvoice({ values, listInvoiceId }))
        : dispatch(createInvoice(values));

      setmodal_list(false);
      resetForm();
      setSelectedSingleStatus(null);
      setSelectedSingleTask(null);
    },
  });

  const paymentValidation = useFormik({
    initialValues: {
      paymentAmount: "",
      paymentDate: "",
    },
    validationSchema: Yup.object({
      paymentAmount: Yup.string().required("Please enter payment amount"),
      paymentDate: Yup.string().required("Please select payment date"),
    }),
    onSubmit: (values) => {
      isEditingPayment
        ? dispatch(updatePayment({ ...values, listPaymentId, listInvoiceId }))
        : dispatch(createPayment({ ...values, listInvoiceId, listInvoiceId }));

      setAdd_payment_modal_list(false);
    },
  });

  function formHandleSubmit(e) {
    e.preventDefault();
    validation.handleSubmit();
    return false;
  }
  function paymentFormHandleSubmit(e) {
    e.preventDefault();
    paymentValidation.handleSubmit();
    return false;
  }

  function handleEditInvoice(invoice) {
    setIsEditingInvoice(true);
    setmodal_list(!modal_list);
    setListInvoiceId(invoice.id);

    dispatch(updateTasks(invoice.clientId));

    validation.setValues({
      clientId: invoice.clientId,
      taskId: invoice.taskId,
      totalAmount: invoice.totalAmount,
      paymentDueDate: invoice.paymentDueDate,
    });
  }
  function handleEditPayment(payment) {
    setIsEditingPayment(true);
    setAdd_payment_modal_list(!add_payment_modal_list);
    setListPaymentId(payment.id);

    paymentValidation.setValues({
      paymentAmount: payment.paymentAmount,
      paymentDate: payment.paymentDate,
    });
  }

  document.title = "Invoice";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Add Invoice" pageTitle="Payment" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Create Invoice</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="campaignList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto">
                        <div>
                          <Button
                            color="primary"
                            className="add-btn me-1"
                            onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add Invoice
                          </Button>
                        </div>
                      </Col>
                    </Row>

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
                            <th className="sort" data-sort="task_name">
                              Task Name
                            </th>

                            <th className="sort" data-sort="total_amount">
                              Total Amount
                            </th>

                            <th className="sort" data-sort="balance">
                              Balance
                            </th>
                            <th className="sort" data-sort="due_date">
                              Due Date
                            </th>

                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {loading ? (
                            <tr>
                              <td
                                colSpan={7}
                                style={{
                                  border: "none",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                <Loader />
                              </td>
                            </tr>
                          ) : (
                            invoices?.map((invoice) => (
                              <tr key={invoice?.id}>
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
                                <td className="amount">{invoice.clientName}</td>
                                <td className="amount">{invoice.taskName}</td>
                                <td className="amount">
                                  <span className="fs-13 badge border border-secondary text-secondary">
                                    ₹{invoice.totalAmount}
                                  </span>
                                </td>

                                <td className="balance">
                                  <span className="fs-13 badge border border-secondary text-secondary">
                                    ₹{invoice.balance}
                                  </span>
                                </td>
                                <td className="dueDate">
                                  <span className="fs-13 badge border border-secondary text-secondary">
                                    {invoice.paymentDueDate}
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <div>
                                      <button
                                        className="btn btn-sm btn-success edit-item-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#showModal"
                                        onClick={() => {
                                          payements_view_tog_list();
                                          setListInvoiceId(invoice.id);
                                          dispatch(
                                            getPayments({
                                              invoiceId: invoice.id,
                                            })
                                          );
                                        }}
                                      >
                                        View Payments
                                      </button>
                                    </div>

                                    <div className="edit">
                                      <button
                                        className="btn btn-sm btn-primary edit-item-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#showModal"
                                        onClick={() => {
                                          handleEditInvoice(invoice);
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
                                          setListInvoiceId(invoice.id);
                                          setmodal_delete(true);
                                        }}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
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
      <InvoiceModal
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
        validation={validation}
        isEditingInvoice={isEditingInvoice}
        clients={clients}
        updateTasks={updateTasks}
        tasks={tasks}
        selectedSingleStatus={selectedSingleStatus}
        setSelectedSingleStatus={setSelectedSingleStatus}
        selectedSingleTask={selectedSingleTask}
        setSelectedSingleTask={setSelectedSingleTask}
      />

      {/* Remove Modal */}
      <InvoiceRemoveModal
        modal_delete={modal_delete}
        tog_delete={tog_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteCampaign={() => {
          dispatch(removeInvoice(listInvoiceId));
          setmodal_delete(false);
        }}
      />

      <PaymentsViewModal
        payments_view_modal_list={payments_view_modal_list}
        payements_view_tog_list={payements_view_tog_list}
        add_Payment_tog_list={add_Payment_tog_list}
        payment_tog_delete={payment_tog_delete}
        setListPaymentId={setListPaymentId}
        handleEditPayment={handleEditPayment}
        payments={payments}
      />

      <AddPaymentModal
        add_payment_modal_list={add_payment_modal_list}
        add_Payment_tog_list={add_Payment_tog_list}
        paymentValidation={paymentValidation}
        paymentFormHandleSubmit={paymentFormHandleSubmit}
        isEditingPayment={isEditingPayment}
      />

      <PaymentRemoveModal
        payement_modal_delete={payement_modal_delete}
        payment_tog_delete={payment_tog_delete}
        handleDeletePayment={() => {
          dispatch(removePayment({ listInvoiceId, listPaymentId }));
          setPayment_modal_delete(false);
        }}
      />
    </React.Fragment>
  );
};

export default Invoice;
