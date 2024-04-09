import { Card, CardBody, CardHeader, Button } from "reactstrap";

const Modes = () => {
  return (
    <Card className="card-height-100">
      <CardHeader className="align-items-center d-flex">
        <h4 className="card-title mb-0 flex-grow-1">Modes</h4>
      </CardHeader>
      <CardBody className="p-0" style={{ height: "200px" }}>
        Modes will go here
      </CardBody>
    </Card>
  );
};

export default Modes;
