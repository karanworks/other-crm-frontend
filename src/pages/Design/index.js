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
import {
  createDesign,
  getDesign,
  removeDesign,
  updateDesign,
} from "../../slices/Design/thunk";
import { changeIvrCampaign } from "../../slices/Design/reducer";
import NumberModal from "./NumberModal";
import userIcon from "./user-icon.png";
import FirstLayer from "./FirstLayer";
import NumberLayout from "./NumberLayout";
import SecondLayerKeysLayout from "./SecondLayerKeysLayout";
import ThirdLayerKeysLayout from "./ThirdLayerKeysLayout";
import FourthLayer from "./FourthLayer";
import RemoveModal from "./RemoveModal";

const Design = () => {
  const [modal_list, setmodal_list] = useState(false);

  const [modal_delete, setmodal_delete] = useState(false);

  const [number_modal_list, set_number_modal_list] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const [listDesignId, setListDesignId] = useState("");

  const [isEditingDesign, setIsEditingDesign] = useState(false);

  const [clickedBtn, setClickedBtn] = useState("");

  const [layerId, setLayerId] = useState("");

  const dispatch = useDispatch();
  const { designData, selectedIvrCampaignId, departments, departmentNumbers } =
    useSelector((state) => state.Design);

  function tog_list() {
    setmodal_list(!modal_list);
    setIsEditingDesign(false);
  }
  function number_tog_list() {
    set_number_modal_list(!number_modal_list);
  }

  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  function handleDialpadBtn(key) {
    setLayerId("");
    setClickedBtn(key);
  }

  useEffect(() => {
    dispatch(getDesign());
  }, [dispatch]);

  function handleAddNumber(number) {
    const alreadyIncluded = selectedNumbers.some(
      (n) => n.number == number.number
    );

    if (alreadyIncluded) {
      const filteredNumbers = selectedNumbers.filter((n) => {
        return n.number !== number.number;
      });
      setSelectedNumbers(filteredNumbers);
    } else {
      setSelectedNumbers((prev) => [...prev, number]);
    }
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

      if (key) {
        setClickedBtn("");
      }

      isEditingDesign
        ? dispatch(updateDesign({ listDesignId, ...values }))
        : dispatch(
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
      dispatch(
        createDesign({
          ivrCampaignId: selectedIvrCampaignId,
          // key: clickedBtn || key,
          // audioText,
          parentId: layerId,
          number: selectedNumbers,
        })
      );
      number_tog_list();
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

  function handleEditDesign(design) {
    setIsEditingDesign(true);
    setmodal_list(!modal_list);
    setListDesignId(design.id);
    setLayerId(design.id);

    validation.values.audioText = design.audioText;
    validation.values.key = design.key;
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

                                {!design?.parentId && (
                                  <FirstLayer
                                    design={design}
                                    tog_list={tog_list}
                                    setLayerId={setLayerId}
                                    number_tog_list={number_tog_list}
                                    tog_delete={tog_delete}
                                    setListDesignId={setListDesignId}
                                    handleEditDesign={handleEditDesign}
                                  />
                                )}

                                {design?.items?.map((item) =>
                                  item?.number ? (
                                    <NumberLayout
                                      item={item}
                                      key={item.id}
                                      tog_delete={tog_delete}
                                      setListDesignId={setListDesignId}
                                    />
                                  ) : null
                                )}

                                <SecondLayerKeysLayout
                                  designItems={design.items}
                                  tog_list={tog_list}
                                  setLayerId={setLayerId}
                                  number_tog_list={number_tog_list}
                                  tog_delete={tog_delete}
                                  setListDesignId={setListDesignId}
                                  handleEditDesign={handleEditDesign}
                                />

                                <td className="third">
                                  <div className="keys-info-container">
                                    {design?.items?.map((item) => {
                                      return (
                                        <ThirdLayerKeysLayout
                                          items={item.items}
                                          parentKey={item.key}
                                          number_tog_list={number_tog_list}
                                          setLayerId={setLayerId}
                                          key={item.id}
                                          tog_delete={tog_delete}
                                          setListDesignId={setListDesignId}
                                        />
                                      );
                                    })}
                                  </div>
                                </td>

                                <td className="fourth">
                                  <div
                                    className="keys-info-container d-flex flex-column"
                                    style={{ gap: "15px" }}
                                  >
                                    {design?.items?.map((item) => {
                                      if (item?.items?.length !== 0) {
                                        return item?.items?.map((item2) => {
                                          if (item2?.items?.length !== 0) {
                                            return (
                                              <FourthLayer
                                                key={item2.id}
                                                designItems={item2.items}
                                                grandParentKey={item.key}
                                                tog_delete={tog_delete}
                                                setListDesignId={
                                                  setListDesignId
                                                }
                                              />
                                            );
                                            // return item2?.items?.map(
                                            //   (item3) => (
                                            //     <FourthLayer
                                            //       key={item3.id}
                                            //       designItems={item3}
                                            //       grandParentKey={item.key}
                                            //       tog_delete={tog_delete}
                                            //       setListDesignId={
                                            //         setListDesignId
                                            //       }
                                            //     />
                                            //   )
                                            // );
                                          }
                                          return null; // Added return statement
                                        });
                                      }
                                      return null; // Added return statement
                                    })}
                                  </div>{" "}
                                </td>
                              </tr>
                            ))}
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

      <RemoveModal
        modal_delete={modal_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteDesign={() => {
          dispatch(removeDesign(listDesignId));
          setmodal_delete(false);
        }}
      />
    </React.Fragment>
  );
};

export default Design;
