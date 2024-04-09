import { Card, CardBody, CardHeader, Button } from "reactstrap";

const CallLogs = () => {
  return (
    <Card className="card-height-100">
      <CardHeader className="align-items-center d-flex">
        <h4 className="card-title mb-0 flex-grow-1">Call Logs</h4>
      </CardHeader>
      <CardBody className="p-0" style={{ height: "250px" }}>
        call logs will go here
      </CardBody>
    </Card>
  );
};

export default CallLogs;
