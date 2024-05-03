import { Button } from "reactstrap";

const DesignDialpad = ({ tog_list }) => {
  function handleNumber() {
    tog_list();
  }

  return (
    <div className="dialpad-container " style={{ width: "180px" }}>
      <div className="d-flex flex-column">
        <div className="dialpad-controls">
          <div className="dialpad-keys-row-container">
            <div className="dialpad-key-row d-flex justify-content-between">
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber()}
                >
                  <span>1</span>
                </Button>
              </div>
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4 d-flex flex-column justify-content-center align-items-center"
                  onClick={() => handleNumber()}
                >
                  <span>2</span>
                </Button>
              </div>
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber()}
                >
                  <span>3</span>
                </Button>
              </div>
            </div>
            <div className="dialpad-key-row d-flex justify-content-between">
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber()}
                >
                  <span>4</span>
                </Button>
              </div>
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber()}
                >
                  <span>5</span>
                </Button>
              </div>
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber()}
                >
                  <span>6</span>
                </Button>
              </div>
            </div>
            <div className="dialpad-key-row d-flex justify-content-between">
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber()}
                >
                  <span>7</span>
                </Button>
              </div>
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber()}
                >
                  <span>8</span>
                </Button>
              </div>
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber()}
                >
                  <span>9</span>
                </Button>
              </div>
            </div>
            <div className="dialpad-key-row d-flex justify-content-between">
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber()}
                >
                  <span>*</span>
                </Button>
              </div>
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber()}
                >
                  <span>0</span>
                </Button>
              </div>
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber()}
                >
                  <span>#</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignDialpad;
