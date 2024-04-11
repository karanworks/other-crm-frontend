import { Card, CardBody, CardHeader, Label } from "reactstrap";
import Select from "react-select";

const Campaigns = ({ campaigns, selectedCampaign, handleSelectCampaign }) => {
  const campaignOptions = campaigns?.map((campaign) => {
    return { value: campaign.id, label: campaign.campaignName };
  });

  return (
    <Card className="card-height-100">
      <CardHeader className="align-items-center d-flex">
        <h4 className="card-title mb-0 flex-grow-1">Campaigns</h4>
      </CardHeader>
      <CardBody className="p-0" style={{ height: "80px", marginTop: "15px" }}>
        <div className="mb-3">
          <Select
            value={selectedCampaign}
            onChange={handleSelectCampaign}
            options={campaignOptions}
            placeholder="Select Campaign"
            style={{ border: "2px solid red" }}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default Campaigns;
