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
import { getMonitoringData } from "../../slices/UserStatus/thunk";
import { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";

function SearchRecordingFilters({ tog_backdrop }) {
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [campaignUsersOptions, setCampaignUsersOptions] = useState([]);
  const [isSelectCampaignsDropdownOpen, setIsSelectCampaignsDropdownOpen] =
    useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const { campaigns } = useSelector((state) => state.Campaigns);
  const { campaignUsers } = useSelector((state) => state.Monitoring);

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
      console.log("user after on change ->", user);
      setUsers((prev) => [...prev, user]);
      setSelectedUsers((prev) => [...prev, user.userId]);
    }
  }

  console.log("campaignUsersOptions ->", campaignUsers);

  useEffect(() => {
    setCampaignUsersOptions(campaignUsers);
  }, [campaignUsers]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getMonitoringData(selectedCampaigns));
    setIsSelectCampaignsDropdownOpen(false);
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
        {/* <button
          type="button"
          className="btn btn-primary waves-effect waves-light"
        >
          <i className="ri-search-line align-middle me-1"></i>
          Search{" "}
        </button> */}
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
            <th className="sort" data-sort="agent-name">
              Agent Name
            </th>
            <th className="sort" data-sort="campaign-name">
              Campaign Name
            </th>
            <th className="sort" data-sort="call-duration">
              Call Duration
            </th>
            <th className="sort" data-sort="play">
              Play
            </th>
          </tr>
        </thead>
        <tbody className="list form-check-all">
          {users?.map((user, key) => (
            <tr key={key}>
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
              <td className="agent-name">{user?.name}</td>
              <td className="campaign-name">
                {" "}
                {user.campaignName?.map((campaign) => (
                  <span
                    className="badge bg-primary"
                    style={{ marginRight: "2px" }}
                  >
                    {campaign}
                  </span>
                ))}
              </td>

              <td className="call-duration">00:12:53</td>

              <td className="play">
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                  onClick={() => tog_backdrop()}
                >
                  <FeatherIcon
                    icon="play"
                    className="icon-dual"
                    style={{ color: "white" }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchRecordingFilters;
