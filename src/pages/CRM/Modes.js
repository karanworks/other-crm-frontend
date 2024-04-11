import { Card, CardBody, CardHeader, Label } from "reactstrap";
import Select from "react-select";
import { useState } from "react";

const Modes = () => {
  const [selectedSingle, setSelectedSingle] = useState(null);

  const SingleOptions = [
    { value: "Break", label: "Break" },
    { value: "Manual", label: "Manual" },
    { value: "Auto", label: "Auto" },
  ];

  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle);
  }

  return (
    <Card className="card-height-100">
      <CardHeader className="align-items-center d-flex">
        <h4 className="card-title mb-0 flex-grow-1">Modes</h4>
      </CardHeader>
      <CardBody className="p-0" style={{ height: "80px", marginTop: "15px" }}>
        <div className="mb-3">
          <Select
            value={selectedSingle}
            onChange={() => {
              handleSelectSingle();
            }}
            options={SingleOptions}
            placeholder="Select Mode"
            style={{ border: "2px solid red" }}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default Modes;
