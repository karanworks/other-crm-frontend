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
import { createDesign, getDesign } from "../../slices/Design/thunk";
import { changeIvrCampaign } from "../../slices/Design/reducer";

const Design = () => {
  const [modal_list, setmodal_list] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  // state for storing dialpad key
  const [clickedBtn, setClickedBtn] = useState("");

  const [layerId, setLayerId] = useState("");

  const dispatch = useDispatch();
  const { designData, selectedIvrCampaignId } = useSelector(
    (state) => state.Design
  );

  console.log("single design ->", designData.designs);

  function tog_list() {
    setmodal_list(!modal_list);
  }

  function handleDialpadBtn(key) {
    setLayerId("");
    setClickedBtn(key);
  }

  useEffect(() => {
    dispatch(getDesign());
  }, [dispatch]);

  const validation = useFormik({
    initialValues: {
      audioText: "",
      key: "",
    },
    validationSchema: Yup.object({
      audioText: Yup.string().required(),
      key: Yup.string(),
    }),
    onSubmit: (values) => {
      const { audioText, key } = values;

      //   isEditingCampaign
      //     ? dispatch(updateCampaign({ values, listCampaignId }))
      //     : dispatch(createCampaign(values));

      console.log("key from form ->", key);

      console.log("form values ->", values);
      dispatch(
        createDesign({
          ivrCampaignId: selectedIvrCampaignId,
          key: clickedBtn || key,
          audioText,
          parentId: layerId,
        })
      );

      setmodal_list(false);
    },
  });

  function formHandleSubmit(e) {
    e.preventDefault();
    console.log("handle submit called while creating design");
    validation.handleSubmit();
    return false;
  }

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
                        <DesignDialpad
                          tog_list={tog_list}
                          handleDialpadBtn={handleDialpadBtn}
                        />
                        {/* <Button color="primary">Numbers</Button> */}
                      </div>
                      <div
                        className="table-responsive"
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
                            {designData.designs?.map((design) => (
                              <tr
                                style={{ borderBottom: "1px solid #e9ebec" }}
                                key={design?.id}
                              >
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
                                <td className="first">
                                  <div
                                    className="d-flex align-items-center"
                                    style={{ gap: "10px" }}
                                  >
                                    <span>{design?.audioText}</span>
                                    <div
                                      className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
                                      style={{
                                        width: "25px",
                                        height: "25px",
                                        border: "1px solid #32A6E4",
                                      }}
                                    >
                                      2
                                    </div>
                                    <div
                                      className="d-flex"
                                      style={{ gap: "2px" }}
                                    >
                                      <button
                                        type="button"
                                        className="d-flex justify-content-center align-items-center  btn btn-primary waves-effect waves-light"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                        onClick={() => {
                                          setLayerId(design?.id);
                                          tog_list();
                                        }}
                                      >
                                        <i className="ri-add-line"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className="d-flex justify-content-center align-items-center  btn btn-success waves-effect waves-light"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                      >
                                        <i className="ri-phone-line"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className="d-flex justify-content-center align-items-center  btn btn-warning waves-effect waves-light"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                      >
                                        <i className="ri-edit-line"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className="d-flex justify-content-center align-items-center  btn btn-danger waves-effect waves-light"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                      >
                                        <i className="ri-delete-bin-2-line"></i>
                                      </button>
                                    </div>
                                  </div>
                                </td>

                                <td className="fourth">
                                  <div
                                    className="d-flex flex-column"
                                    style={{ gap: "5px" }}
                                  >
                                    <div
                                      className="d-flex align-items-center"
                                      style={{ gap: "5px" }}
                                    >
                                      <span>Raju -</span>
                                      <span>9239823893</span>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}

                            <tr style={{ borderBottom: "1px solid #e9ebec" }}>
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
                              <td className="first">
                                <div
                                  className="d-flex align-items"
                                  style={{ gap: "10px" }}
                                >
                                  <span>Audio Text</span>
                                  <div
                                    className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
                                    style={{
                                      width: "25px",
                                      height: "25px",
                                      border: "1px solid #32A6E4",
                                    }}
                                  >
                                    1
                                  </div>

                                  <div
                                    className="d-flex"
                                    style={{ gap: "2px" }}
                                  >
                                    <button
                                      type="button"
                                      className="d-flex justify-content-center align-items-center  btn btn-primary waves-effect waves-light"
                                      style={{ width: "25px", height: "25px" }}
                                    >
                                      <i className="ri-add-line"></i>
                                    </button>
                                    <button
                                      type="button"
                                      className="d-flex justify-content-center align-items-center  btn btn-success waves-effect waves-light"
                                      style={{ width: "25px", height: "25px" }}
                                    >
                                      <i className="ri-phone-line"></i>
                                    </button>
                                    <button
                                      type="button"
                                      className="d-flex justify-content-center align-items-center  btn btn-warning waves-effect waves-light"
                                      style={{ width: "25px", height: "25px" }}
                                    >
                                      <i className="ri-edit-line"></i>
                                    </button>
                                    <button
                                      type="button"
                                      className="d-flex justify-content-center align-items-center  btn btn-danger waves-effect waves-light"
                                      style={{ width: "25px", height: "25px" }}
                                    >
                                      <i className="ri-delete-bin-2-line"></i>
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td className="second">
                                <div
                                  className="d-flex flex-column"
                                  style={{ gap: "5px" }}
                                >
                                  <div
                                    className="d-flex "
                                    style={{ gap: "10px" }}
                                  >
                                    <span>Audio Text</span>
                                    <div
                                      className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
                                      style={{
                                        width: "25px",
                                        height: "25px",
                                        border: "1px solid #32A6E4",
                                      }}
                                    >
                                      1
                                    </div>
                                    <div
                                      className="d-flex"
                                      style={{ gap: "2px" }}
                                    >
                                      <button
                                        type="button"
                                        className="d-flex justify-content-center align-items-center  btn btn-primary waves-effect waves-light"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                      >
                                        <i className="ri-add-line"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className="d-flex justify-content-center align-items-center  btn btn-success waves-effect waves-light"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                      >
                                        <i className="ri-phone-line"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className="d-flex justify-content-center align-items-center  btn btn-warning waves-effect waves-light"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                      >
                                        <i className="ri-edit-line"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className="d-flex justify-content-center align-items-center  btn btn-danger waves-effect waves-light"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                      >
                                        <i className="ri-delete-bin-2-line"></i>
                                      </button>
                                    </div>
                                  </div>
                                  <div
                                    className="d-flex align-items-center"
                                    style={{ gap: "10px" }}
                                  >
                                    <span>Audio Text</span>
                                    <div
                                      className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
                                      style={{
                                        width: "25px",
                                        height: "25px",
                                        border: "1px solid #32A6E4",
                                      }}
                                    >
                                      2
                                    </div>
                                    <div
                                      className="d-flex"
                                      style={{ gap: "2px" }}
                                    >
                                      <button
                                        type="button"
                                        className="d-flex justify-content-center align-items-center  btn btn-primary waves-effect waves-light"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                      >
                                        <i className="ri-add-line"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className="d-flex justify-content-center align-items-center  btn btn-success waves-effect waves-light"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                      >
                                        <i className="ri-phone-line"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className="d-flex justify-content-center align-items-center  btn btn-warning waves-effect waves-light"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                      >
                                        <i className="ri-edit-line"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className="d-flex justify-content-center align-items-center  btn btn-danger waves-effect waves-light"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                      >
                                        <i className="ri-delete-bin-2-line"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="third">
                                <div
                                  className="keys-info-container d-flex flex-column"
                                  style={{ gap: "15px" }}
                                >
                                  <div className="single-key-info-container">
                                    <div
                                      className="key-heading d-flex mb-2 pb-2"
                                      style={{
                                        gap: "5px",
                                        borderBottom: "1px solid #8F92A0",
                                      }}
                                    >
                                      <span className="fw-bold">Key - </span>
                                      <div
                                        className="bg-secondary d-flex justify-content-center align-items-center rounded-2"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                          color: "white",
                                        }}
                                      >
                                        1
                                      </div>
                                    </div>
                                    <div
                                      className="d-flex flex-column"
                                      style={{ gap: "5px" }}
                                    >
                                      <div
                                        className="d-flex align-items-center"
                                        style={{ gap: "10px" }}
                                      >
                                        <span>Audio Text</span>
                                        <div
                                          className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                            border: "1px solid #32A6E4",
                                          }}
                                        >
                                          1
                                        </div>
                                        <div
                                          className="d-flex"
                                          style={{ gap: "2px" }}
                                        >
                                          <button
                                            type="button"
                                            className="d-flex justify-content-center align-items-center  btn btn-primary waves-effect waves-light"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                            }}
                                          >
                                            <i className="ri-add-line"></i>
                                          </button>
                                          <button
                                            type="button"
                                            className="d-flex justify-content-center align-items-center  btn btn-success waves-effect waves-light"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                            }}
                                          >
                                            <i className="ri-phone-line"></i>
                                          </button>
                                          <button
                                            type="button"
                                            className="d-flex justify-content-center align-items-center  btn btn-warning waves-effect waves-light"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                            }}
                                          >
                                            <i className="ri-edit-line"></i>
                                          </button>
                                          <button
                                            type="button"
                                            className="d-flex justify-content-center align-items-center  btn btn-danger waves-effect waves-light"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                            }}
                                          >
                                            <i className="ri-delete-bin-2-line"></i>
                                          </button>
                                        </div>
                                      </div>
                                      <div
                                        className="d-flex align-items-center"
                                        style={{ gap: "10px" }}
                                      >
                                        <span>Audio Text</span>
                                        <div
                                          className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                            border: "1px solid #32A6E4",
                                          }}
                                        >
                                          2
                                        </div>
                                        <div
                                          className="d-flex"
                                          style={{ gap: "2px" }}
                                        >
                                          <button
                                            type="button"
                                            className="d-flex justify-content-center align-items-center  btn btn-primary waves-effect waves-light"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                            }}
                                          >
                                            <i className="ri-add-line"></i>
                                          </button>
                                          <button
                                            type="button"
                                            className="d-flex justify-content-center align-items-center  btn btn-success waves-effect waves-light"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                            }}
                                          >
                                            <i className="ri-phone-line"></i>
                                          </button>
                                          <button
                                            type="button"
                                            className="d-flex justify-content-center align-items-center  btn btn-warning waves-effect waves-light"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                            }}
                                          >
                                            <i className="ri-edit-line"></i>
                                          </button>
                                          <button
                                            type="button"
                                            className="d-flex justify-content-center align-items-center  btn btn-danger waves-effect waves-light"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                            }}
                                          >
                                            <i className="ri-delete-bin-2-line"></i>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="single-key-info-container">
                                    <div
                                      className="key-heading d-flex mb-2 pb-2"
                                      style={{
                                        gap: "5px",
                                        borderBottom: "1px solid #8F92A0",
                                      }}
                                    >
                                      <span className="fw-bold">Key - </span>
                                      <div
                                        className="bg-secondary d-flex justify-content-center align-items-center rounded-2"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                          color: "white",
                                        }}
                                      >
                                        2
                                      </div>
                                    </div>
                                    <div
                                      className="d-flex flex-column"
                                      style={{ gap: "5px" }}
                                    >
                                      <div
                                        className="d-flex align-items-center"
                                        style={{ gap: "10px" }}
                                      >
                                        <span>Audio Text</span>
                                        <div
                                          className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                            border: "1px solid #32A6E4",
                                          }}
                                        >
                                          1
                                        </div>
                                        <div
                                          className="d-flex"
                                          style={{ gap: "2px" }}
                                        >
                                          <button
                                            type="button"
                                            className="d-flex justify-content-center align-items-center  btn btn-primary waves-effect waves-light"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                            }}
                                          >
                                            <i className="ri-add-line"></i>
                                          </button>
                                          <button
                                            type="button"
                                            className="d-flex justify-content-center align-items-center  btn btn-success waves-effect waves-light"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                            }}
                                          >
                                            <i className="ri-phone-line"></i>
                                          </button>
                                          <button
                                            type="button"
                                            className="d-flex justify-content-center align-items-center  btn btn-warning waves-effect waves-light"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                            }}
                                          >
                                            <i className="ri-edit-line"></i>
                                          </button>
                                          <button
                                            type="button"
                                            className="d-flex justify-content-center align-items-center  btn btn-danger waves-effect waves-light"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                            }}
                                          >
                                            <i className="ri-delete-bin-2-line"></i>
                                          </button>
                                        </div>
                                      </div>
                                      <div
                                        className="d-flex align-items-center"
                                        style={{ gap: "10px" }}
                                      >
                                        <span>Audio Text</span>
                                        <div
                                          className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                            border: "1px solid #32A6E4",
                                          }}
                                        >
                                          2
                                        </div>
                                        <div
                                          className="d-flex"
                                          style={{ gap: "2px" }}
                                        >
                                          <button
                                            type="button"
                                            className="d-flex justify-content-center align-items-center  btn btn-primary waves-effect waves-light"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                            }}
                                          >
                                            <i className="ri-add-line"></i>
                                          </button>
                                          <button
                                            type="button"
                                            className="d-flex justify-content-center align-items-center  btn btn-success waves-effect waves-light"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                            }}
                                          >
                                            <i className="ri-phone-line"></i>
                                          </button>
                                          <button
                                            type="button"
                                            className="d-flex justify-content-center align-items-center  btn btn-warning waves-effect waves-light"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                            }}
                                          >
                                            <i className="ri-edit-line"></i>
                                          </button>
                                          <button
                                            type="button"
                                            className="d-flex justify-content-center align-items-center  btn btn-danger waves-effect waves-light"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                            }}
                                          >
                                            <i className="ri-delete-bin-2-line"></i>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="fourth">
                                <div
                                  className="keys-info-container d-flex flex-column"
                                  style={{ gap: "15px" }}
                                >
                                  <div className="single-key-info-container">
                                    <div
                                      className="key-heading d-flex mb-2 pb-2"
                                      style={{
                                        gap: "5px",
                                        borderBottom: "1px solid #8F92A0",
                                      }}
                                    >
                                      <span className="fw-bold">Key - </span>
                                      <div
                                        className="bg-secondary d-flex justify-content-center align-items-center rounded-2"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                          color: "white",
                                        }}
                                      >
                                        1
                                      </div>
                                    </div>
                                    <div
                                      className="d-flex flex-column"
                                      style={{ gap: "5px" }}
                                    >
                                      <div
                                        className="d-flex align-items-center"
                                        style={{ gap: "5px" }}
                                      >
                                        <span>Indumati -</span>
                                        <span>9239823893</span>
                                        <div
                                          className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                            border: "1px solid #32A6E4",
                                          }}
                                        >
                                          1
                                        </div>
                                      </div>
                                      <div
                                        className="d-flex align-items-center"
                                        style={{ gap: "5px" }}
                                      >
                                        <span>Chutki -</span>
                                        <span>9239823893</span>
                                        <div
                                          className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                            border: "1px solid #32A6E4",
                                          }}
                                        >
                                          2
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="single-key-info-container">
                                    <div
                                      className="key-heading d-flex mb-2 pb-2"
                                      style={{
                                        gap: "5px",
                                        borderBottom: "1px solid #8F92A0",
                                      }}
                                    >
                                      <span className="fw-bold">Key - </span>
                                      <div
                                        className="bg-secondary d-flex justify-content-center align-items-center rounded-2"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                          color: "white",
                                        }}
                                      >
                                        2
                                      </div>
                                    </div>
                                    <div
                                      className="d-flex flex-column"
                                      style={{ gap: "5px" }}
                                    >
                                      <div
                                        className="d-flex align-items-center"
                                        style={{ gap: "5px" }}
                                      >
                                        <span>Bheem -</span>
                                        <span>9239823893</span>
                                        <div
                                          className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                            border: "1px solid #32A6E4",
                                          }}
                                        >
                                          1
                                        </div>
                                      </div>
                                      <div
                                        className="d-flex align-items-center"
                                        style={{ gap: "5px" }}
                                      >
                                        <span>Kaliya -</span>
                                        <span>9239823893</span>
                                        <div
                                          className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                            border: "1px solid #32A6E4",
                                          }}
                                        >
                                          2
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #e9ebec" }}>
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
                              <td className="first">
                                <div
                                  className="d-flex align-items-center"
                                  style={{ gap: "10px" }}
                                >
                                  <span>Audio Text</span>
                                  <div
                                    className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
                                    style={{
                                      width: "25px",
                                      height: "25px",
                                      border: "1px solid #32A6E4",
                                    }}
                                  >
                                    2
                                  </div>
                                  <div
                                    className="d-flex"
                                    style={{ gap: "2px" }}
                                  >
                                    <button
                                      type="button"
                                      className="d-flex justify-content-center align-items-center  btn btn-primary waves-effect waves-light"
                                      style={{ width: "25px", height: "25px" }}
                                    >
                                      <i className="ri-add-line"></i>
                                    </button>
                                    <button
                                      type="button"
                                      className="d-flex justify-content-center align-items-center  btn btn-success waves-effect waves-light"
                                      style={{ width: "25px", height: "25px" }}
                                    >
                                      <i className="ri-phone-line"></i>
                                    </button>
                                    <button
                                      type="button"
                                      className="d-flex justify-content-center align-items-center  btn btn-warning waves-effect waves-light"
                                      style={{ width: "25px", height: "25px" }}
                                    >
                                      <i className="ri-edit-line"></i>
                                    </button>
                                    <button
                                      type="button"
                                      className="d-flex justify-content-center align-items-center  btn btn-danger waves-effect waves-light"
                                      style={{ width: "25px", height: "25px" }}
                                    >
                                      <i className="ri-delete-bin-2-line"></i>
                                    </button>
                                  </div>
                                </div>
                              </td>

                              <td className="fourth">
                                <div
                                  className="d-flex flex-column"
                                  style={{ gap: "5px" }}
                                >
                                  <div
                                    className="d-flex align-items-center"
                                    style={{ gap: "5px" }}
                                  >
                                    <span>Raju -</span>
                                    <span>9239823893</span>
                                  </div>
                                </div>
                              </td>
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
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        layerId={layerId}
      />
    </React.Fragment>
  );
};

export default Design;
