import { Card, CardBody, CardHeader, Label } from "reactstrap";
import Select from "react-select";
import { useState } from "react";

const Campaigns = () => {
  const [selectedSingle, setSelectedSingle] = useState(null);

  const SingleOptions = [
    { value: "Choices 1", label: "Choices 1" },
    { value: "Choices 2", label: "Choices 2" },
    { value: "Choices 3", label: "Choices 3" },
    { value: "Choices 4", label: "Choices 4" },
  ];

  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle);
  }

  return (
    <Card className="card-height-100">
      <CardHeader className="align-items-center d-flex">
        <h4 className="card-title mb-0 flex-grow-1">Campaigns</h4>
      </CardHeader>
      <CardBody className="p-0" style={{ height: "80px", marginTop: "15px" }}>
        <div className="mb-3">
          <Select
            value={selectedSingle}
            onChange={() => {
              handleSelectSingle();
            }}
            options={SingleOptions}
            placeholder="Select Campaign"style={{ border: "2px solid red" }}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default Campaigns;
