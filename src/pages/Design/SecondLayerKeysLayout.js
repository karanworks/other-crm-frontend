function SecondLayerKeysLayout({
  designItems,
  tog_list,
  setLayerId,
  number_tog_list,
}) {
  return (
    <td>
      <div className="d-flex flex-column" style={{ gap: "5px" }}>
        {designItems.map((item) =>
          !item.number ? (
            <div className="d-flex " style={{ gap: "10px" }} key={item.id}>
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
                <button
                  type="button"
                  className="d-flex justify-content-center align-items-center  btn btn-primary waves-effect waves-light"
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                  onClick={() => {
                    setLayerId(item.id);
                    tog_list();
                  }}
                >
                  <i className="ri-add-line"></i>
                </button>
                <button
                  type="button"
                  className="d-flex justify-content-center align-items-center  btn btn-success waves-effect waves-light"
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                  onClick={() => {
                    setLayerId(item.id);
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
                >
                  <i className="ri-delete-bin-2-line"></i>
                </button>
              </div>
            </div>
          ) : null
        )}
      </div>
    </td>
  );
}

export default SecondLayerKeysLayout;
