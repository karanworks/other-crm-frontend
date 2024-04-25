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
import Flatpickr from "react-flatpickr";
import Select from "react-select";

function CDRReportFilter() {
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [isSelectCampaignsDropdownOpen, setIsSelectCampaignsDropdownOpen] =
    useState(false);

  const { campaigns } = useSelector((state) => state.Campaigns);
  const [date, setDate] = useState(dateFormat());
  const [selectedSingle, setSelectedSingle] = useState(null);

  function dateFormat() {
    let d = new Date(),
      months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    return (
      d.getDate() +
      " " +
      months[d.getMonth()] +
      ", " +
      d.getFullYear()
    ).toString();
  }

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

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getMonitoringData(selectedCampaigns));
    setIsSelectCampaignsDropdownOpen(false);
  }

  const dateformate = (e) => {
    const date = e.toString().split(" ");
    const joinDate = (date[2] + " " + date[1] + ", " + date[3]).toString();
    setDate(joinDate);
  };

  const SingleOptions = [
    { value: "Choices 1", label: "Choices 1" },
    { value: "Choices 2", label: "Choices 2" },
    { value: "Choices 3", label: "Choices 3" },
    { value: "Choices 4", label: "Choices 4" },
  ];

  function handleSelectSingle(selectedSingle) {
    console.log("selected single ->", selectedSingle);
    setSelectedSingle(selectedSingle);
  }

  return (
    // removed the "table-responsive" because it was restricting the table's height
    <div className="table-responsive table-card mt-3 mb-1">
      <div
        className="d-flex align-items-center"
        style={{ marginBottom: " 10px" }}
      >
        <div className="d-flex align-items-center" style={{ gap: "10px" }}>
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
                Select Lead <i className="mdi mdi-chevron-down"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-sm p-2">
                <form>
                  <div className="mb-2">
                    <div className="form-check custom-checkbox">
                      <Input
                        type="checkbox"
                        className="form-check-input"
                        id="SelectLead"
                        name="SelectLead"
                      />
                      <label className="form-check-label" htmlFor="SelectLead">
                        ABC_001
                      </label>
                    </div>
                  </div>
                </form>
              </DropdownMenu>
            </UncontrolledDropdown>
          </ButtonGroup>
          <div>
            <Flatpickr
              name="fromDate"
              id="date-field"
              className="form-control"
              placeholder="From date"
              options={{
                altInput: true,
                altFormat: "d M, Y",
                dateFormat: "d M, Y",
              }}
              onChange={(e) => dateformate(e)}
              //   value={validation.values.dueDate || ""}
            />
          </div>
          <div>
            <Flatpickr
              name="toDate"
              id="date-field"
              className="form-control"
              placeholder="To date"
              options={{
                altInput: true,
                altFormat: "d M, Y",
                dateFormat: "d M, Y",
              }}
              onChange={(e) => dateformate(e)}
              //   value={validation.values.dueDate || ""}
            />
          </div>

          <div>
            <Button color="primary" className="search-btn me-1" id="search-btn">
              <i className="ri-search-line search-icon"> </i>
              Search
            </Button>
          </div>
          <div>
            <Button color="primary" className="me-1" id="download-btn">
              <i className="ri-download-line download-icon"> </i>
            </Button>
          </div>
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
              Campaign
            </th>
            <th className="sort" data-sort="action">
              Agent Name
            </th>
            <th className="sort" data-sort="action">
              Agent Id
            </th>

            <th className="sort" data-sort="campaigns">
              Lead Id
            </th>
            <th className="sort" data-sort="campaigns">
              Caller Id
            </th>
            <th className="sort" data-sort="state">
              Queue Name
            </th>
            <th className="sort" data-sort="time">
              Dialed Number
            </th>

            <th className="sort" data-sort="action">
              Call Type
            </th>
            <th className="sort" data-sort="action">
              Date Time
            </th>
            <th className="sort" data-sort="action">
              Extension/Phone
            </th>

            <th className="sort" data-sort="action">
              Pri/VoIP
            </th>
            <th className="sort" data-sort="action">
              Bill Sec
            </th>
            <th className="sort" data-sort="action">
              Dialer Disposition
            </th>
            <th className="sort" data-sort="action">
              Hangup Code
            </th>
            <th className="sort" data-sort="action">
              Hangup Description
            </th>
            <th className="sort" data-sort="action">
              Hangup By
            </th>
            <th className="sort" data-sort="action">
              Customer Id
            </th>
          </tr>
        </thead>
        <tbody className="list form-check-all">
          <tr>
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
            <td className="campaign-name">Koi to hai</td>
            <td className="campaign-description">9827348</td>
            <td className="campaign-description ">
              {" "}
              <span className="badge bg-primary" style={{ marginRight: "2px" }}>
                campaign name
              </span>
            </td>
            <td className="campaign-callback">
              <span className="badge bg-danger"> Manual</span>
            </td>
            <td className="campaign-dnc">00:12:53</td>
            <td className="campaign-dnc">
              {" "}
              <span className="badge bg-success"> Ready</span>
            </td>
            <td className="campaign-dnc"> 9982837483 </td>
            <td className="campaign-dnc">00:12:53</td>
            <td className="campaign-dnc">127878333</td>
            <td className="campaign-dnc">127878333</td>
            <td className="campaign-dnc">127878333</td>
            <td className="campaign-dnc">127878333</td>
            <td className="campaign-dnc">127878333</td>
            <td className="campaign-dnc">127878333</td>
            <td className="campaign-dnc">127878333</td>
            <td className="campaign-dnc">127878333</td>
            <td className="campaign-dnc">127878333</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CDRReportFilter;
