import { useState } from "react";
import { Button, Modal, ModalHeader } from "reactstrap";
import alertIcon from "./alert.png";

const UpdateActiveTimeModal = () => {
  const [modal_backdrop, setmodal_backdrop] = useState(true);
  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop);
  }

  return (
    <Modal
      isOpen={modal_backdrop}
      toggle={() => {
        tog_backdrop();
      }}
      backdrop={"static"}
      id="staticBackdrop"
      centered
    >
      <ModalHeader
        toggle={() => {
          tog_backdrop();
        }}
      ></ModalHeader>
      <div className="modal-body text-center p-5">
        <div>
          <img src={alertIcon} style={{ height: "100px", width: "100px" }} />
          <h1 className="mb-1 text-danger">Inactive Warning!</h1>
          <p className="text-muted mb-4">
            {" "}
            You have been inactive for some time.
          </p>
          <h4 className="text-muted mb-4">
            {" "}
            If you are active please click the button below, otherwise you will
            be logged out of the system.
          </h4>
        </div>

        <Button color="primary">Yes I am active!</Button>
      </div>
    </Modal>
  );
};

export default UpdateActiveTimeModal;
