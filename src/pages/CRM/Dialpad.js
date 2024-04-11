import { Card, CardBody, CardHeader, Button } from "reactstrap";
import FeatherIcon from "feather-icons-react";
import userIcon from "./user-icon.gif";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const Dialpad = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [onCall, setOnCall] = useState(false);

  function handleMobileNumber(number) {
    setMobileNumber((prev) => prev + number);
  }

  function handleOnCallBtn() {
    setOnCall(!onCall);
  }

  function handleInputChange(e) {
    setMobileNumber(e.target.value);
  }

  function handleClearMobileNumber() {
    setMobileNumber("");
  }

  function toastHandler(info) {
    toast.info(info, {
      position: "bottom-center",
      autoClose: 5000,
      theme: "colored",
    });
  }

  return (
    <Card className="card-height-100">
      <CardHeader className="align-items-center d-flex">
        <h4 className="card-title mb-0 flex-grow-1">Dialpad</h4>
      </CardHeader>
      <CardBody
        className="p-0 d-flex justify-content-center"
        style={{ height: "330px" }}
      >
        <div className="dialpad-container " style={{ width: "180px" }}>
          {onCall ? (
            <div className="oncall-container d-flex align-items-center flex-column">
              <div className="oncall-header-container d-flex justify-content-center">
                <div className="d-flex align-items-center flex-column justify-content-center">
                  <div
                    className="user-icon-container d-flex justify-content-center align-items-center"
                    style={{
                      width: "60px",
                      height: "60px",
                      border: "2px solid #3caae5",
                      borderRadius: "50%",
                    }}
                  >
                    <img
                      src={userIcon}
                      style={{ width: "40px", height: "40px" }}
                    />
                  </div>

                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ marginTop: "10px" }}
                  >
                    <div>
                      <span
                        className="oncall-caller-name fs-3"
                        style={{ fontWeight: "bold", lineHeight: 1 }}
                      >
                        Karan
                      </span>
                    </div>
                    <div>
                      <span
                        className="oncall-caller-status text-muted"
                        style={{ lineHeight: 1 }}
                      >
                        Caling...
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="oncall-body-container d-flex flex-column"
                style={{ marginTop: "10px", gap: "10px" }}
              >
                <div
                  className="oncall-controls-row d-flex"
                  style={{ gap: "3px" }}
                >
                  <div>
                    <Button
                      color="primary"
                      className="btn-outline-primary oncall-control-btn"
                      onClick={() => toastHandler("Starting conference call")}
                    >
                      <FeatherIcon
                        icon="plus-circle"
                        className="icon-dual oncall-btn-icon"
                      />
                    </Button>
                  </div>
                  <div>
                    <Button
                      color="primary"
                      className="btn-outline-primary oncall-control-btn"
                      onClick={() => toastHandler("Call put on hold")}
                    >
                      <FeatherIcon
                        icon="pause-circle"
                        className="icon-dual oncall-btn-icon"
                      />
                    </Button>
                  </div>
                </div>
                <div
                  className="oncall-controls-row d-flex"
                  style={{ gap: "3px" }}
                >
                  <div>
                    <Button
                      color="primary"
                      className="btn-outline-primary oncall-control-btn"
                      onClick={() => toastHandler("Forwarding call")}
                    >
                      <FeatherIcon
                        icon="share"
                        className="icon-dual oncall-btn-icon"
                      />
                    </Button>
                  </div>
                  <div>
                    <Button
                      color="primary"
                      className="btn-outline-primary oncall-control-btn"
                      onClick={() => toastHandler("Call Muted")}
                    >
                      <FeatherIcon
                        icon="mic-off"
                        className="icon-dual oncall-btn-icon"
                      />
                    </Button>
                  </div>
                </div>
                <div className="dialpad-dial-key-container d-flex align-items-center justify-content-center">
                  <Button
                    className="dialpad-dial-key d-flex align-items-center justify-content-center rounded-circle"
                    color="danger"
                    onClick={handleOnCallBtn}
                  >
                    <FeatherIcon icon="phone" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column">
              <div
                className="dialpad-input-container d-flex align-items-end justify-content-end fs-3"
                style={{ height: "40px", paddingInline: "18px" }}
              >
                <div className="input-container d-flex align-items-center">
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={handleInputChange}
                    className="d-inline-block border-0"
                    style={{
                      lineHeight: "1",
                      width: "100%",
                      // caretColor: "transparent",
                    }}
                  />
                  {mobileNumber && (
                    <Button
                      color="danger"
                      className="btn-ghost-danger dialpad-mobile-number-delete-btn"
                      style={{ padding: "0" }}
                      onClick={handleClearMobileNumber}
                    >
                      <FeatherIcon icon="delete" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="dialpad-controls">
                <div className="dialpad-keys-row-container">
                  <div className="dialpad-key-row d-flex justify-content-between">
                    <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                      <Button
                        className="btn-ghost-dark fs-4"
                        onClick={() => handleMobileNumber("1")}
                      >
                        <span>1</span>
                      </Button>
                    </div>
                    <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                      <Button
                        className="btn-ghost-dark fs-4 d-flex flex-column justify-content-center align-items-center"
                        onClick={() => handleMobileNumber("2")}
                      >
                        <span>2</span>
                      </Button>
                    </div>
                    <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                      <Button
                        className="btn-ghost-dark fs-4"
                        onClick={() => handleMobileNumber("3")}
                      >
                        <span>3</span>
                      </Button>
                    </div>
                  </div>
                  <div className="dialpad-key-row d-flex justify-content-between">
                    <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                      <Button
                        className="btn-ghost-dark fs-4"
                        onClick={() => handleMobileNumber("4")}
                      >
                        <span>4</span>
                      </Button>
                    </div>
                    <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                      <Button
                        className="btn-ghost-dark fs-4"
                        onClick={() => handleMobileNumber("5")}
                      >
                        <span>5</span>
                      </Button>
                    </div>
                    <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                      <Button
                        className="btn-ghost-dark fs-4"
                        onClick={() => handleMobileNumber("6")}
                      >
                        <span>6</span>
                      </Button>
                    </div>
                  </div>
                  <div className="dialpad-key-row d-flex justify-content-between">
                    <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                      <Button
                        className="btn-ghost-dark fs-4"
                        onClick={() => handleMobileNumber("7")}
                      >
                        <span>7</span>
                      </Button>
                    </div>
                    <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                      <Button
                        className="btn-ghost-dark fs-4"
                        onClick={() => handleMobileNumber("8")}
                      >
                        <span>8</span>
                      </Button>
                    </div>
                    <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                      <Button
                        className="btn-ghost-dark fs-4"
                        onClick={() => handleMobileNumber("9")}
                      >
                        <span>9</span>
                      </Button>
                    </div>
                  </div>
                  <div className="dialpad-key-row d-flex justify-content-between">
                    <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                      <Button
                        className="btn-ghost-dark fs-4"
                        onClick={() => handleMobileNumber("*")}
                      >
                        <span>*</span>
                      </Button>
                    </div>
                    <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                      <Button
                        className="btn-ghost-dark fs-4"
                        onClick={() => handleMobileNumber("0")}
                      >
                        <span>0</span>
                      </Button>
                    </div>
                    <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                      <Button
                        className="btn-ghost-dark fs-4"
                        onClick={() => handleMobileNumber("#")}
                      >
                        <span>#</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="dialpad-dial-key-container d-flex align-items-center justify-content-center">
                  <Button
                    className="dialpad-dial-key d-flex align-items-center justify-content-center rounded-circle"
                    color="success"
                    onClick={handleOnCallBtn}
                  >
                    <FeatherIcon icon="phone" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardBody>
      <ToastContainer />
    </Card>
  );
};

export default Dialpad;
