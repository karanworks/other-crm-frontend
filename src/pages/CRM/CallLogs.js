import { Card, CardBody, CardHeader, Button } from "reactstrap";

import FeatherIcon from "feather-icons-react";

import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import { template } from "lodash";

const CallLogs = () => {
  const teamMembers = [
    {
      id: 1,
      img: avatar1,
      name: "Karan",
      number: "7982304038",
      date: "13-01-2024",
      time: "01:05 PM",
      remarks:
        "did not pick up the call, so I left a voicemail detailing the purpose of my call.",
    },
    {
      id: 2,
      img: avatar1,
      name: "Karan",
      number: "7982304038",
      date: "12-01-2024",
      time: "10:12 AM",
      remarks:
        "Apologies for any inconvenience. u inconvenience. u inconvenience. u inconvenience. u inconvenience. u for your .",
    },
  ];

  return (
    <Card className="card-height-100">
      <CardHeader
        className="align-items-center d-flex"
        style={{ marginBottom: "15px" }}
      >
        <h4 className="card-title mb-0 flex-grow-1">Previous Call Logs</h4>
      </CardHeader>
      <CardBody
        className="p-0"
        style={{
          height: "280px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="call-log-container"
          style={{ width: "100%", paddingInline: "16px" }}
        >
          {teamMembers.map((member, key) => (
            <div
              className="call-log-row w-100"
              style={{ marginBottom: "15px" }}
              key={key}
            >
              <div className="d-flex">
                <img
                  src={member.img}
                  alt=""
                  className="avatar-xs rounded-3 me-2"
                />

                <div>
                  <h5 className="fs-13 mb-0">{member.name}</h5>
                  <p className="fs-12 mb-0 text-muted">{member.number}</p>
                </div>

                <div style={{ marginLeft: "auto" }}>
                  <p className="fs-12 mb-0 text-muted">{member.date}</p>
                  <p className="fs-12 mb-0 text-muted">{member.time}</p>
                </div>
              </div>
              <div>
                <p
                  className="fs-14 mb-0 text-muted"
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {member.remarks}
                </p>
                <a href="#" style={{ color: "#3caae5" }}>
                  {" "}
                  View more
                </a>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default CallLogs;
