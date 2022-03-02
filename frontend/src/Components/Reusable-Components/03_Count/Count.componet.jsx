import React from "react";

const Count = ({ title, count, addText }) => (
  <h2>
    <i className="fa fa-lg fa-globe"></i> {title} :{" "}
    <span className="row-count">{count}</span>
    {addText}
  </h2>
);

export default Count;
