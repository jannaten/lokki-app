import React from "react";

const FormInput = ({
  id,
  type,
  name,
  onChange,
  placeholder,
  defaultValue,
  ...rest
}) => (
  <input
    id={id}
    name={name}
    type={type}
    onChange={onChange}
    className="form-control"
    placeholder={placeholder}
    defaultValue={defaultValue}
    {...rest}
  />
);

export default FormInput;
