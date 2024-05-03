import {
  Input,
  Label,
  Form,
  FormFeedback,
  Modal,
  ModalBody,
  ModalHeader,
  Alert,
  Card,
  Row,
  Col,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";

function CreateSpeechFormModal({
  modal_list,
  tog_list,
  handleSpeechFormSubmit,
  speechValidation,
  isEditingSpeech,
  alreadyExistsError,
  selectedFile,
  setSelectedFile,
  selectedSingleIvrCampaign,
  handleSelectSingle,
  ivrCampaignsOptions,
}) {
  function handleAcceptedFile(file) {
    Object.assign(file, {
      preview: URL.createObjectURL(file),
      formattedSize: formatBytes(file.size),
    });
    setSelectedFile(file);
    speechValidation.setFieldValue("speechAudio", file);
    console.log("file goes here ->", file);
    speechValidation.setFieldValue("speechAudioName", file.path);
  }

  function handleFileDelete() {
    setSelectedFile(null);
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <Modal
      isOpen={modal_list}
      toggle={() => {
        tog_list();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          tog_list();
        }}
      >
        {isEditingSpeech ? "Update Speech" : "Create Speech"}
      </ModalHeader>
      <Form
        className="tablelist-form"
        onSubmit={handleSpeechFormSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <ModalBody style={{ paddingTop: "0px" }}>
          {alreadyExistsError && (
            <Alert color="danger" style={{ marginBlock: "10px" }}>
              {alreadyExistsError}
            </Alert>
          )}
          <div className="mb-2">
            <Label htmlFor="title" className="form-label">
              Title
            </Label>

            <Input
              id="title"
              name="title"
              className="form-control"
              placeholder="Enter Speech"
              type="text"
              onChange={speechValidation.handleChange}
              onBlur={speechValidation.handleBlur}
              value={speechValidation.values.title || ""}
              invalid={
                speechValidation.touched.title && speechValidation.errors.title
              }
            />

            {speechValidation.touched.title && speechValidation.errors.title ? (
              <FormFeedback type="invalid">
                {speechValidation.errors.title}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label htmlFor="ivrCampaignId" className="form-label">
              Select IVR Campaign
            </Label>
            <Select
              id="ivrCampaignId"
              name="ivrCampaignId"
              value={selectedSingleIvrCampaign}
              onChange={(value) => {
                console.log("selected ivr campaign >", value);
                handleSelectSingle();
                speechValidation.setFieldValue("ivrCampaignId", value.value);
              }}
              options={ivrCampaignsOptions}
              placeholder="Select IVR Campaign"
              style={{ border: "2px solid red" }}
            />

            {speechValidation.touched.ivrCampaignId &&
            speechValidation.errors.ivrCampaignId ? (
              <FormFeedback type="invalid">
                {speechValidation.errors.ivrCampaignId}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label htmlFor="number" className="form-label">
              Speech Text
            </Label>

            <Input
              id="speechText"
              name="speechText"
              className="form-control"
              placeholder="Enter Speech Text"
              type="text"
              onChange={speechValidation.handleChange}
              onBlur={speechValidation.handleBlur}
              value={speechValidation.values.speechText || ""}
              invalid={
                speechValidation.touched.speechText &&
                speechValidation.errors.speechText
              }
            />

            {speechValidation.touched.speechText &&
            speechValidation.errors.speechText ? (
              <FormFeedback type="invalid">
                {speechValidation.errors.speechText}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2 mt-4 w-100 d-flex justify-content-center">
            <span>OR</span>
          </div>

          <div className="mb-2 ">
            <Label htmlFor="speechAudio" className="form-label">
              Speech Audio
            </Label>
            <Dropzone
              id="speechAudio"
              name="speechAudio"
              onDrop={(acceptedFiles) => {
                handleAcceptedFile(acceptedFiles[0]);
              }}
              maxFiles={1}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="dropzone dz-clickable">
                  <div className="dz-message needsclick" {...getRootProps()}>
                    <div className="mb-3">
                      <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                    </div>
                    <h4>Drop file here or click to upload.</h4>
                  </div>
                </div>
              )}
            </Dropzone>
            {selectedFile && (
              <Card className="mt-1 mb-0 shadow-none border">
                <div className="p-2">
                  <Row className="align-items-center">
                    <Col className="col-auto">
                      <img
                        data-dz-thumbnail=""
                        height="80"
                        className="avatar-sm rounded bg-light"
                        alt={selectedFile.name}
                        src={selectedFile.preview}
                      />
                    </Col>
                    <Col>
                      <Link to="#" className="text-muted font-weight-bold">
                        {selectedFile.name}
                      </Link>
                      <p className="mb-0">
                        <strong>{selectedFile.formattedSize}</strong>
                      </p>
                    </Col>
                    <Col className="col-auto">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={handleFileDelete}
                      >
                        Delete
                      </button>
                    </Col>
                  </Row>
                </div>
              </Card>
            )}
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {isEditingSpeech ? "Update " : "Create "}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default CreateSpeechFormModal;
