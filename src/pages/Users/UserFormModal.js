import {
  Alert,
  Input,
  Label,
  Form,
  FormFeedback,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";

function UserFormModal({
  modal_list, // modal state
  tog_list, // to change modal state
  formHandleSubmit, // submit function for form
  validation, // to get the values from formik
  isEditingUser, // state of whether we are editing the user or not, if we are editing the user then form fields will have the values of that user
  isAlreadyRegisteredError, // gives error if user already registered with same - id, crmEmail, agentMobile
  handleRoleChange,
}) {
  const rolesTempData = ["Admin", "Branch Manager", "Manager", "Team Leader"];

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
        Add User
      </ModalHeader>
      <Form
        className="tablelist-form"
        onSubmit={(e) => formHandleSubmit(e, validation.userId)}
      >
        <ModalBody style={{ paddingTop: "0px" }}>
          {isAlreadyRegisteredError && (
            <Alert color="danger" style={{ marginBlock: "5px" }}>
              {isAlreadyRegisteredError}
            </Alert>
          )}
          <div className="mb-2">
            <Label htmlFor="userId" className="form-label">
              User Id
            </Label>

            <Input
              id="userId"
              name="userId"
              className="form-control"
              placeholder="Enter User Id"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.userId || ""}
              invalid={
                validation.touched.userId && validation.errors.userId
                  ? true
                  : false
              }
            />

            {validation.touched.userId && validation.errors.userId ? (
              <FormFeedback type="invalid">
                {validation.errors.userId}
              </FormFeedback>
            ) : null}
          </div>
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
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.name || ""}
              invalid={
                validation.touched.name && validation.errors.name ? true : false
              }
            />

            {validation.touched.name && validation.errors.name ? (
              <FormFeedback type="invalid">
                {validation.errors.name}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="role" className="form-label">
              Select Role
            </Label>
            <Input
              id="role"
              name="role"
              className="form-control"
              type="select"
              onChange={handleRoleChange}
              onBlur={validation.handleBlur}
              value={validation.values.role || ""}
              invalid={
                validation.touched.role && validation.errors.role ? true : false
              }
            >
              <option value="" disabled>
                Select Role
              </option>

              {rolesTempData?.map((role) => (
                <option value={role} key={role}>
                  {role}
                </option>
              ))}
            </Input>

            {validation.touched.role && validation.errors.role ? (
              <FormFeedback type="invalid">
                {validation.errors.role}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="crmEmail" className="form-label">
              CRM Email
            </Label>

            <Input
              id="crmEmail"
              name="crmEmail"
              className="form-control"
              placeholder="Enter CRM Email"
              type="email"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.crmEmail || ""}
              invalid={
                validation.touched.crmEmail && validation.errors.crmEmail
                  ? true
                  : false
              }
            />

            {validation.touched.crmEmail && validation.errors.crmEmail ? (
              <FormFeedback type="invalid">
                {validation.errors.crmEmail}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="crmPassword" className="form-label">
              CRM Password
            </Label>

            <Input
              id="crmPassword"
              name="crmPassword"
              className="form-control"
              placeholder="Enter CRM Password"
              type="password"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.crmPassword || ""}
              invalid={
                validation.touched.crmPassword && validation.errors.crmPassword
                  ? true
                  : false
              }
            />

            {validation.touched.crmPassword && validation.errors.crmPassword ? (
              <FormFeedback type="invalid">
                {validation.errors.crmPassword}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="agentMobile" className="form-label">
              Agent Mobile
            </Label>

            <Input
              id="agentMobile"
              name="agentMobile"
              className="form-control"
              placeholder="Enter Agent Mobile"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.agentMobile || ""}
              invalid={
                validation.touched.agentMobile && validation.errors.agentMobile
                  ? true
                  : false
              }
            />

            {validation.touched.agentMobile && validation.errors.agentMobile ? (
              <FormFeedback type="invalid">
                {validation.errors.agentMobile}
              </FormFeedback>
            ) : null}
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {isEditingUser ? "Update User" : "Save User"}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default UserFormModal;
