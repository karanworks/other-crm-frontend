function LiveData() {
  const crmWidgets = [
    {
      id: 1,
      label: "Live Calls",
      icon: "ri-base-station-line",
      counter: "19",
      decimals: 0,
      suffix: "",
      prefix: "",
    },
    {
      id: 2,
      label: "Ringing Calls",
      icon: "ri-music-2-line",
      counter: "79",
      decimals: 1,
      suffix: "k",
      prefix: "$",
    },
    {
      id: 3,
      label: "Waiting Call",
      icon: "ri-loader-2-line",
      counter: "32",
      decimals: 2,
      suffix: "%",
      prefix: "",
    },
    {
      id: 4,
      label: "Call in Message",
      icon: "ri-chat-3-line",
      counter: "15",
      decimals: 1,
      prefix: "$",
      separator: ",",
      suffix: "",
    },
    {
      id: 5,
      label: "Calls in IVR Menu",
      icon: "ri-robot-2-line",
      counter: "26",
      decimals: 0,
      separator: ",",
      suffix: "",
      prefix: "",
    },
    {
      id: 6,
      label: "Calls On Hold",
      icon: "ri-mic-off-line",
      counter: "29",
      decimals: 0,
      separator: ",",
      suffix: "",
      prefix: "",
    },
    {
      id: 7,
      label: "Logged-in Agents",
      icon: "ri-file-user-line",
      counter: "25",
      decimals: 0,
      separator: ",",
      suffix: "",
      prefix: "",
    },
    {
      id: 8,
      label: "Agents on Break",
      icon: "ri-rest-time-line",
      counter: "59",
      decimals: 0,
      separator: ",",
      suffix: "",
      prefix: "",
    },
    {
      id: 9,
      label: "Waiting Agents",
      icon: "ri-team-line",
      counter: "65",
      decimals: 0,
      separator: ",",
      suffix: "",
      prefix: "",
    },
    {
      id: 10,
      label: "Agents Auto Call Off",
      icon: "ri-phone-lock-line",
      counter: "9",
      decimals: 0,
      separator: ",",
      suffix: "",
      prefix: "",
    },
    {
      id: 11,
      label: "Agents on Call",
      icon: "ri-customer-service-2-line",
      counter: "21",
      decimals: 0,
      separator: ",",
      suffix: "",
      prefix: "",
    },
    {
      id: 12,
      label: "Agents on Wrapup",
      icon: "ri-smartphone-line",
      counter: "23",
      decimals: 0,
      separator: ",",
      suffix: "",
      prefix: "",
    },
  ];

  return (
    <div
      className="d-flex align-items-center row row-cols-md-6 row-cols-md-3 row-cols-1 g-0 flex-wrap"
      style={{ gap: "5px", padding: "10px", paddingLeft: "0" }}
    >
      {crmWidgets.map((widget, index) => (
        <div
          className="col"
          key={index}
          style={{
            border: "1px solid #e9ebec",
            width: "250px",
          }}
        >
          <div className="py-4 px-3">
            <h5 className="text-muted fs-15">{widget.label}</h5>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <i className={widget.icon + " display-6 text-muted"}></i>
              </div>
              <div className="flex-grow-1 ms-3">
                <h1 className="mb-0">
                  <span className="counter-value" data-target="197">
                    {widget.counter}
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LiveData;
