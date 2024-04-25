import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import FeatherIcon from "feather-icons-react";
import Select from "react-select";
import PlayRecordingModal from "./PlayRecordingModal";
import SearchRecordingFilters from "./SearchRecordingFilters";

const SearchRecording = () => {
  document.title = "Search Recording";

  const [selectedSingle, setSelectedSingle] = useState(null);
  const [modal_backdrop, setmodal_backdrop] = useState(false);

  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop);
  }

  const SingleOptions = [
    { value: "On Call", label: "On Call" },
    { value: "Break", label: "Break" },
  ];

  function handleSelectSingle(selectedSingle) {
    console.log("selected single ->", selectedSingle);
    setSelectedSingle(selectedSingle);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Search Recording" pageTitle="Analytics" />
          <Row>
            <Col xs={12}>
              {/* <div
                  className="d-flex align-items-center"
                  style={{ marginBottom: " 10px", gap: "10px" }}
                > */}
              {/* <Select
                    value={selectedSingle}
                    onChange={() => {
                      handleSelectSingle();
                    }}
                    options={SingleOptions}
                    placeholder="Select Campaign"
                  />
                  <Select
                    value={selectedSingle}
                    onChange={() => {
                      handleSelectSingle();
                    }}
                    options={SingleOptions}
                    placeholder="Select Disposition"
                    style={{ flex: 1 }}
                  /> */}
              <SearchRecordingFilters tog_backdrop={tog_backdrop} />
              {/* </div> */}

              {/* <table
                  className="table align-middle table-nowrap"
                  id="customerTable"
                >
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
                      <th className="sort" data-sort="campaign-name">
                        Campaign Name
                      </th>
                      <th className="sort" data-sort="agent-name">
                        Agent Name
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
                      <td className="campaign-name">Debit Card</td>
                      <td className="agent-name">Someone</td>

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
                  </tbody>
                </table> */}
            </Col>
          </Row>
        </Container>
      </div>
      <PlayRecordingModal
        modal_backdrop={modal_backdrop}
        setmodal_backdrop={setmodal_backdrop}
        tog_backdrop={tog_backdrop}
      />
    </React.Fragment>
  );
};

export default SearchRecording;
