import React, { useState } from "react";
import { createCrmFormData } from "../../slices/CRM/thunk";
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

const CRMForm = ({ selectedCampaignCrmFields, selectedCampaign }) => {
  const fields = [
    {
      id: 1,
      caption: "Name",
      type: "text",
      required: "yes",
      readOnly: "no",
    },
    {
      id: 2,
      caption: "Mobile",
      type: "number",
      required: "yes",
      readOnly: "no",
    },
    {
      id: 3,
      caption: "Address",
      type: "text",
      required: "yes",
      readOnly: "no",
    },
  ];

  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

  const handleInputChange = (fieldCaption, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldCaption]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createCrmFormData(formData));
    // Make your API call using formData
  };

  console.log("selected campaign in crm form ->", selectedCampaign);

  const renderFormFields = () => {
    const totalFields = selectedCampaignCrmFields?.length;
    const numRows = Math.ceil(totalFields / 2); // Calculate number of rows needed
    const formFields = [];

    for (let i = 0; i < numRows; i++) {
      const rowIndex = i * 2; // Start index for each row

      const field1 = selectedCampaignCrmFields[rowIndex];
      const field2 = selectedCampaignCrmFields[rowIndex + 1];

      formFields.push(
        <Row key={i}>
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
              <Button
                color="primary"
                type="submit"
                style={{ marginTop: "10px" }}
              >
                Submit
              </Button>
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
    </Card>
  );
};

export default CRMForm;
