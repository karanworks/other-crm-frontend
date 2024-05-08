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
import NumberModal from "./NumberModal";
import userIcon from "./user-icon.png";

const Design = () => {
  const [modal_list, setmodal_list] = useState(false);

  const [number_modal_list, set_number_modal_list] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const [selectedNumbers, setSelectedNumbers] = useState([]);

  // state for storing dialpad key
  const [clickedBtn, setClickedBtn] = useState("");

  const [layerId, setLayerId] = useState("");

  const dispatch = useDispatch();
  const { designData, selectedIvrCampaignId, departments, departmentNumbers } =
    useSelector((state) => state.Design);

  function tog_list() {
    setmodal_list(!modal_list);
  }
  function number_tog_list() {
    set_number_modal_list(!number_modal_list);
  }

  console.log("checking for number ->", designData?.designs);

  function handleDialpadBtn(key) {
    setLayerId("");
    setClickedBtn(key);
  }

  useEffect(() => {
    dispatch(getDesign());
  }, [dispatch]);

  function handleAddNumber(number) {
    // const alreadyIncluded = selectedNumbers.includes(number.userId);

    console.log("Number checked ->", number);
    setSelectedNumbers((prev) => [...prev, number]);

    // if (alreadyIncluded) {
    // const filteredUsers = users.filter((u) => {
    //   return u.userId !== user.userId;
    // });

    // console.log("already included", number);

    // setUsers(filteredUsers);
    // setSelectedNumbers(
    //   selectedNumbers.filter((userId) => userId !== user.userId)
    // );
    // } else {
    // setUsers((prev) => [...prev, number]);
    // setSelectedNumbers((prev) => [...prev, number.number]);
    // }
  }

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

  const numberValidation = useFormik({
    initialValues: {
      department: "",
    },
    validationSchema: Yup.object({
      department: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log("number validation being called ->", selectedNumbers);

      dispatch(
        createDesign({
          ivrCampaignId: selectedIvrCampaignId,
          // key: clickedBtn || key,
          // audioText,
          parentId: layerId,
          number: selectedNumbers,
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

  function numberFromHandleSubmit(e) {
    e.preventDefault();
    console.log("handle submit called while adding number");
    numberValidation.handleSubmit();
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
                                      {design?.key}
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
                                        onClick={() => {
                                          setLayerId(design?.id);
                                          number_tog_list();
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

                                {design.items.map((item) =>
                                  item?.number ? (
                                    <td>
                                      <div key={item.id}>
                                        {item.number.map((number) => (
                                          <div key={number.id}>
                                            {/* <div>
                                              {item?.number.length !== 0
                                                ? "true"
                                                : "false"}
                                            </div> */}
                                            {/* <div>
                                              {JSON.stringify(item?.number)}{" "}
                                            </div> */}
                                            <div
                                              className="d-flex align-items-center"
                                              key={number.id}
                                              style={{ padding: "0" }}
                                            >
                                              <img
                                                src={userIcon}
                                                alt=""
                                                className="avatar-xs rounded-3 me-2"
                                                style={{
                                                  width: "25px",
                                                  height: "25px",
                                                }}
                                              />
                                              <div className="d-flex align-items-center">
                                                <h5 className="fs-15 mb-0">
                                                  {number.name + " - "}
                                                </h5>
                                                <p className="fs-15 mb-0 ">
                                                  {" "}
                                                  {number.number}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </td>
                                  ) : null
                                )}

                                <td>
                                  <div
                                    className="d-flex flex-column"
                                    style={{ gap: "5px" }}
                                  >
                                    {design.items.map((item) =>
                                      !item.number ? (
                                        <div
                                          className="d-flex "
                                          style={{ gap: "10px" }}
                                          key={item.id}
                                        >
                                          <span>{item.audioText}</span>
                                          <div
                                            className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
                                            style={{
                                              width: "25px",
                                              height: "25px",
                                              border: "1px solid #32A6E4",
                                            }}
                                          >
                                            {item.key}
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
                                                setLayerId(item.id);
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
                                              onClick={() => {
                                                setLayerId(item.id);
                                                number_tog_list();
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
                                      ) : null
                                    )}
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
      <NumberModal
        number_modal_list={number_modal_list}
        number_tog_list={number_tog_list}
        numberValidation={numberValidation}
        numberFromHandleSubmit={numberFromHandleSubmit}
        layerId={layerId}
        departments={departments}
        departmentNumbers={departmentNumbers}
        selectedNumbers={selectedNumbers}
        handleAddNumber={handleAddNumber}
      />
    </React.Fragment>
  );
};

export default Design;
