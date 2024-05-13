import userIcon from "./user-icon.png";

function NumberLayout({ item, tog_delete, setListDesignId }) {
  console.log("NUMBER LAYOUT ITEMS ->", item);
  return (
    <td>
      <div>
        {/* {item.number.map((number, idx) => ( */}
        <div key={item.id}>
          <div
            className="d-flex align-items-center"
            key={item.number.number}
            style={{ padding: "0", marginTop: "5px" }}
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
              <h5 className="fs-15 mb-0">{item.number.name + " - "}</h5>
              <p className="fs-15 mb-0 "> {item.number.number}</p>

              <div className="d-flex" style={{ gap: "3px", marginLeft: "5px" }}>
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
                    setListDesignId(item.id);
                  }}
                >
                  <i className="ri-delete-bin-2-line"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>
    </td>
  );
}

export default NumberLayout;
