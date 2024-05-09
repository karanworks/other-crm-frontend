import {
  Alert,
  Input,
  Label,
  Form,
  FormFeedback,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

import Dropzone from "react-dropzone";
import { useState } from "react";

function DesignModal({
  modal_list, // modal state
  tog_list, // to change modal state
  formHandleSubmit, // submit function for form
  validation, // to get the values from formik
  alreadyExistsError,
  selectedFile,
  setSelectedFile,
  layerId,
}) {
  const [selectedSingle, setSelectedSingle] = useState(null);

  const SingleOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "0", label: "0" },
    { value: "*", label: "*" },
    { value: "#", label: "#" },
  ];

  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle);
  }

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
        {" "}
        Add IVR
      </ModalHeader>
      <Form
        className="tablelist-form"
        onSubmit={(e) => formHandleSubmit(e, validation.userId)}
      >
        <ModalBody style={{ paddingTop: "0px" }}>
          {/* {alreadyExistsError && (
            <Alert color="danger" style={{ marginBlock: "10px" }}>
              {alreadyExistsError}
            </Alert>
          )} */}

          {layerId ? (
            <div className="mb-2">
              <Label htmlFor="choices-single-default" className="form-label ">
                Key
              </Label>

              <Select
                value={selectedSingle}
                onChange={(key) => {
                  handleSelectSingle(key);
                  validation.setFieldValue("key", key.value);
                }}
                onBlur={validation.handleBlur}
                placeholder="Select Key"
                options={SingleOptions}
              />
              {validation.touched.key && validation.errors.key ? (
                <FormFeedback type="invalid">
                  {validation.errors.key}
                </FormFeedback>
              ) : null}
            </div>
          ) : null}

          <div className="mb-2">
            <Label htmlFor="number" className="form-label">
              Speech Text
            </Label>

            <Input
              id="audioText"
              name="audioText"
              className="form-control"
              placeholder="Enter Audio Text"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.audioText || ""}
              invalid={
                validation.touched.audioText && validation.errors.audioText
              }
            />

            {validation.touched.audioText && validation.errors.audioText ? (
              <FormFeedback type="invalid">
                {validation.errors.audioText}
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
              Create IVR
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default DesignModal;
