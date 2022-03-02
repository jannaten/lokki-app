import React from "react";
import ContainerStyles from "../styles";
import { Link, Switch } from "react-router-dom";

export const AppContainer = ({ children }) => <div>{children}</div>;

export const HeaderContainer = ({ children }) => (
  <div style={{ zIndex: 4 }}>{children}</div>
);

export const SwitchContainer = ({ children }) => <Switch>{children}</Switch>;

export const HomeIconNavLink = ({ routePath, onClick }) => (
  <Link to={{ pathname: routePath }} onClick={onClick}>
    <i className="fa fa-home" style={ContainerStyles.headerIcon} />
  </Link>
);

export const ProductContainer = ({ children }) => (
  <div>
    <main className="product-list container-fluid">
      <div className="row">{children}</div>
    </main>
  </div>
);

export const CardContainer = ({ ButtonData }) => (
  <div className="card" key={ButtonData.product.id}>
    <Link
      className="card-body text-justify"
      to={{
        pathname: `/org/${ButtonData.organization.id}/pro/${ButtonData.product.id}`,
      }}
    >
      <span>{ButtonData.product.name}</span>
    </Link>
  </div>
);

export const CompanyContainer = ({ isShrink, children }) => (
  <div
    className="content"
    style={
      isShrink
        ? ContainerStyles.ifCompanyShrink
        : ContainerStyles.ifNotCompanyShrink
    }
  >
    {children}
  </div>
);

export const CompanyHolder = ({ children }) => (
  <main className="company-list container">{children}</main>
);

export const CompanySearchBoxContainer = ({ children }) => (
  <div className="row" style={ContainerStyles.companyRow}>
    {children}
  </div>
);

export const RowContainer = ({ children }) => (
  <div className="row">{children}</div>
);

export const RowColContainer = ({ children }) => (
  <div className="row">
    <div className="col">{children}</div>
  </div>
);

export const CountContainer = ({ children }) => (
  <div style={ContainerStyles.countPadding}>{children}</div>
);

export const CompanyTable = ({ children }) => (
  <table aria-label="Customer Companies" className="table company-table">
    {children}
  </table>
);

export const CompanyTableHeaders = ({
  admin,
  colOne,
  colTwo,
  colThree,
  colOneSize,
  colTwoSize,
}) => (
  <thead>
    <tr>
      <th style={{ width: colOneSize }} className="col">
        {colOne}
      </th>
      <th style={{ width: colTwoSize }} className="col">
        {colTwo}
      </th>
      {admin && <th>{colThree}</th>}
    </tr>
  </thead>
);

export const CompanyProducts = ({ company }) => (
  <ul
    className="list-no-bullets list-inline"
    aria-label="Products available for Company 1"
  >
    {company.products.map((pro) => {
      if (pro.name)
        return (
          <li key={pro.id}>
            <Link
              to={{
                pathname: `/org/${company.id}/pro/${pro.id}`,
              }}
              style={ContainerStyles.buttonHandler}
              className="btn btn-sm btn-outline-secondary"
            >
              {pro.name}
            </Link>
          </li>
        );
      else {
        return null;
      }
    })}
  </ul>
);

export const LocalizationValueContainer = ({ isShrink, children }) => (
  <div
    style={
      isShrink
        ? ContainerStyles.ifLocalizationValueShrink
        : ContainerStyles.ifNotLocalizationValueShrink
    }
  >
    {children}
  </div>
);

export const LocalizationValueHolder = ({ children }) => (
  <main
    className="localizations-list container-fluid"
    style={ContainerStyles.localeValueHolder}
  >
    {children}
  </main>
);

export const LocalizationSearchBoxHolder = ({ children }) => (
  <div className="ml-4 mt-4">{children}</div>
);

export const LocalizationHeaderButtonContainer = ({ children }) => (
  <div className="ml-5">{children}</div>
);

export const LocalizationHeaderButtonHolder = ({ children }) => (
  <div style={{ display: "flex" }}>{children}</div>
);

export const ToggleButtonInEditMode = ({ children }) => (
  <div className="pl-2">{children}</div>
);

export const LocalizationValueTableContainer = ({ children }) => (
  <table
    aria-label="Localization keys and values"
    className="table table-hover table-sticky-head table-sm"
  >
    {children}
  </table>
);

export const EditButtonContainer = ({ children }) => (
  <div className="col-buttons" style={{ marginLeft: "auto" }}>
    {children}
  </div>
);

export const EditButtonhandler = ({ onClick, children }) => (
  <div onClick={onClick}>{children}</div>
);
export const SideBarContainer = ({ isShrink, children }) => (
  <div
    style={
      isShrink
        ? ContainerStyles.ifSideBarShrink
        : ContainerStyles.ifNotSideBarShrink
    }
  >
    <aside
      style={
        isShrink
          ? ContainerStyles.ifAsideShrink
          : ContainerStyles.ifNotAsideShrink
      }
    >
      {children}
    </aside>
  </div>
);
export const SideBarLocaleButtonHolder = ({ children }) => (
  <div className="filter-buttons mt-3">{children}</div>
);

export const SideBarLocaleLabel = ({ isShrink, text }) => (
  <h3 id="filter-langs-header" className={isShrink ? "mb-4" : "mb-3"}>
    {text}
  </h3>
);
export const SideBarToggleButtonContainer = ({ children }) => (
  <div
    role="group"
    id="filter-langs"
    aria-labelledby="filter-langs-header"
    className="btn-group-vertical filter mb-3"
  >
    {children}
  </div>
);
export const SideBarSquareButtonContainer = ({ isShrink, children }) => (
  <div
    style={
      isShrink
        ? ContainerStyles.ifSideBarSquareButtonShrink
        : ContainerStyles.ifNotSideBarSquareButtonShrink
    }
  >
    {children}
  </div>
);

export const SideBarSquareButtonHolder = ({ children }) => (
  <div style={{ marginRight: "4rem" }}>{children}</div>
);
