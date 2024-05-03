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
import CreateSpeechFormModal from "./CreateSpeechFormModal";
import SpeechRemoveModal from "./SpeechRemoveModal";

import {
  getSpeeches,
  createSpeech,
  updateSpeech,
  removeSpeech,
} from "../../slices/Speech/thunk";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeIvrCampaign } from "../../slices/Speech/reducer";
import { logoutUser } from "../../slices/auth/login/thunk";

const Speech = () => {
  // modal for create speech
  const [modal_list, setmodal_list] = useState(false);

  // modal for deleting a speech
  const [modal_delete, setmodal_delete] = useState(false);

  const [listSpeechId, setListSpeechId] = useState("");

  const [isEditingSpeech, setIsEditingSpeech] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const [ivrCampaignsOptions, setIvrCampaignsOptions] = useState(null);

  const [selectedSingleIvrCampaign, setSelectedSingleIvrCampaign] =
    useState(null);

  const {
    speeches,
    speechesData,
    selectedIvrCampaignId,
    error,
    alreadyExistsError,
  } = useSelector((state) => state.Speech);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      dispatch(logoutUser());
      navigate("/login");
      window.location.reload();
    }
  }, [dispatch, error]);

  function tog_list() {
    setmodal_list(!modal_list);
    setIsEditingSpeech(false);
  }

  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  useEffect(() => {
    const campaignOptions = speechesData.ivrCampaigns?.map((campaign) => {
      return {
        value: campaign.id,
        label: campaign.ivrCampaignName,
      };
    });

    setIvrCampaignsOptions(campaignOptions);
  }, [speechesData]);

  useEffect(() => {
    if (alreadyExistsError) {
      setmodal_list(!modal_list);
    }
  }, [alreadyExistsError]);

  useEffect(() => {
    dispatch(getSpeeches());
  }, [dispatch]);

  // formik setup
  const speechValidation = useFormik({
    initialValues: {
      title: "",
      speechText: "",
      speechAudio: "",
      speechAudioName: "",
      ivrCampaignId: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      speechText: Yup.string(),
      speechAudio: Yup.string(),
      speechAudioName: Yup.string(),
      ivrCampaignId: Yup.string().required("Select an IVR campaign"),
    }),
    onSubmit: (values) => {
      const { title, speechText, speechAudio, speechAudioName, ivrCampaignId } =
        values;
      console.log("speech form values ->", ivrCampaignId);

      isEditingSpeech
        ? dispatch(
            updateSpeech({
              ivrCampaignId,
              listSpeechId,
              title,
              speechText,
              speechAudio,
              speechAudioName,
            })
          )
        : dispatch(
            createSpeech({
              ivrCampaignId,
              title,
              speechText,
              speechAudio,
              speechAudioName,
            })
          );

      speechValidation.resetForm();
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

  function handleSpeechFormSubmit(e) {
    e.preventDefault();

    speechValidation.handleSubmit();

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

  function handleEditSpeech(speechData) {
    setIsEditingSpeech(true);
    setmodal_list(!modal_list);
    setListSpeechId(speechData.id);

    speechValidation.setValues({
      title: speechData.title,
      speechText: speechData.speechText,
      speechAudio: speechData.speechAudio,
    });
  }

  function handleSelectSingle(selectedSingle) {
    setSelectedSingleIvrCampaign(selectedSingle);
  }

  document.title = "Speech";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Speech" pageTitle="IVR Admin" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Speech</h4>
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
                                Select IVR Campaign
                              </option>

                              {speechesData?.ivrCampaigns?.map((campaign) => (
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
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add Speech
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
                              Title
                            </th>
                            <th className="sort" data-sort="type">
                              Speech Text / Audio
                            </th>

                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {speeches?.map((speech) => (
                            <tr key={speech.id}>
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
                              <td>{speech?.title}</td>
                              <td>
                                {speech.speechText ? (
                                  <div>{speech.speechText}</div>
                                ) : null}
                                {speech.speechAudioBlob ? (
                                  <audio controls>
                                    <source
                                      src={URL.createObjectURL(
                                        new Blob(
                                          [
                                            convertDataURIToBinary(
                                              `data:audio/wav;base64,${speech.speechAudioBlob}`
                                            ),
                                          ],
                                          { type: "audio/wav" }
                                        )
                                      )}
                                      type="audio/wav"
                                    />
                                    Your browser does not support the audio
                                    element.
                                  </audio>
                                ) : null}
                              </td>

                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => handleEditSpeech(speech)}
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
                                        setListSpeechId(speech.id);
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
      <CreateSpeechFormModal
        modal_list={modal_list}
        tog_list={tog_list}
        speechValidation={speechValidation}
        isEditingSpeech={isEditingSpeech}
        handleSpeechFormSubmit={handleSpeechFormSubmit}
        selectedIvrCampaignId={selectedIvrCampaignId}
        alreadyExistsError={alreadyExistsError}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        selectedSingleIvrCampaign={selectedSingleIvrCampaign}
        handleSelectSingle={handleSelectSingle}
        ivrCampaignsOptions={ivrCampaignsOptions}
      />
      <SpeechRemoveModal
        modal_delete={modal_delete}
        tog_delete={tog_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteSpeech={() => {
          dispatch(removeSpeech({ selectedIvrCampaignId, listSpeechId }));
          setmodal_delete(false);
        }}
      />
    </React.Fragment>
  );
};

export default Speech;
