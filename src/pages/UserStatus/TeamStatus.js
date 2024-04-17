import { Button, Input, Label } from "reactstrap";
import FeatherIcon from "feather-icons-react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { useState } from "react";
import Select from "react-select";
import { color } from "echarts";

function TeamStatus() {
  const [selectedSingle, setSelectedSingle] = useState(null);

  const SingleOptions = [
    { value: "On Call", label: "On Call" },
    { value: "Break", label: "Break" },
  ];

  function handleSelectSingle(selectedSingle) {
    console.log("selected single ->", selectedSingle);
    setSelectedSingle(selectedSingle);
  }
  const usersData = [
    {
      id: 1,
      username: "Karan",
      campaign: "Credit Card",
      state: "On Call",
      time: "00::12:22",
    },
    {
      id: 2,
      username: "Someon",
      campaign: "Credit Card",
      state: "On Call",
      time: "00::12:22",
    },
  ];

  return (
    <div className="table-responsive table-card mt-3 mb-1">
      <div
        className="d-flex align-items-center"
        style={{ marginBottom: " 10px" }}
      >
        <div
          className="d-flex align-items-center"
          style={{ gap: "10px", width: "50%" }}
        >
          <Input placeholder="Search Agent Name" style={{ flex: 1 }} />

          <Select
            value={selectedSingle}
            onChange={() => {
              handleSelectSingle();
            }}
            options={SingleOptions}
            placeholder="Select Status"
            style={{ flex: 1 }}
          />
        </div>

        <div className="d-flex" style={{ gap: "5px", marginLeft: "auto" }}>
          <Button color="success" className="btn-sm">
            <FeatherIcon
              icon="search"
              className="icon-dual"
              style={{ color: "white" }}
            />
          </Button>
          <Button color="danger" className="btn-sm">
            <FeatherIcon
              icon="log-out"
              className="icon-dual"
              style={{ color: "white" }}
            />
          </Button>
          <Button color="info" className="btn-sm">
            <FeatherIcon
              icon="mail"
              className="icon-dual"
              style={{ color: "white" }}
            />
          </Button>
          <Button color="warning" className="btn-sm">
            <FeatherIcon
              icon="maximize-2"
              className="icon-dual"
              style={{ color: "white" }}
            />
          </Button>
        </div>
      </div>

      <table className="table align-middle table-nowrap" id="customerTable">
        <thead className="table-light">
          <tr>
            <th scope="col" style={{ width: "50px" }}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="checkAll"
                  value="option"
                />
              </div>
            </th>
            <th className="sort" data-sort="agent_name">
              Agent Name
            </th>
            <th className="sort" data-sort="campaigns">
              Campaigns
            </th>
            <th className="sort" data-sort="state">
              State
            </th>
            <th className="sort" data-sort="time">
              Time
            </th>

            <th className="sort" data-sort="action">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="list form-check-all">
          {usersData?.map((user) => (
            <tr key={user?.id}>
              <th scope="row">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="checkAll"
                    value="option1"
                  />
                </div>
              </th>
              <td className="campaign-name">{user.username}</td>
              <td className="campaign-description">{user.campaign}</td>
              <td className="campaign-callback">
                <span class="badge border border-success text-success">
                  {" "}
                  {user.state}
                </span>
              </td>
              <td className="campaign-dnc">{user.time}</td>
              <td>
                <UncontrolledDropdown
                  direction="left"
                  style={{ position: "absolute", zIndex: "999999" }}
                >
                  <DropdownToggle
                    tag="button"
                    className="btn btn-primary btn-sm"
                  >
                    <span className="text-uppercase">
                      Action
                      <i className="mdi mdi-chevron-down align-middle ms-1"></i>
                    </span>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu dropdown-menu-end">
                    <DropdownItem
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <FeatherIcon icon="log-out" className="icon-dual" />
                      <span className="text-muted fw-bold">Log-out</span>
                    </DropdownItem>
                    <DropdownItem
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <FeatherIcon icon="phone-off" className="icon-dual" />
                      <span className="text-muted fw-bold">Hangup</span>
                    </DropdownItem>
                    <DropdownItem
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <FeatherIcon icon="repeat" className="icon-dual" />
                      <span className="text-muted fw-bold">Transfer</span>
                    </DropdownItem>
                    <DropdownItem
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <FeatherIcon
                        icon="phone-forwarded"
                        className="icon-dual"
                      />
                      <span className="text-muted fw-bold">Eavesdrop</span>
                    </DropdownItem>
                    <DropdownItem
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <FeatherIcon icon="users" className="icon-dual" />
                      <span className="text-muted fw-bold">Conference</span>
                    </DropdownItem>
                    <DropdownItem
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <FeatherIcon icon="volume-1" className="icon-dual" />
                      <span className="text-muted fw-bold">Whisper</span>
                    </DropdownItem>
                    <DropdownItem
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <FeatherIcon icon="video" className="icon-dual" />
                      <span className="text-muted fw-bold">
                        Call Screen Recording
                      </span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeamStatus;
