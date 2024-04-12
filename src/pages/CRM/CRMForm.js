import React from "react";
import { createCrmFormData } from "../../slices/CRM/thunk";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Form,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import selectCampaignGif from "./select-campaign.gif";

const CRMForm = ({
  selectedCampaignCrmFields,
  selectedCampaign,
  formData,
  setFormData,
}) => {
  const dispatch = useDispatch();

  const handleInputChange = (fieldCaption, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldCaption]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createCrmFormData({ ...formData, campaignId: selectedCampaign.value })
    );

    toast.success("Form has been submitted !", {
      position: "bottom-center",
      autoClose: 3000,
      theme: "colored",
    });

    setFormData({});
    // Clear input values
    const inputElements = document.querySelectorAll("input");
    inputElements.forEach((input) => {
      input.value = "";
    });
  };

  const renderFormFields = () => {
    const totalFields = selectedCampaignCrmFields?.length;
    const numRows = Math.ceil(totalFields / 2); // Calculate number of rows needed
    const formFields = [];

    for (let i = 0; i < numRows; i++) {
      const rowIndex = i * 2; // Start index for each row

      const field1 = selectedCampaignCrmFields[rowIndex];
      const field2 = selectedCampaignCrmFields[rowIndex + 1];

      formFields.push(
        <Row key={i} style={{ marginBottom: "10px" }}>
          <Col>
            <Label>{field1.caption}</Label>
            <Input
              type={field1.type}
              required={field1.required === "yes"}
              readOnly={field1.readOnly === "yes"}
              placeholder={`Enter ${field1.caption.toLowerCase()}`}
              onChange={(e) =>
                handleInputChange(field1.caption, e.target.value)
              }
            />
          </Col>
          {field2 && (
            <Col>
              <Label>{field2.caption}</Label>
              <Input
                type={field2.type}
                required={field2.required === "yes"}
                readOnly={field2.readOnly === "yes"}
                placeholder={`Enter ${field2.caption.toLowerCase()}`}
                onChange={(e) =>
                  handleInputChange(field2.caption, e.target.value)
                }
              />
            </Col>
          )}
        </Row>
      );
    }

    return formFields;
  };

  return (
    <Card className="card-height-100" style={{ paddingInline: "50px" }}>
      <CardHeader className="align-items-center d-flex">
        <h4 className="card-title mb-0 flex-grow-1">CRM Form</h4>
      </CardHeader>
      <CardBody className="p-0">
        {selectedCampaign == null ? (
          <div
            className="d-flex flex-column align-items-center"
            style={{ marginTop: "50px" }}
          >
            <img src={selectCampaignGif} height="100px" width="100px" />
            <p className="fs-2 mb-0 text-muted fw-bold">Select a campaign!</p>
          </div>
        ) : selectedCampaignCrmFields?.length !== 0 ? (
          <div style={{ marginTop: "30px" }}>
            <Form onSubmit={handleSubmit}>
              {renderFormFields()}

              <div className="d-flex justify-content-end">
                <Button
                  color="primary"
                  type="submit"
                  style={{ marginTop: "10px" }}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        ) : (
          <div
            className="d-flex flex-column align-items-center"
            style={{ marginTop: "50px" }}
          >
            <img src={selectCampaignGif} height="100px" width="100px" />
            <p className="fs-2 mb-0 text-muted fw-bold">No CRM form created!</p>
          </div>
        )}
      </CardBody>
      <ToastContainer />
    </Card>
  );
};

export default CRMForm;
