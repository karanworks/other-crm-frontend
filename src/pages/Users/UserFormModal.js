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
import Select from "react-select";
import { useState } from "react";

function UserFormModal({
  modal_list, // modal state
  tog_list, // to change modal state
  formHandleSubmit, // submit function for form
  validation, // to get the values from formik
  isEditingUser, // state of whether we are editing the user or not, if we are editing the user then form fields will have the values of that user
  alreadyRegisteredError, // gives error if user already registered with same - id, email, agentMobile
  handleRoleChange,
  roles,
  selectedCampaigns,
  setSelectedCampaigns,
  campaignOptions,
}) {
  // function handleMulti(selectedMulti) {
  //   setselectedMulti(selectedMulti);
  // }

  const campaignsList = [
    { id: 1, campaignName: "Debit Card" },
    { id: 2, campaignName: "Credit Card" },
    { id: 3, campaignName: "Loan" },
  ];

  // const SingleOptions = [
  //   { value: "Choices 1", label: "Choices 1" },
  //   { value: "Choices 2", label: "Choices 2" },
  //   { value: "Choices 3", label: "Choices 3" },
  //   { value: "Choices 4", label: "Choices 4" },
  // ];

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
      <Form className="tablelist-form" onSubmit={(e) => formHandleSubmit(e)}>
        <ModalBody style={{ paddingTop: "0px" }}>
          {alreadyRegisteredError && (
            <Alert color="danger" style={{ marginBlock: "10px" }}>
              {alreadyRegisteredError}
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
            <Label htmlFor="roleId" className="form-label">
              Select Role
            </Label>
            <Input
              id="roleId"
              name="roleId"
              className="form-control"
              type="select"
              onChange={handleRoleChange}
              onBlur={validation.handleBlur}
              value={validation.values.roleId || ""}
              invalid={
                validation.touched.roleId && validation.errors.roleId
                  ? true
                  : false
              }
            >
              <option value="" disabled>
                Select Role
              </option>

              {roles?.map((role) => (
                <option value={role.id} key={role.id}>
                  {role.name}
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
            <Label htmlFor="email" className="form-label">
              CRM Email
            </Label>

            <Input
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter CRM Email"
              type="email"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.email || ""}
              invalid={
                validation.touched.email && validation.errors.email
                  ? true
                  : false
              }
            />

            {validation.touched.email && validation.errors.email ? (
              <FormFeedback type="invalid">
                {validation.errors.email}
              </FormFeedback>
            ) : null}
          </div>
          <div className="mb-2">
            <Label htmlFor="password" className="form-label">
              CRM Password
            </Label>

            <Input
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter CRM Password"
              type="password"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.password || ""}
              invalid={
                validation.touched.password && validation.errors.password
                  ? true
                  : false
              }
            />

            {validation.touched.password && validation.errors.password ? (
              <FormFeedback type="invalid">
                {validation.errors.password}
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
          <div className="mb-3">
            <Label htmlFor="agentMobile" className="form-label">
              Select campaigns
            </Label>

            <Select
              className={
                validation.touched.campaigns && !!validation.errors.campaigns
                  ? "is-invalid"
                  : ""
              }
              value={selectedCampaigns}
              isMulti={true}
              isClearable={true}
              onChange={(selectedOptions) => {
                setSelectedCampaigns(selectedOptions);
                validation.setFieldValue(
                  "campaigns",
                  selectedOptions.map((option) => option.value)
                );
                validation.setFieldTouched("campaigns", true);
              }}
              options={campaignOptions}
            />
            {validation.touched.campaigns && validation.errors.campaigns ? (
              <FormFeedback type="invalid">
                {validation.errors.campaigns}
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
