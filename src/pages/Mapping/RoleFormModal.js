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

function RoleFormModal({
  modal_list, // modal state
  tog_list, // to change modal state
  formHandleSubmit, // submit function for form
  roleValidation, // to get the values from formik
  editRole,
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
        Add Role
      </ModalHeader>
      <Form className="tablelist-form" onSubmit={(e) => formHandleSubmit(e)}>
        <ModalBody style={{ paddingTop: "0px" }}>
          <div className="mb-2">
            <Label htmlFor="name" className="form-label">
              Role Name
            </Label>

            <Input
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter Role Name"
              type="text"
              onChange={roleValidation.handleChange}
              onBlur={roleValidation.handleBlur}
              value={roleValidation.values.name || ""}
              invalid={
                roleValidation.touched.name && roleValidation.errors.name
                  ? true
                  : false
              }
            />

            {roleValidation.touched.name && roleValidation.errors.name ? (
              <FormFeedback type="invalid">
                {roleValidation.errors.name}
              </FormFeedback>
            ) : null}
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {editRole ? "Update Role Name" : "Add Role"}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default RoleFormModal;
