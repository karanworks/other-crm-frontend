import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Input,
  Button,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import DesignDialpad from "./DesignDialpad";
import DesignModal from "./DesignModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getDesign } from "../../slices/Design/thunk";
import { changeIvrCampaign } from "../../slices/Design/reducer";

const Design = () => {
  const [modal_list, setmodal_list] = useState(false);
  const [selectedDepartmentOption, setSelectedDepartmentOption] =
    useState(null);
  const dispatch = useDispatch();
  const { designData, departments } = useSelector((state) => state.Design);

  const departmentOptions = departments?.map((department) => {
    return { value: department, label: department };
  });

  function handleSelectDepartmentOption(selectedDepartmentOption) {
    setSelectedDepartmentOption(selectedDepartmentOption);
  }

  function tog_list() {
    setmodal_list(!modal_list);
  }

  const validation = useFormik({
    initialValues: {
      departmentName: "",
    },
    validationSchema: Yup.object({
      departmentName: Yup.string().required("Please enter department name"),
    }),
    onSubmit: (values) => {
      //   isEditingCampaign
      //     ? dispatch(updateCampaign({ values, listCampaignId }))
      //     : dispatch(createCampaign(values));

      console.log("form values ->", values);

      setmodal_list(false);
    },
  });

  function formHandleSubmit(e) {
    e.preventDefault();
    validation.handleSubmit();
    return false;
  }

  useEffect(() => {
    dispatch(getDesign());
  }, [dispatch]);

  const ivrCampaignValidation = useFormik({
    initialValues: {
      ivrCampaignName: "",
    },
    validationSchema: Yup.object({
      ivrCampaignName: Yup.string().required(),
    }),
    onSubmit: (values) => {},
  });

  function handleChange(e) {
    ivrCampaignValidation.setFieldValue("ivrCampaignName", e.target.value);
    dispatch(changeIvrCampaign(e.target.value));
  }

  document.title = "IVR Design";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="IVR Design" pageTitle="IVR Admin" />

          <Row>
            <Col xs={12}>
              <Card className="card-height-100">
                <CardHeader className="align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">
                    Create New IVR
                  </h4>
                </CardHeader>
                <CardBody className="p-0">
                  <Row
                    className="g-4 w-100"
                    style={{
                      margin: "0",
                      borderBottom: "1px solid #e8e6e6",
                      paddingBlock: "10px",
                    }}
                  >
                    <Col className="col-sm-auto">
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
                            ivrCampaignValidation.values.ivrCampaignName || ""
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

                          {designData?.ivrCampaigns?.map((campaign) => (
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
                    </Col>
                  </Row>
                  <Row>
                    <Col className="d-flex align-items-start">
                      <div className="ivr-design-dialpad-container">
                        <DesignDialpad tog_list={tog_list} />
                        {/* <Button color="primary">Numbers</Button> */}
                      </div>
                      <div
                        style={{
                          width: "100%",
                          border: "1px solid #e8e6e6",
                          borderBottom: "0",
                          borderTop: "0",
                          height: "100%",
                        }}
                      >
                        <table
                          className="table align-middle table-nowrap"
                          style={{ marginBottom: "0" }}
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
                              <th className="sort" data-sort="first">
                                First IVR
                              </th>
                              <th className="sort" data-sort="second">
                                Second IVR
                              </th>
                              <th className="sort" data-sort="third">
                                Third IVR
                              </th>
                              <th className="sort" data-sort="fourth">
                                Fourth IVR
                              </th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            <tr>
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
                              <td className="first">First</td>
                              <td className="second">Second</td>

                              <td className="third">Third</td>

                              <td className="fourth">Fourth</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <DesignModal
        modal_list={modal_list}
        tog_list={tog_list}
        validation={validation}
        formHandleSubmit={formHandleSubmit}
        departmentOptions={departmentOptions}
        selectedDepartmentOption={selectedDepartmentOption}
        handleSelectDepartmentOption={handleSelectDepartmentOption}
      />
    </React.Fragment>
  );
};

export default Design;
