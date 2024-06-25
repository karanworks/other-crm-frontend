import {
  Input,
  Label,
  Form,
  FormFeedback,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import Flatpickr from "react-flatpickr";
import { useState } from "react";
import Select from "react-select";

function InvoiceModal({
  modal_list,
  tog_list,
  formHandleSubmit,
  validation,
  isEditingInvoice,
  clients,
}) {
  const [selectedSingleStatus, setSelectedSingleStatus] = useState(null);

  function handleSelectSingleStatus(selectedSingle) {
    setSelectedSingleStatus(selectedSingle);
  }

  let SingleStatusOptions = clients?.map((lead) => {
    return { value: lead.clientName, label: lead.clientName };
  });

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
        Create New Invoice
      </ModalHeader>
      <Form className="tablelist-form" onSubmit={(e) => formHandleSubmit(e)}>
        <ModalBody style={{ paddingTop: "0px" }}>
          <div className="mb-2">
            <Label htmlFor="clientName" className="form-label">
              Client Name
            </Label>
            <Select
              id="clientName"
              name="clientName"
              value={selectedSingleStatus}
              onChange={(clientName) => {
                handleSelectSingleStatus(clientName);
                validation.setFieldValue("clientName", clientName.value);
              }}
              options={SingleStatusOptions}
              placeholder="Select Client"
            />
          </div>
          <div className="mb-2">
            <Label htmlFor="totalAmount" className="form-label">
              Total Amount
            </Label>

            <Input
              id="totalAmount"
              name="totalAmount"
              className="form-control"
              placeholder="Enter total amount"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.totalAmount || ""}
              invalid={
                validation.touched.totalAmount && validation.errors.totalAmount
                  ? true
                  : false
              }
            />

            {validation.touched.totalAmount && validation.errors.totalAmount ? (
              <FormFeedback type="invalid">
                {validation.errors.totalAmount}
              </FormFeedback>
            ) : null}
          </div>
          {!isEditingInvoice && (
            <div className="mb-2 d-flex justify-content-between">
              <div>
                <Label htmlFor="paymentAmount" className="form-label">
                  Payment Amount
                </Label>

                <Input
                  id="paymentAmount"
                  name="paymentAmount"
                  className="form-control"
                  placeholder="Enter payment amount"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.paymentAmount || ""}
                  invalid={
                    validation.touched.paymentAmount &&
                    validation.errors.paymentAmount
                      ? true
                      : false
                  }
                />

                {validation.touched.paymentAmount &&
                validation.errors.paymentAmount ? (
                  <FormFeedback type="invalid">
                    {validation.errors.paymentAmount}
                  </FormFeedback>
                ) : null}
              </div>

              <div>
                <Label className="form-label">Payment Date</Label>
                <Flatpickr
                  className="form-control"
                  placeholder="Select Payment Date"
                  options={{
                    dateFormat: "d/m/Y",
                    defaultDate: validation.values.paymentDate || "",
                  }}
                  onChange={(date) => {
                    const formattedDate = new Date(date).toLocaleDateString(
                      "en-GB"
                    );
                    validation.setFieldValue("paymentDate", formattedDate);
                  }}
                />
              </div>
            </div>
          )}

          <div className="mb-3">
            <Label className="form-label">Payment Due Date</Label>
            <Flatpickr
              className="form-control"
              placeholder="Select payment due date"
              options={{
                dateFormat: "d M, Y",
              }}
              onChange={(date) => {
                const formattedDate = new Date(date).toLocaleDateString(
                  "en-GB"
                );
                validation.setFieldValue("paymentDueDate", formattedDate);
              }}
            />
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              {isEditingInvoice ? "Update Invoice" : "Save Invoice"}
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default InvoiceModal;
