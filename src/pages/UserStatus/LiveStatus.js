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
import { useEffect } from "react";

function LiveStatus() {
  const { campaigns } = useSelector((state) => state.Campaigns);

  const dispatch = useDispatch();

  console.log("campaigns inside live status", campaigns);

  useEffect(() => {
    dispatch(getCampaigns());
  }, [dispatch]);

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
                <form>
                  {campaigns?.map((campaign) => (
                    <div className="mb-2" key={campaign.id}>
                      <div className="form-check custom-checkbox">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          id={campaign.campaignName}
                          name={campaign.campaignName}
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

                  {/* <div className="mb-2">
                    <div className="form-check custom-checkbox">
                      <Input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberdropdownCheck"
                        name="rememberdropdownCheck"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="rememberdropdownCheck"
                      >
                        User One
                      </label>
                    </div>
                  </div> */}

                  <Button
                    type="submit"
                    color="primary"
                    className="btn-sm btn-primary"
                  >
                    Search
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
                  <div className="mb-2">
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
                  </div>
                  <div className="mb-2">
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
                  </div>
                  <Button
                    type="submit"
                    color="primary"
                    className="btn-sm btn-primary"
                  >
                    Search
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
              <td className="campaign-description">{user.other_id}</td>
              <td className="campaign-description">{user.campaign}</td>
              <td className="campaign-callback">
                <span className="badge border border-success text-success">
                  {" "}
                  {user.mode}
                </span>
              </td>
              <td className="campaign-dnc">{user.duration}</td>
              <td className="campaign-dnc">
                {" "}
                <span className="badge border border-success text-success">
                  {" "}
                  {user.status}
                </span>
              </td>
              <td className="campaign-dnc">{user.cust_phone}</td>
              <td className="campaign-dnc">{user.did_tfn}</td>
              <td className="campaign-dnc">{user.talk_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LiveStatus;
