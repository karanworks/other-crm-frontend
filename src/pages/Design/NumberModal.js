import {
  Alert,
  Input,
  Label,
  Form,
  FormFeedback,
  Modal,
  ModalBody,
  ModalHeader,
  ButtonGroup,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { changeDepartment } from "../../slices/Design/reducer";
import { useDispatch } from "react-redux";
import userIcon from "./user-icon.png";
import { useState } from "react";

function NumberModal({
  number_modal_list, // modal state
  number_tog_list, // to change modal state
  numberFromHandleSubmit, // submit function for form
  numberValidation, // to get the values from formik
  alreadyExistsError,
  layerId,
  departments,
  departmentNumbers,
  handleAddNumber,
  selectedNumbers,
  handleAddAllNumbers,
}) {
  const [selectedSingle, setSelectedSingle] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);

  const dispatch = useDispatch();

  const keyOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "0", label: "0" },
    { value: "*", label: "*" },
    { value: "#", label: "#" },
  ];

  function handleSelectKey(selectedKey) {
    setSelectedKey(selectedKey);
  }

  const departmentOptions = departments?.map((department) => {
    return { value: department, label: department };
  });

  function handleSelectSingle(selectedSingle) {
    console.log("selected single ->", selectedSingle);
    setSelectedSingle(selectedSingle);
  }

  return (
    <Modal
      isOpen={number_modal_list}
      toggle={() => {
        number_tog_list();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          number_tog_list();
        }}
      >
        {" "}
        Add Number
      </ModalHeader>
      <Form
        className="tablelist-form"
        onSubmit={(e) => numberFromHandleSubmit(e)}
      >
        <ModalBody style={{ paddingTop: "0px" }}>
          {/* {alreadyExistsError && (
            <Alert color="danger" style={{ marginBlock: "10px" }}>
              {alreadyExistsError}
            </Alert>
          )} */}

          <div className="mb-2">
            <Label htmlFor="choices-single-default" className="form-label ">
              Key
            </Label>

            <Select
              value={selectedKey}
              onChange={(key) => {
                handleSelectKey(key);
                numberValidation.setFieldValue("key", key.value);
              }}
              onBlur={numberValidation.handleBlur}
              placeholder="Select Key"
              options={keyOptions}
            />
            {numberValidation.touched.key && numberValidation.errors.key ? (
              <FormFeedback type="invalid">
                {numberValidation.errors.key}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label htmlFor="choices-single-default" className="form-label ">
              Select Department
            </Label>

            <Select
              value={selectedSingle}
              onChange={(department) => {
                handleSelectSingle(department);
                dispatch(changeDepartment(department.value));
                numberValidation.setFieldValue("department", department.value);
              }}
              onBlur={numberValidation.handleBlur}
              invalid={
                numberValidation.touched.department &&
                numberValidation.errors.department
                  ? true
                  : false
              }
              placeholder="Select Department"
              options={departmentOptions}
            />
            {numberValidation.touched.department &&
            numberValidation.errors.department ? (
              <FormFeedback type="invalid">
                {numberValidation.errors.department}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-2">
            <Label className="form-label ">Select Number</Label>
            <div>
              <ButtonGroup>
                <UncontrolledDropdown>
                  <DropdownToggle
                    // tag="button"
                    className="btn text-muted"
                    style={{ background: "white", border: "1px solid #e8e6e6" }}
                  >
                    Select Numbers <i className="mdi mdi-chevron-down"></i>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-sm p-2 mt-1">
                    <div className="form-check custom-checkbox mb-2">
                      <Input
                        type="checkbox"
                        className="form-check-input"
                        id="selectAll"
                        name="selectAll"
                        checked={
                          departmentNumbers?.length === selectedNumbers.length
                        }
                        onChange={handleAddAllNumbers}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="selectAll"
                        style={{ marginLeft: "7px" }}
                      >
                        Select All
                      </label>
                    </div>
                    {departmentNumbers?.map((departmentNumber) => (
                      <div className="mb-2" key={departmentNumber.number}>
                        <div
                          className="form-check custom-checkbox d-flex align-items-center"
                          style={{ gap: "7px" }}
                        >
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            id={departmentNumber.number}
                            name={departmentNumber.number}
                            checked={selectedNumbers.some(
                              (num) => num.number === departmentNumber.number
                            )}
                            onChange={() => handleAddNumber(departmentNumber)}
                          />
                          <label
                            className="form-check-label d-flex align-items-center"
                            htmlFor={departmentNumber.number}
                          >
                            <div
                              className="d-flex align-items-center"
                              style={{
                                padding: "0",
                              }}
                            >
                              <img
                                src={userIcon}
                                alt=""
                                className="avatar-xs rounded-3 me-2"
                              />
                              <div>
                                <h5 className="fs-13 mb-0">
                                  {departmentNumber.name}
                                </h5>
                                <p className="fs-12 mb-0 text-muted">
                                  {departmentNumber.number}
                                </p>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    ))}
                    {/* <div className="mb-2">
                      <div className="form-check custom-checkbox">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          id="number"
                          name="number"
                          // onChange={() => {}}
                        />
                        <label className="form-check-label" htmlFor="number">
                          Number
                        </label>
                      </div>
                    </div> */}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </ButtonGroup>
            </div>
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Add Number
            </button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default NumberModal;
