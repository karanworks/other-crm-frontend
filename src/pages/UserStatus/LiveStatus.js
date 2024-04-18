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
import { getMonitoringData } from "../../slices/Monitoring/thunk";
import { useEffect, useState } from "react";

function LiveStatus() {
  const [campaignUsersOptions, setCampaignUsersOptions] = useState([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [users, setUsers] = useState([]);

  const { campaigns } = useSelector((state) => state.Campaigns);
  const { campaignUsers } = useSelector((state) => state.Monitoring);

  const dispatch = useDispatch();

  console.log("all the users inside monitoring ->", campaignUsers);

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
    const alreadyExists = users.find((u) => {
      return u.id === user.id;
    });

    if (alreadyExists) {
      const filteredUsers = users.filter((u) => {
        return u.id !== user.id;
      });

      setUsers(filteredUsers);
    } else {
      setUsers((prev) => [...prev, user]);
    }
  }

  useEffect(() => {
    setCampaignUsersOptions(campaignUsers);
  }, [campaignUsers]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(selectedCampaigns);
    dispatch(getMonitoringData(selectedCampaigns));
    console.log("campaign users after list submit ->", campaignUsers);
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
    <div className="table-responsive table-card mt-3 mb-1">
      <div
        className="d-flex align-items-center"
        style={{ marginBottom: " 10px" }}
      >
        <div
          className="d-flex align-items-center"
          style={{ gap: "10px", width: "50%" }}
        >
          <ButtonGroup>
            <UncontrolledDropdown>
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
                    <div className="mb-2" key={userOption.id}>
                      <div className="form-check custom-checkbox">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          id="rememberdropdownCheck3"
                          name="rememberdropdownCheck3"
                          onChange={() => handleAddUser(userOption)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="rememberdropdownCheck3"
                        >
                          {userOption.name}
                        </label>
                      </div>
                    </div>
                  ))}

                  {/* <div className="mb-2">
                    <div className="form-check custom-checkbox">
                      <Input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberdropdownCheck3"
                        name="rememberdropdownCheck3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="rememberdropdownCheck3"
                      >
                        User One
                      </label>
                    </div>
                  </div> */}
                  {/* <div className="mb-2">
                    <div className="form-check custom-checkbox">
                      <Input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberdropdownCheck4"
                        name="rememberdropdownCheck4"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="rememberdropdownCheck4"
                      >
                        User Two
                      </label>
                    </div>
                  </div> */}
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
              Id
            </th>
            <th className="sort" data-sort="campaigns">
              Campaign
            </th>
            <th className="sort" data-sort="state">
              Mode
            </th>
            <th className="sort" data-sort="time">
              Duration
            </th>

            <th className="sort" data-sort="action">
              Status
            </th>
            <th className="sort" data-sort="action">
              Cust Phone
            </th>
            <th className="sort" data-sort="action">
              DID/TFN
            </th>
            <th className="sort" data-sort="action">
              Talk Time
            </th>
          </tr>
        </thead>
        <tbody className="list form-check-all">
          {users?.map((user) => (
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
              <td className="campaign-name">{user.name}</td>
              <td className="campaign-description">9827348</td>
              <td className="campaign-description ">
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
              <td className="campaign-callback">
                <span className="badge bg-danger"> Manual</span>
              </td>
              <td className="campaign-dnc">00:12:53</td>
              <td className="campaign-dnc">
                {" "}
                <span className="badge bg-success"> Ready</span>
              </td>
              <td className="campaign-dnc"> 9982837483 {user.cust_phone}</td>
              <td className="campaign-dnc">127878333</td>
              <td className="campaign-dnc">00:12:53</td>
              {/* <td className="campaign-name">{user.username}</td>
              <td className="campaign-description">{user.other_id}</td>
              <td className="campaign-description">
                {" "}
                <span className="badge bg-primary"> {user.campaign}</span>
              </td>
              <td className="campaign-callback">
                <span className="badge bg-danger"> {user.mode}</span>
              </td>
              <td className="campaign-dnc">{user.duration}</td>
              <td className="campaign-dnc">
                {" "}
                <span className="badge bg-success"> {user.status}</span>
              </td>
              <td className="campaign-dnc">{user.cust_phone}</td>
              <td className="campaign-dnc">{user.did_tfn}</td>
              <td className="campaign-dnc">{user.talk_time}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LiveStatus;
