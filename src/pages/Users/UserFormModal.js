import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

function UserFormModal({
  modal_list,
  tog_list,
  formHandleSubmit,
  validation,
  isEditingUser,
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
        {" "}
        Add User{" "}
      </ModalHeader>
      <Form className="tablelist-form" onSubmit={formHandleSubmit}>
        <ModalBody style={{ paddingTop: "0px" }}>
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

            {/* 
              <input
                type="text"
                className="form-control"
                id="userId"
                placeholder="Enter user id"
              /> */}
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

            {/* <input
                type="name"
                className="form-control"
                id="name"
                placeholder="Enter user's name"
              /> */}
          </div>

          <div className="mb-2">
            <Label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </Label>

            <Input
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
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

            {/* <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter user's password"
              /> */}
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

            {/* <input
                type="text"
                className="form-control"
                id="crmEmail"
                placeholder="Enter CRM email"
              /> */}
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

            {/* <input
                type="text"
                className="form-control"
                id="crmPassword"
                placeholder="Enter CRM password"
              /> */}
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

            {/* 
              <input
                type="number"
                className="form-control"
                id="agentMobile"
                placeholder="Enter Agent Mobile Number"
              /> */}
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
