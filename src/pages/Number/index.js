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
  Form,
  FormFeedback,
  Input,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import CreateNumberFormModal from "./CreateNumberFormModal";
import NumberRemoveModal from "./NumberRemoveModal";

import {
  getNumbers,
  createNumber,
  updateNumber,
  removeNumber,
} from "../../slices/Number/thunk";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeIvrCampaign } from "../../slices/Number/reducer";
import { logoutUser } from "../../slices/auth/login/thunk";

const Number = () => {
  // modal for create number
  const [modal_list, setmodal_list] = useState(false);

  // modal for deleting a number
  const [modal_delete, setmodal_delete] = useState(false);

  const [listNumberId, setListNumberId] = useState("");

  const [isEditingNumber, setIsEditingNumber] = useState(false);

  const {
    numbers,
    numbersData,
    selectedIvrCampaignId,
    error,
    alreadyExistsError,
  } = useSelector((state) => state.Number);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      dispatch(logoutUser());
      navigate("/login");
      window.location.reload();
    }
  }, [dispatch, error]);

  // to toggle modal for crm field
  function tog_list() {
    setmodal_list(!modal_list);
    setIsEditingNumber(false);
  }

  // toggles delete crmField confirmation modal
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  useEffect(() => {
    if (alreadyExistsError) {
      setmodal_list(!modal_list);
    }
  }, [alreadyExistsError]);

  useEffect(() => {
    dispatch(getNumbers());
  }, [dispatch]);

  // formik setup
  const numberValidation = useFormik({
    initialValues: {
      name: "",
      number: "",
      department: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      number: Yup.string().required("Numbr is required"),
      department: Yup.string().required("Department is required"),
    }),
    onSubmit: (values) => {
      const { name, number, department } = values;

      console.log("number form values ->", values);

      isEditingNumber
        ? dispatch(
            updateNumber({
              selectedIvrCampaignId,
              listNumberId,
              name,
              number,
              department,
            })
          )
        : dispatch(
            createNumber({
              selectedIvrCampaignId,
              name,
              number,
              department,
            })
          );

      numberValidation.resetForm();
      setmodal_list(!modal_list);
    },
  });

  // formik for ivrcampaign (that is selected inside select element)
  const ivrCampaignValidation = useFormik({
    initialValues: {
      ivrCampaignName: "",
    },
    validationSchema: Yup.object({
      ivrCampaignName: Yup.string().required(),
    }),
    onSubmit: (values) => {},
  });

  function handleNumberFormSubmit(e) {
    e.preventDefault();

    numberValidation.handleSubmit();

    return false;
  }

  function handleChange(e) {
    ivrCampaignValidation.setFieldValue("ivrCampaignName", e.target.value);
    dispatch(changeIvrCampaign(e.target.value));
  }

  function showCampaignFormHandleSubmit(e) {
    e.preventDefault();
    ivrCampaignValidation.handleSubmit();

    return false;
  }

  function handleEditNumber(numberData) {
    setIsEditingNumber(true);
    setmodal_list(!modal_list);
    setListNumberId(numberData.id);

    numberValidation.setValues({
      name: numberData.name,
      number: numberData.number,
      department: numberData.department,
    });
  }

  document.title = "Number";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Number" pageTitle="IVR Admin" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Number</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto">
                        <Form
                          style={{ display: "flex", gap: "10px" }}
                          onSubmit={showCampaignFormHandleSubmit}
                        >
                          <div className="mb-2">
                            <Input
                              id="campaignType"
                              name="campaignType"
                              className="form-control"
                              placeholder="Enter Campaign Type"
                              type="select"
                              onChange={handleChange}
                              onBlur={ivrCampaignValidation.handleBlur}
                              value={
                                ivrCampaignValidation.values.ivrCampaignName ||
                                ""
                              }
                              invalid={
                                ivrCampaignValidation.touched.ivrCampaignName &&
                                ivrCampaignValidation.errors.ivrCampaignName
                                  ? true
                                  : false
                              }
                            >
                              <option value="" disabled>
                                Select IVR Campaign Type
                              </option>

                              {numbersData?.ivrCampaigns?.map((campaign) => (
                                <option
                                  value={campaign?.ivrCampaignName}
                                  key={campaign.id}
                                >
                                  {campaign?.ivrCampaignName}
                                </option>
                              ))}
                            </Input>

                            {ivrCampaignValidation.touched.campaignType &&
                            ivrCampaignValidation.errors.campaignType ? (
                              <FormFeedback type="invalid">
                                {ivrCampaignValidation.errors.campaignType}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Form>
                      </Col>
                      <Col
                        className="col-sm-auto"
                        style={{ marginLeft: "auto" }}
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Button
                            color="primary"
                            className="add-btn me-1"
                            onClick={() => tog_list()}
                            id="create-btn"
                            disabled={!selectedIvrCampaignId} // if no campaign is selected button will remain disabled
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add Number
                          </Button>
                        </div>
                      </Col>
                    </Row>

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="userTable"
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
                            <th className="sort" data-sort="caption">
                              Name
                            </th>
                            <th className="sort" data-sort="type">
                              Number
                            </th>
                            <th className="sort" data-sort="type">
                              Department
                            </th>

                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {numbers?.map((number) => (
                            <tr key={number.id}>
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
                              <td>{number?.name}</td>
                              <td>{number?.number}</td>

                              <td>{number?.department}</td>

                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => handleEditNumber(number)}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-success remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      onClick={() => {
                                        setListNumberId(number.id);
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
      <CreateNumberFormModal
        modal_list={modal_list}
        tog_list={tog_list}
        numberValidation={numberValidation}
        isEditingNumber={isEditingNumber}
        handleNumberFormSubmit={handleNumberFormSubmit}
        selectedIvrCampaignId={selectedIvrCampaignId}
        alreadyExistsError={alreadyExistsError}
      />
      <NumberRemoveModal
        modal_delete={modal_delete}
        tog_delete={tog_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteNumber={() => {
          dispatch(removeNumber({ selectedIvrCampaignId, listNumberId }));
          setmodal_delete(false);
        }}
      />
    </React.Fragment>
  );
};

export default Number;
