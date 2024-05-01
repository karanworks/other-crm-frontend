import {
  Input,
  Label,
  Form,
  FormFeedback,
  Modal,
  ModalBody,
  ModalHeader,
  Alert,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";

function CreateNumberFormModal({
  modal_list,
  tog_list,
  handleNumberFormSubmit,
  numberValidation,
  isEditingNumber,
  alreadyExistsError,
}) {
  return (
    <Modal
      isOpen={modal_list}
      toggle={() => {
        tog_list();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          tog_list();
        }}
      >
        {isEditingNumber ? "Update Number" : "Create Number"}
      </ModalHeader>
      <Form
        className="tablelist-form"
        // onSubmit={(e) => {
        //   handleDispositionFormSubmit(
        //     e,
        //     dispositionFormValidation.dispositionName
        //   );
        // }}
        onSubmit={handleNumberFormSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <ModalBody style={{ paddingTop: "0px" }}>
          {alreadyExistsError && (
            <Alert color="danger" style={{ marginBlock: "10px" }}>
              {alreadyExistsError}
            </Alert>
          )}
          <div className="mb-2">
            <Label htmlFor="name" className="form-label">
              Name
            </Label>

            <Input
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              type="text"
              onChange={numberValidation.handleChange}
              onBlur={numberValidation.handleBlur}
              value={numberValidation.values.name || ""}
              invalid={
                numberValidation.touched.name && numberValidation.errors.name
                  ? true
                  : false
              }
            />

            {numberValidation.touched.name && numberValidation.errors.name ? (
              <FormFeedback type="invalid">
                {numberValidation.errors.name}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label htmlFor="number" className="form-label">
              Number
            </Label>

            <Input
              id="number"
              name="number"
              className="form-control"
              placeholder="Enter Number"
              type="number"
              onChange={numberValidation.handleChange}
              onBlur={numberValidation.handleBlur}
              value={numberValidation.values.number || ""}
              invalid={
                numberValidation.touched.number &&
                numberValidation.errors.number
                  ? true
                  : false
              }
            />

            {numberValidation.touched.number &&
            numberValidation.errors.number ? (
              <FormFeedback type="invalid">
                {numberValidation.errors.number}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="number" className="form-label">
              Department
            </Label>

            <Input
              id="department"
              name="department"
              className="form-control"
              placeholder="Enter Department"
              type="text"
              onChange={numberValidation.handleChange}
              onBlur={numberValidation.handleBlur}
              value={numberValidation.values.department || ""}
              invalid={
                numberValidation.touched.department &&
                numberValidation.errors.department
                  ? true
                  : false
              }
            />

            {numberValidation.touched.department &&
            numberValidation.errors.department ? (
              <FormFeedback type="invalid">
                {numberValidation.errors.department}
              </FormFeedback>
            ) : null}
          </div>

          {/* <button onClick={handleInputFocus}>Focus input</button> */}
          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {isEditingNumber ? "Update " : "Create "}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default CreateNumberFormModal;
