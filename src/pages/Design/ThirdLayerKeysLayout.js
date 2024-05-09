import userIcon from "./user-icon.png";

function ThirdLayerKeysLayout({
  items,
  parentKey,
  number_tog_list,
  setLayerId,
  tog_delete,
  setListDesignId,
}) {
  return (
    <div className="d-flex flex-column" style={{ gap: "10px" }}>
      {items && items.length !== 0 && (
        <div
          className="key-heading d-flex pb-2"
          style={{
            gap: "5px",
            borderBottom: "1px solid #8F92A0",
          }}
        >
          <span className="fw-bold">Key - </span>
          <div
            className="bg-secondary d-flex justify-content-center align-items-center rounded-2"
            style={{
              width: "25px",
              height: "25px",
              color: "white",
            }}
          >
            {parentKey}
          </div>
        </div>
      )}
      {items?.map(
        (item) =>
          !item.number && (
            <div className="single-key-info-container" key={item.id}>
              <div className="d-flex flex-column" style={{ gap: "5px" }}>
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "10px" }}
                >
                  <span>{item.audioText}</span>
                  <div
                    className="bg-primary-subtle d-flex justify-content-center align-items-center rounded-2"
                    style={{
                      width: "25px",
                      height: "25px",
                      border: "1px solid #32A6E4",
                    }}
                  >
                    {item.key}
                  </div>
                  <div className="d-flex" style={{ gap: "2px" }}>
                    {/* <button
                    type="button"
                    className="d-flex justify-content-center align-items-center  btn btn-primary waves-effect waves-light"
                    style={{
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <i className="ri-add-line"></i>
                  </button> */}
                    <button
                      type="button"
                      className="d-flex justify-content-center align-items-center  btn btn-success waves-effect waves-light"
                      style={{
                        width: "25px",
                        height: "25px",
                      }}
                      onClick={() => {
                        setLayerId(item?.id);
                        number_tog_list();
                      }}
                    >
                      <i className="ri-phone-line"></i>
                    </button>
                    <button
                      type="button"
                      className="d-flex justify-content-center align-items-center  btn btn-warning waves-effect waves-light"
                      style={{
                        width: "25px",
                        height: "25px",
                      }}
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      type="button"
                      className="d-flex justify-content-center align-items-center  btn btn-danger waves-effect waves-light"
                      style={{
                        width: "25px",
                        height: "25px",
                      }}
                      tog_delete={() => {
                        tog_delete();
                        setListDesignId(item.id);
                      }}
                    >
                      <i className="ri-delete-bin-2-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
      )}
      {items &&
        items.length !== 0 &&
        items?.map(
          (item) =>
            item.number &&
            item.number.length !== 0 &&
            item.number.map((number, idx) => (
              <div>
                <div key={idx}>
                  <div
                    className="d-flex align-items-center"
                    key={number.id}
                    style={{ padding: "0" }}
                  >
                    <img
                      src={userIcon}
                      alt=""
                      className="avatar-xs rounded-3 me-2"
                      style={{
                        width: "25px",
                        height: "25px",
                      }}
                    />
                    <div className="d-flex align-items-center">
                      <h5 className="fs-15 mb-0">{number.name + " - "}</h5>
                      <p className="fs-15 mb-0 "> {number.number}</p>
                      <div
                        className="d-flex"
                        style={{ gap: "3px", marginLeft: "5px" }}
                      >
                        <button
                          type="button"
                          className="d-flex justify-content-center align-items-center  btn btn-warning waves-effect waves-light"
                          style={{
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          type="button"
                          className="d-flex justify-content-center align-items-center  btn btn-danger waves-effect waves-light"
                          style={{
                            width: "25px",
                            height: "25px",
                          }}
                          onClick={() => {
                            tog_delete();
                            setListDesignId(number.id);
                          }}
                        >
                          <i className="ri-delete-bin-2-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
        )}
    </div>
  );
}
export default ThirdLayerKeysLayout;
