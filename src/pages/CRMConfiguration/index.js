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
import CRMFieldFormModal from "./CRMFieldFormModal";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  notifyFieldAdded,
  notifyFieldRemoved,
  notifyFieldUpdated,
} from "./toast";
import CRMFieldRemoveModal from "./CRMFieldRemoveModal";
import CRMFormModal from "./CRMFormModal";

const CRMConfiguration = () => {
  const user = useSelector((state) => state.Login.user);

  const [modal_list, setmodal_list] = useState(false);
  const [crmFormModalList, setCrmFormModalList] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState("");
  const [adminUsersData, setAdminUsersData] = useState([]);
  const [crmFields, setCrmFields] = useState([]);
  const [modal_delete, setmodal_delete] = useState(false);
  const [listCrmFieldId, setListCrmFieldId] = useState("");
  const [isEditingCrmField, setIsEditingCrmField] = useState(false);
  const [customError, setCustomError] = useState("");

  function tog_list() {
    setmodal_list(!modal_list);
    setIsEditingCrmField(false);
  }
  function crmFormModalToggleList() {
    setCrmFormModalList(!crmFormModalList);
  }

  // toggles delete crmField confirmation modal
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/crm-configuration`, {
        withCredentials: true,
      })
      .then((res) => {
        setAdminUsersData(res.data);
      })
      .catch((err) => {
        console.log(
          "error while fetching crm fields on crm-configuration page ->",
          err
        );
      });
  }, []);

  // formik setup
  const crmFieldValidation = useFormik({
    initialValues: {
      caption: "",
      type: "",
      required: "",
      readOnly: "",
      position: "",
    },
    validationSchema: Yup.object({
      caption: Yup.string().required("Please enter caption"),
      type: Yup.string().required("Please select type"),
      required: Yup.string().required(
        "Please select whether field is required"
      ),
      readOnly: Yup.string().required(
        "Please select whether field is read only"
      ),
      position: Yup.number().required("Please enter position"),
    }),
    onSubmit: (values) => {
      isEditingCrmField
        ? handleCrmFieldUpdate(adminUsersData.id)
        : handleAddCrmField(values);
    },
  });
  const campaignTypeValidation = useFormik({
    initialValues: {
      campaignName: "",
    },
    validationSchema: Yup.object({
      campaignName: Yup.string().required("Please select a campaign"),
    }),
    onSubmit: (values) => {
      // console.log(values);
    },
  });

  function crmFieldFormHandleSubmit(e) {
    e.preventDefault();

    if (crmFieldValidation.values.position > crmFields.length + 1) {
      setCustomError(
        `CRM Field position should not be more than ${crmFields.length + 1}`
      );
      return;
    }

    crmFieldValidation.handleSubmit();

    return false;
  }

  function handleChange(e) {
    campaignTypeValidation.setFieldValue("campaignName", e.target.value);
    const currentCampaignId = adminUsersData?.campaigns?.filter((campaign) => {
      if (campaign.campaignName === e.target.value) {
        return campaign;
      }
    });

    // made this variable because cannot user new value of state immediately after state updation
    const updatedCurrentCampaignId = currentCampaignId[0].id;
    setSelectedCampaignId(updatedCurrentCampaignId);

    // all fields of particular campaign
    const crmFieldsOfCampaign = adminUsersData?.campaigns?.filter(
      (campaign) => {
        if (campaign.id === updatedCurrentCampaignId) {
          return campaign;
        }
      }
    );

    setCrmFields(crmFieldsOfCampaign[0]?.crmFields);
  }

  function showCampaignFormHandleSubmit(e) {
    e.preventDefault();
    campaignTypeValidation.handleSubmit();

    return false;
  }

  function handleAddCrmField(values) {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/${adminUsersData.id}/campaign/${selectedCampaignId}/crm-field/create`,
        values,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === "failure") {
          setCustomError(res.message);
          return;
        }
        if (res.status === "positions-updated") {
          setCrmFields(res.data);
          setmodal_list(false);
          notifyFieldAdded();
          return;
        }

        if (res.data) {
          // Update the campaigns array with the new crmFields data
          const updatedCampaigns = adminUsersData?.campaigns?.map(
            (campaign) => {
              if (campaign.id === selectedCampaignId) {
                // Update the campaign's crmFields array
                return {
                  ...campaign,
                  crmFields: [...campaign.crmFields, res.data],
                };
              }
              return campaign;
            }
          );

          setAdminUsersData((prevState) => ({
            ...prevState,
            campaigns: updatedCampaigns,
          }));

          // updating crmFields with latest fields
          setCrmFields((prevState) => [...prevState, res.data]);
          notifyFieldAdded();

          setmodal_list(false);
          !isEditingCampaign && notifyAddedCampaign();
        }
      })
      .catch((error) => {
        console.log("error while registering user ->", error);
      });
  }

  // to update the values of crmField form when editing the crmField
  function handleEditCrmField(crmFieldData) {
    setIsEditingCrmField(true);
    setmodal_list(!modal_list);
    setListCrmFieldId(crmFieldData.id);

    crmFieldValidation.setValues({
      caption: crmFieldData.caption,
      type: crmFieldData.type,
      required: crmFieldData.required ? "Yes" : "No",
      readOnly: crmFieldData.readOnly ? "Yes" : "No",
      position: crmFieldData.position,
    });
  }

  // after making an edit and clicking on update crm field button this function updates the crm field details
  function handleCrmFieldUpdate(adminId) {
    console.log("crm fields on updation submit ->", crmFields);

    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/${adminId}/campaign/${selectedCampaignId}/crm-field/${listCrmFieldId}/edit`,
        crmFieldValidation.values,
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === "duplicate") {
          setCustomError(res.message);
        } else {
          // const updatedField = crmFields.map((crmField) => {
          //   if (crmField.id === listCrmFieldId) {
          //     return res.data;
          //   } else {
          //     return crmField;
          //   }
          // });
          console.log("data after field updation", res.data);

          setCrmFields(res.data);

          setmodal_list(!modal_list);
          notifyFieldUpdated();
        }
      })
      .catch((err) => {
        console.log("error while updating", err);
      });
  }

  function handleDeleteCrmField(adminId, crmFieldId) {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/${adminId}/campaign/${selectedCampaignId}/crm-field/${crmFieldId}/delete`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // filtering crm Fields so that deleted crm field can be updated instantly
        // const filteredCrmFields = crmFields.filter(
        //   (crmField) => crmFieldId !== crmField.id
        // );

        setCrmFields(res.data);
        setmodal_delete(false);
        notifyFieldRemoved();
      })
      .catch((err) => {
        console.log("error while deleting user", err);
      });
  }

  document.title = "Users";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title="Campaign Management"
            pageTitle="Operational Configuration"
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">CRM Configuration</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto">
                        <Form
                          style={{ display: "flex", gap: "10px" }}
                          onSubmit={(e) =>
                            showCampaignFormHandleSubmit(
                              e,
                              campaignTypeValidation.caption
                            )
                          }
                        >
                          <div className="mb-2">
                            <Input
                              id="campaignType"
                              name="campaignType"
                              className="form-control"
                              placeholder="Enter Campaign Type"
                              type="select"
                              onChange={handleChange}
                              onBlur={campaignTypeValidation.handleBlur}
                              value={
                                campaignTypeValidation.values.campaignName || ""
                              }
                              invalid={
                                campaignTypeValidation.touched.campaignName &&
                                campaignTypeValidation.errors.campaignName
                                  ? true
                                  : false
                              }
                            >
                              <option value="" disabled>
                                Select Campaign Type
                              </option>

                              {adminUsersData?.campaigns?.map((campaign) => (
                                <option
                                  value={campaign?.campaignName}
                                  key={campaign.id}
                                >
                                  {campaign?.campaignName}
                                </option>
                              ))}
                            </Input>

                            {campaignTypeValidation.touched.campaignType &&
                            campaignTypeValidation.errors.campaignType ? (
                              <FormFeedback type="invalid">
                                {campaignTypeValidation.errors.campaignType}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div>
                            <Button
                              color="primary"
                              className="add-btn me-1"
                              type="submit"
                              id="show-btn"
                              disabled={!selectedCampaignId}
                              onClick={() =>
                                crmFormModalToggleList(!crmFormModalList)
                              }
                            >
                              <i className="ri-search-line search-icon"> </i>
                              Show CRM
                            </Button>
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
                            disabled={!selectedCampaignId} // if no campaign is selected button will remain disabled
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            CRM Field
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
                              Caption
                            </th>
                            <th className="sort" data-sort="type">
                              Type
                            </th>
                            <th className="sort" data-sort="required">
                              Required
                            </th>
                            <th className="sort" data-sort="readOnly">
                              Read Only
                            </th>
                            <th className="sort" data-sort="position">
                              Position
                            </th>
                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {crmFields?.map((crmField) => (
                            <tr key={crmField.id}>
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
                              <td className="caption">{crmField?.caption}</td>
                              <td className="type">{crmField?.type}</td>
                              <td className="required">
                                {crmField?.required ? "yes" : "no"}
                              </td>
                              <td className="readOnly">
                                {crmField?.readOnly ? "yes" : "No"}
                              </td>
                              <td className="position">{crmField?.position}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() =>
                                        handleEditCrmField(crmField)
                                      }
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
                                        setListCrmFieldId(crmField.id);
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
                      <div className="noresult" style={{ display: "none" }}>
                        <div className="text-center">
                          <lord-icon
                            src="https://cdn.lordicon.com/msoeawqm.json"
                            trigger="loop"
                            colors="primary:#25a0e2,secondary:#00bd9d"
                            style={{ width: "75px", height: "75px" }}
                          ></lord-icon>
                          <h5 className="mt-2">Sorry! No Result Found</h5>
                          <p className="text-muted mb-0">
                            We've searched more than 150+ Orders We did not find
                            any orders for you search.
                          </p>
                        </div>
                      </div>
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
      <CRMFieldFormModal
        modal_list={modal_list}
        tog_list={tog_list}
        crmFieldValidation={crmFieldValidation}
        isEditingCrmField={isEditingCrmField}
        crmFieldFormHandleSubmit={crmFieldFormHandleSubmit}
        selectedCampaignId={selectedCampaignId}
        customError={customError}
      />
      {/* crm field remove modal */}
      <CRMFieldRemoveModal
        modal_delete={modal_delete}
        tog_delete={tog_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteCrmField={() =>
          handleDeleteCrmField(adminUsersData.id, listCrmFieldId)
        }
      />
      {/* crm form modal */}
      <CRMFormModal
        crmFormModalList={crmFormModalList}
        crmFormModalToggleList={crmFormModalToggleList}
        crmFieldFormHandleSubmit={crmFieldFormHandleSubmit}
        crmFieldValidation={crmFieldValidation}
        crmFields={crmFields}
      />
    </React.Fragment>
  );
};

export default CRMConfiguration;
