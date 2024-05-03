import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import IVRDesignDialpad from "./IVRDesignDialpad";
import IVRDesignModal from "./IVRDesignModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getDesign } from "../../slices/Design/thunk";

const Design = () => {
  const [modal_list, setmodal_list] = useState(false);
  const dispatch = useDispatch();
  const { designData } = useSelector((state) => state.Design);

  console.log("design data in component ->", designData);

  function tog_list() {
    setmodal_list(!modal_list);
  }

  const validation = useFormik({
    initialValues: {
      departmentName: "",
    },
    validationSchema: Yup.object({
      departmentName: Yup.string().required("Please enter department name"),
    }),
    onSubmit: (values) => {
      //   isEditingCampaign
      //     ? dispatch(updateCampaign({ values, listCampaignId }))
      //     : dispatch(createCampaign(values));

      console.log("form values ->", values);

      setmodal_list(false);
    },
  });

  function formHandleSubmit(e) {
    e.preventDefault();
    validation.handleSubmit();
    return false;
  }

  useEffect(() => {
    dispatch(getDesign());
  }, [dispatch]);

  document.title = "IVR Design";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="IVR Design" pageTitle="IVR Admin" />
          <Row>
            <Col xs={12}>
              <Card className="card-height-100">
                <CardHeader className="align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">
                    Create New IVR
                  </h4>
                </CardHeader>
                <CardBody className="p-0 d-flex align-items-start">
                  <div className="ivr-design-dialpad-container">
                    <IVRDesignDialpad tog_list={tog_list} />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      marginLeft: "30px",
                    }}
                  >
                    <table
                      className="table align-middle table-nowrap"
                      style={{ marginBottom: "0" }}
                    >
                      <thead className="table-light">
                        <tr>
                          <th scope="col" style={{ width: "50px" }}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkAll"
                                value="option"
                              />
                            </div>
                          </th>
                          <th className="sort" data-sort="first">
                            First IVR
                          </th>
                          <th className="sort" data-sort="second">
                            Second IVR
                          </th>
                          <th className="sort" data-sort="third">
                            Third IVR
                          </th>
                          <th className="sort" data-sort="fourth">
                            Fourth IVR
                          </th>
                        </tr>
                      </thead>
                      <tbody className="list form-check-all">
                        <tr>
                          <th scope="row">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="checkAll"
                                value="option1"
                              />
                            </div>
                          </th>
                          <td className="first">First</td>
                          <td className="second">Second</td>

                          <td className="third">Third</td>

                          <td className="fourth">Fourth</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <IVRDesignModal
        modal_list={modal_list}
        tog_list={tog_list}
        validation={validation}
        formHandleSubmit={formHandleSubmit}
      />
    </React.Fragment>
  );
};

export default Design;
