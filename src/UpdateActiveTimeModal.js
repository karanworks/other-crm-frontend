import { useRef, useState } from "react";
import { Button, Modal, ModalHeader } from "reactstrap";
import alertIcon from "./alert.png";
import { updateSession } from "./helpers/fakebackend_helper";

const UpdateActiveTimeModal = ({
  modalVisible,
  tog_modal,
  handleUpdateSession,
}) => {
  return (
    <Modal
      isOpen={modalVisible}
      toggle={tog_modal}
      backdrop={"static"}
      id="staticBackdrop"
      centered
    >
      <ModalHeader toggle={tog_modal}></ModalHeader>
      <div className="modal-body text-center p-5">
        <div>
          <img src={alertIcon} style={{ height: "100px", width: "100px" }} />
          <h1 className="mb-1 text-danger">Inactive Warning!</h1>
          <p className="text-muted mb-4">
            {" "}
            You have been inactive for some time.
          </p>
          <h5 className="text-muted mb-4">
            {" "}
            If you are active please click the button below, otherwise you will
            be logged out.
          </h5>
        </div>

        {/* update session */}
        <Button color="primary" onClick={handleUpdateSession}>
          Yes I am active!
        </Button>
      </div>
    </Modal>
  );
};

export default UpdateActiveTimeModal;
