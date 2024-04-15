import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import CallHistory from "./CallHistory";
import Dialpad from "./Dialpad";
import CRMForm from "./CRMForm";
import CallLogs from "./CallLogs";
import Campaigns from "./Campaigns";
import Modes from "./Modes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCampaigns } from "../../slices/Campaigns/thunk";

const CRM = () => {
  document.title = "CRM";

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedCampaignCrmFields, setSelectedCampaignCrmFields] =
    useState(null);
  const [selectedCampaignDispositions, setSelectedCampaignDispositions] =
    useState(null);
  const [formData, setFormData] = useState({});

  const { campaigns } = useSelector((state) => state.Campaigns);

  const dispatch = useDispatch();

  function handleSelectCampaign(selectedCampaign) {
    setSelectedCampaign(selectedCampaign);

    const campaignWithFields = campaigns.find((campaign) => {
      return selectedCampaign.value === campaign.id;
    });

    setSelectedCampaignCrmFields(campaignWithFields.crmFields);
    setSelectedCampaignDispositions(campaignWithFields.dispositions);
    setFormData({});
  }

  useEffect(() => {
    dispatch(getCampaigns());
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="CRM" pageTitle="Work" />
          <Row>
            <Col lg={3}>
              <Row>
                <Modes />
              </Row>
              <Row>
                <Campaigns
                  campaigns={campaigns}
                  selectedCampaign={selectedCampaign}
                  handleSelectCampaign={handleSelectCampaign}
                />
              </Row>
              <Row>
                <div>
                  <CallLogs />
                </div>
              </Row>
            </Col>
            <Col lg={6}>
              <CRMForm
                selectedCampaignCrmFields={selectedCampaignCrmFields}
                selectedCampaign={selectedCampaign}
                selectedCampaignDispositions={selectedCampaignDispositions}
                formData={formData}
                setFormData={setFormData}
              />
            </Col>
            <Col lg={3}>
              <Row>
                <Dialpad />
              </Row>
              <Row>
                <CallHistory />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CRM;
