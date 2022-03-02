import React from "react";
import ButtonStyle from "../styles";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const AddButton = ({ children, onClick, ...rest }) => (
  <button type="button" className="btn btn-primary" onClick={onClick} {...rest}>
    {children}
  </button>
);

export const Edit = ({ text }) => (
  <button data-modal-size="lg" className="btn btn-sm btn-dark btn-edit-row">
    <div style={{ display: "flex" }}>
      <i className="fa fa-pencil p-1 mr-1"></i>
      {text}
    </div>
  </button>
);

export const toggleButton = ({ onClick, value, ...rest }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed="true"
    data-toggle="button"
    className="btn active btn-outline-dark"
    {...rest}
  >
    {value}
  </button>
);

export const NavButton = ({ children }) => (
  <button
    type="button"
    aria-haspopup="true"
    aria-expanded="false"
    data-toggle="dropdown"
    id="dropdownMenuButton"
    aria-label="Change Product"
    className="btn btn-dark dropdown-toggle row-dropdown"
  >
    {children}
  </button>
);

export const CancelButton = ({ children, onClick }) => (
  <Button onClick={onClick} variant="light">
    {children}
  </Button>
);

export const SubmitButton = ({ children, onClick, disabled }) => (
  <Button variant="primary" type="submit" onClick={onClick} disabled={disabled}>
    {children}
  </Button>
);

export const XButton = ({ onClick }) => (
  <button
    type="button"
    className="close"
    data-dismiss="modal"
    aria-label="Close"
    onClick={onClick}
  >
    <span aria-hidden="true">&times;</span>
  </button>
);

export const CardButton = ({ productname, linkUrl, icon }) => (
  <div style={ButtonStyle.cardHolder} className="card">
    <Link to={linkUrl} className="card-body text-justify">
      <img src={icon} alt="" style={ButtonStyle.cardIcon} />
      <span>{productname}</span>
    </Link>
  </div>
);

export const BlankFieldButton = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    id="btn-only-blanks"
    data-toggle="button"
    aria-pressed="false"
    style={{
      display: "flex",
      fontSize: "0.8rem",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
    }}
    aria-label="List only keys with empty value field"
    className="btn btn-outline-dark btn-filter--only-empty btn-lg"
  >
    {children}
  </button>
);

export const SquareButton = ({ isShrink, onClick, text }) => (
  <button
    style={
      isShrink
        ? ButtonStyle.ifSquareButtonShrink
        : ButtonStyle.ifNotSquareButtonShrink
    }
    onClick={onClick}
    data-modal-size="lg"
    className="btn btn-sm btn-primary"
  >
    {text}
  </button>
);

export const AddProductButton = ({ onClick, text }) => (
  <Button onClick={onClick}>
    <strong>{text}</strong>
  </Button>
);

export const LogOutButton = ({ onClick, label }) => (
  <Button variant="outline-light" onClick={onClick}>
    {label}
  </Button>
);
