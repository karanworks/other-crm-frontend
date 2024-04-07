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

function CRMFieldFormModal({
  modal_list, // modal state
  tog_list, // to change modal state
  crmFieldFormHandleSubmit, // submit function for form
  crmFieldValidation, // to get the values from formik
  isEditingCrmField, // state of whether we are editing the user or not, if we are editing the user then form fields will have the values of that user
  alreadyExistsError,
}) {
  console.log("alreadyExistsError in form modal ->", alreadyExistsError);

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
        {" "}
        Create Field{" "}
      </ModalHeader>
      <Form
        className="tablelist-form"
        onSubmit={(e) =>
          crmFieldFormHandleSubmit(e, crmFieldValidation.caption)
        }
      >
        <ModalBody style={{ paddingTop: "0px" }}>
          {alreadyExistsError && (
            <Alert color="danger" style={{ marginBlock: "10px" }}>
              {alreadyExistsError}
            </Alert>
          )}
          <div className="mb-2">
            <Label htmlFor="caption" className="form-label">
              Field Caption
            </Label>

            <Input
              id="caption"
              name="caption"
              className="form-control"
              placeholder="Enter field caption"
              type="text"
              onChange={crmFieldValidation.handleChange}
              onBlur={crmFieldValidation.handleBlur}
              value={crmFieldValidation.values.caption || ""}
              invalid={
                crmFieldValidation.touched.caption &&
                crmFieldValidation.errors.caption
                  ? true
                  : false
              }
            />

            {crmFieldValidation.touched.caption &&
            crmFieldValidation.errors.caption ? (
              <FormFeedback type="invalid">
                {crmFieldValidation.errors.caption}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="fieldType" className="form-label">
              Field Type
            </Label>
            <Input
              id="type"
              name="type"
              className="form-control"
              type="select"
              onChange={crmFieldValidation.handleChange}
              onBlur={crmFieldValidation.handleBlur}
              value={crmFieldValidation.values.type || ""}
              invalid={
                crmFieldValidation.touched.type &&
                crmFieldValidation.errors.type
                  ? true
                  : false
              }
            >
              <option value="" disabled>
                Select Field Type
              </option>
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
              <option value="radio">Radio</option>
              <option value="date">Date</option>
              <option value="checkbox">Checkbox</option>
            </Input>

            {crmFieldValidation.touched.type &&
            crmFieldValidation.errors.type ? (
              <FormFeedback type="invalid">
                {crmFieldValidation.errors.type}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label htmlFor="fieldRequired" className="form-label">
              Field Required
            </Label>
            <Input
              id="required"
              name="required"
              className="form-control"
              type="select"
              onChange={crmFieldValidation.handleChange}
              onBlur={crmFieldValidation.handleBlur}
              value={crmFieldValidation.values.required || ""}
              invalid={
                crmFieldValidation.touched.required &&
                crmFieldValidation.errors.required
                  ? true
                  : false
              }
            >
              <option value="" disabled>
                Select Field Read Only
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Input>

            {crmFieldValidation.touched.required &&
            crmFieldValidation.errors.required ? (
              <FormFeedback type="invalid">
                {crmFieldValidation.errors.required}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label htmlFor="fieldReadOnly" className="form-label">
              Field Read Only
            </Label>
            <Input
              id="readOnly"
              name="readOnly"
              className="form-control"
              type="select"
              onChange={crmFieldValidation.handleChange}
              onBlur={crmFieldValidation.handleBlur}
              value={crmFieldValidation.values.readOnly || ""}
              invalid={
                crmFieldValidation.touched.required &&
                crmFieldValidation.errors.readOnly
                  ? true
                  : false
              }
            >
              <option value="" disabled>
                Select Field Required
              </option>
              <option value="true">yes</option>
              <option value="false">No</option>
            </Input>

            {crmFieldValidation.touched.readOnly &&
            crmFieldValidation.errors.readOnly ? (
              <FormFeedback type="invalid">
                {crmFieldValidation.errors.readOnly}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="position" className="form-label">
              Position
            </Label>

            <Input
              id="position"
              name="position"
              className="form-control"
              placeholder="Enter field position"
              type="number"
              min={1}
              onChange={crmFieldValidation.handleChange}
              onBlur={crmFieldValidation.handleBlur}
              value={crmFieldValidation.values.position || ""}
              invalid={
                crmFieldValidation.touched.position &&
                crmFieldValidation.errors.position
                  ? true
                  : false
              }
            />

            {crmFieldValidation.touched.caption &&
            crmFieldValidation.errors.caption ? (
              <FormFeedback type="invalid">
                {crmFieldValidation.errors.caption}
              </FormFeedback>
            ) : null}
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {isEditingCrmField ? "Update Field" : "Create Field"}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default CRMFieldFormModal;
