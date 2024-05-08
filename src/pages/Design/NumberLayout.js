import userIcon from "./user-icon.png";

function NumberLayout({ item }) {
  return (
    <td>
      <div>
        {item.number.map((number, idx) => (
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </td>
  );
}

export default NumberLayout;
