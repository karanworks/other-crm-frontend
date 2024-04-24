import {
  Button,
  ButtonGroup,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getCampaigns } from "../../slices/Campaigns/thunk";
import { useEffect, useState } from "react";
import { loginHistoryData } from "../../slices/LoginHistory/thunk";
import { functionalUpdate } from "@tanstack/react-table";

function LoginHistoryFilter() {
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [campaignUsersOptions, setCampaignUsersOptions] = useState([]);
  const [isSelectCampaignsDropdownOpen, setIsSelectCampaignsDropdownOpen] =
    useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const { campaigns } = useSelector((state) => state.Campaigns);
  const { campaignUsers } = useSelector((state) => state.LoginHistory);

  // console.log("campaign users in login history ->", campaignUsers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCampaigns());
  }, [dispatch]);

  function handleAddCampaign(campaignId) {
    const alreadyIncluded = selectedCampaigns.includes(campaignId);

    if (alreadyIncluded) {
      const updatedCampaigns = selectedCampaigns.filter(
        (singleCampaignId) => singleCampaignId !== campaignId
      );
      setSelectedCampaigns(updatedCampaigns);
    } else {
      setSelectedCampaigns((prev) => [...prev, campaignId]);
    }
  }

  function handleAddUser(user) {
    console.log("user in handle change", user);
    const alreadyIncluded = selectedUsers.includes(user.userId);

    if (alreadyIncluded) {
      const filteredUsers = users.filter((u) => {
        return u.userId !== user.userId;
      });

      setUsers(filteredUsers);
      setSelectedUsers(
        selectedUsers.filter((userId) => userId !== user.userId)
      );
    } else {
      setUsers((prev) => [...prev, user]);
      setSelectedUsers((prev) => [...prev, user.userId]);
    }
  }

  useEffect(() => {
    setCampaignUsersOptions(campaignUsers);
  }, [campaignUsers]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginHistoryData(selectedCampaigns));
    setIsSelectCampaignsDropdownOpen(false);
  }

  function handleTime(dateTime) {
    const time = new Date(dateTime);

    const hour = time.getHours() % 12 || 12; // Convert hour to 12-hour format
    const minute = time.getMinutes().toString().padStart(2, "0"); // Add leading zero if singular
    const second = time.getSeconds().toString().padStart(2, "0"); // Add leading zero if singular
    const period = time.getHours() < 12 ? "AM" : "PM"; // Determine AM or PM

    return (
      hour.toString().padStart(2, "0") +
      " : " +
      minute +
      " : " +
      second +
      " " +
      period
    );
  }

  function handleDate(dateTime) {
    const time = new Date(dateTime);

    return (
      time.getDate().toString().padStart(2, "0") +
      " - " +
      (time.getMonth() + 1).toString().padStart(2, "0") +
      " - " +
      time.getFullYear()
    );
  }

  const usersData = [
    {
      id: 1,
      username: "Karan",
      other_id: "723498",
      campaign: "Credit Card",
      mode: "Manual",
      duration: "00:12:22",
      status: "Ready",
      cust_phone: "927834988",
      did_tfn: "1982734",
      talk_time: "00:12:22",
    },
    {
      id: 2,
      username: "Someone",
      other_id: "723498",
      campaign: "Credit Card",
      mode: "Manual",
      duration: "00:12:22",
      status: "Ready",
      cust_phone: "927834988",
      did_tfn: "1982734",
      talk_time: "00:12:22",
    },
    {
      id: 3,
      username: "Someone 2",
      other_id: "723498",
      campaign: "Credit Card",
      mode: "Manual",
      duration: "00:12:22",
      status: "Ready",
      cust_phone: "927834988",
      did_tfn: "1982734",
      talk_time: "00:12:22",
    },
  ];

  return (
    // removed the "table-responsive" because it was restricting the table's height
    <div className="table-card mt-3 mb-1">
      <div
        className="d-flex align-items-center"
        style={{ marginBottom: " 10px" }}
      >
        <div
          className="d-flex align-items-center"
          style={{ gap: "10px", width: "50%" }}
        >
          <ButtonGroup>
            <UncontrolledDropdown
              isOpen={isSelectCampaignsDropdownOpen}
              toggle={() =>
                setIsSelectCampaignsDropdownOpen(!isSelectCampaignsDropdownOpen)
              }
            >
              <DropdownToggle tag="button" className="btn btn-light">
                Select Campaigns <i className="mdi mdi-chevron-down"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-sm p-2">
                <form onSubmit={handleSubmit}>
                  {campaigns?.map((campaign) => (
                    <div className="mb-2" key={campaign.id}>
                      <div className="form-check custom-checkbox">
                        <Input
                          type="checkbox"
                          checked={selectedCampaigns.includes(campaign.id)}
                          className="form-check-input"
                          id={campaign.campaignName}
                          name={campaign.campaignName}
                          onChange={() => handleAddCampaign(campaign.id)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={campaign.campaignName}
                        >
                          {campaign.campaignName}
                        </label>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="submit"
                    color="primary"
                    className="btn-sm btn-primary"
                  >
                    Submit
                  </Button>
                </form>
              </DropdownMenu>
            </UncontrolledDropdown>
          </ButtonGroup>
          <ButtonGroup>
            <UncontrolledDropdown>
              <DropdownToggle tag="button" className="btn btn-light">
                Select Users <i className="mdi mdi-chevron-down"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-sm p-2">
                <form>
                  {campaignUsersOptions?.map((userOption) => (
                    <div className="mb-2" key={userOption.userId}>
                      <div className="form-check custom-checkbox">
                        <Input
                          type="checkbox"
                          checked={selectedUsers.includes(userOption.userId)}
                          className="form-check-input"
                          id={userOption.name}
                          name={userOption.name}
                          onChange={() => handleAddUser(userOption)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={userOption.name}
                        >
                          {userOption.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </form>
              </DropdownMenu>
            </UncontrolledDropdown>
          </ButtonGroup>
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
              Campaign
            </th>
            <th className="sort" data-sort="action">
              Currently Logged In
            </th>
            <th className="sort" data-sort="state">
              Login Time
            </th>
            <th className="sort" data-sort="time">
              Logout Time
            </th>
          </tr>
        </thead>
        <tbody className="list form-check-all">
          {users?.map((user) => (
            <tr key={user?.userId}>
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
              <td className="campaign-name">{user.name}</td>
              <td className="campaign-description ">
                {" "}
                {user.campaignName?.map((campaign, index) => (
                  <span
                    key={index}
                    className="badge bg-primary"
                    style={{ marginRight: "2px" }}
                  >
                    {campaign}
                  </span>
                ))}
              </td>
              <td className="campaign-dnc">
                {" "}
                <span
                  className={`badge  ${
                    user?.logoutTime
                      ? "bg-danger"
                      : user?.loginTime
                      ? "bg-success"
                      : "bg-danger"
                  } `}
                >
                  {" "}
                  {user?.logoutTime ? "No" : user?.loginTime ? "Yes" : "No"}
                </span>
              </td>
              <td className="campaign-callback">
                {user?.loginTime ? (
                  <>
                    <p style={{ marginBottom: "2px" }}>
                      <span className="badge bg-dark">
                        {handleTime(user?.loginTime)}
                      </span>
                    </p>
                    <p style={{ marginBottom: "2px" }}>
                      <span className="badge bg-dark">
                        {handleDate(user?.loginTime)}
                      </span>
                    </p>
                  </>
                ) : (
                  <span style={{ fontWeight: "bold" }}>- -</span>
                )}
              </td>
              <td className="campaign-dnc">
                {user?.logoutTime ? (
                  <>
                    <p style={{ marginBottom: "2px" }}>
                      <span className="badge bg-dark">
                        {handleTime(user?.logoutTime)}
                      </span>
                    </p>
                    <p style={{ marginBottom: "2px" }}>
                      <span className="badge bg-dark">
                        {handleDate(user?.logoutTime)}
                      </span>
                    </p>
                  </>
                ) : (
                  <span style={{ fontWeight: "bold" }}>- -</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LoginHistoryFilter;
