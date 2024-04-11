import { Card, CardBody, CardHeader, Button } from "reactstrap";

import FeatherIcon from "feather-icons-react";

import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";

const CallHistory = () => {
  const teamMembers = [
    {
      id: 1,
      img: avatar1,
      name: "Karan",
      number: "7982304038",
      hours: "110",
      tasks: "258",
      time: "01:05:06",
    },
    {
      id: 2,
      img: avatar2,
      name: "Chhota Bheem",
      number: "9872348089",
      hours: "83",
      tasks: "105",
      time: "23:55",
    },
    {
      id: 3,
      img: avatar3,
      name: "Shaktiman",
      number: "9283478833",
      hours: "58",
      tasks: "75",
      time: "02:03:11",
    },
    // {
    //   id: 4,
    //   img: avatar4,
    //   name: "Luffy",
    //   number: "8972834789",
    //   hours: "96",
    //   tasks: "85",
    //   time: "01:01:11",
    // },
    // {
    //   id: 5,
    //   img: avatar5,
    //   name: "Zoro",
    //   number: "9823388333",
    //   hours: "76",
    //   tasks: "69",
    //   time: "33:03:",
    // },
  ];

  return (
    <Card className="card-height-100">
      <CardHeader
        className="align-items-center d-flex"
        style={{ marginBottom: "15px" }}
      >
        <h4 className="card-title mb-0 flex-grow-1">Today's Call History</h4>
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
          className="table-responsive table-card"
          style={{
            margin: "0",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <table className="table table-borderless table-nowrap align-middle mb-0">
            <tbody>
              {(teamMembers || []).map((item, key) => (
                <tr
                  key={key}
                  className="d-flex "
                  style={{
                    justifyContent: "space-between",
                    paddingBlock: "3px",
                  }}
                >
                  <td
                    className="d-flex"
                    style={{
                      padding: "0",
                    }}
                  >
                    <img
                      src={item.img}
                      alt=""
                      className="avatar-xs rounded-3 me-2"
                    />
                    <div>
                      <h5 className="fs-13 mb-0">{item.name}</h5>
                      <p className="fs-12 mb-0 text-muted">{item.number}</p>
                    </div>
                  </td>

                  <td
                    style={{
                      padding: "0",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <Button
                        size="sm"
                        color="success"
                        className="me-1 btn-soft-success"
                        style={{
                          height: "25px",
                          width: "25px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "0",
                        }}
                      >
                        <FeatherIcon
                          icon="phone"
                          style={{
                            width: "13px",
                            height: "13px",
                          }}
                        />
                      </Button>
                      <Button
                        size="sm"
                        color="primary"
                        className="me-1 btn-soft-primary"
                        style={{
                          height: "25px",
                          width: "25px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FeatherIcon
                          icon="info"
                          style={{ width: "13px", height: "13px" }}
                        />
                      </Button>
                    </div>
                    <span className="fs-13 time text-muted">{item.time}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default CallHistory;
