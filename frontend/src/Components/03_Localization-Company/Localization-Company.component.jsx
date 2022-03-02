import React from "react";
import { connect } from "react-redux";
import { AddOrganizationModal } from "../Modals/";
import { createStructuredSelector } from "reselect";
import { CompanyHolder } from "../Reusable-Components/";
import { getWindowSize } from "../../utils/getWindowSize";
import { CompanySearchBoxContainer } from "../Reusable-Components/";
import { cleanProduct, selectAuthenticatedUser } from "../../redux/";
import { AddButton, CompanyContainer } from "../Reusable-Components/";
import { soData, getProduct, handleCompanySearch } from "../../redux/";
import { Headings as Header, SearchBox } from "../Reusable-Components/";
import { soStatus, soSearchField, soCompanyProduct } from "../../redux/";
import { handleAddOrganization, getOganizationProduct } from "../../redux/";
import LocalizationCompanyFeild from "./Localization-Company-Feild.component";

class LocalizationCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShrink: getWindowSize(680),
    };
  }

  async componentDidMount() {
    await this.props.cleanProduct();
    await this.props.getOganizationProduct();
    await this.props.getProduct();
    window.addEventListener("resize", () => {
      this.setState({
        isShrink: getWindowSize(680),
      });
    });
  }

  async componentDidUpdate(pP, pS, SS) {
    if (pP.status.value !== this.props.status.value) {
      this.props.getOganizationProduct();
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    const { isShrink } = this.state;
    const { admin } = this.props.authenticatedUser;
    const { searchField, companyProduct, handleCompanySearch } = this.props;
    const isCompanyDefiend = Array.isArray(companyProduct);
    let filteredCompany;
    if (isCompanyDefiend) {
      filteredCompany = companyProduct.filter((filtering) =>
        filtering.name.toLowerCase().includes(searchField.toLocaleLowerCase())
      );
    }
    return (
      <CompanyContainer isShrink={isShrink}>
        <CompanyHolder>
          <Header heading="Companies" />
          <CompanySearchBoxContainer>
            <SearchBox
              value={searchField}
              onChange={handleCompanySearch}
              placeholder="Search Companies ... "
            />
          </CompanySearchBoxContainer>
          {isCompanyDefiend ? (
            <LocalizationCompanyFeild
              companyProduct={filteredCompany}
              admin={admin}
            />
          ) : (
            <div>Organization is not found</div>
          )}
          {admin && (
            <AddButton
              children="Add Company"
              onClick={() => {
                this.props.handleAddOrganization();
              }}
            />
          )}
        </CompanyHolder>
        <AddOrganizationModal />
      </CompanyContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  data: soData,
  status: soStatus,
  searchField: soSearchField,
  companyProduct: soCompanyProduct,
  authenticatedUser: selectAuthenticatedUser,
});

const mapDispatchToProps = (dispatch) => ({
  getProduct: () => dispatch(getProduct()),
  cleanProduct: () => dispatch(cleanProduct()),
  handleAddOrganization: () => dispatch(handleAddOrganization()),
  getOganizationProduct: () => dispatch(getOganizationProduct()),
  handleCompanySearch: (query) => dispatch(handleCompanySearch(query)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocalizationCompany);
