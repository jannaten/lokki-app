import React from "react";
import HeadingStyle from "../styles";

const Heading = ({ heading }) => (
  <div className="row">
    <div className="col">
      <div style={{ marginBottom: "0" }} className="main-lead-container">
        <h1 style={HeadingStyle.headingHolder}>{heading}</h1>
      </div>
    </div>
  </div>
);

export default Heading;
