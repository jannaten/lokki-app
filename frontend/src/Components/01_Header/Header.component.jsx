import React from "react";
import axios from "axios";
import HeaderStyle from "../styles";
import { connect } from "react-redux";
import { PORTAL_URL } from "../../constant";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { LogOutButton } from "../Reusable-Components/";
import { HomeIconNavLink } from "../Reusable-Components/";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { soCompanyProduct, setProduct } from "../../redux/";
import { slvIsProductPending, slvProduct, slvOrgPrams } from "../../redux/";
import { getOganizationProduct, selectFindedCompanyId } from "../../redux/";

class Header extends React.Component {
  async componentDidMount() {
    const { orgParams, setProduct, getOganizationProduct } = this.props;
    const { pathname } = this.props.history.location;
    if (pathname !== "/") {
      await setProduct(orgParams);
    }
    await getOganizationProduct();
  }
  async componentDidUpdate(pP, pS, SS) {
    const { orgParams, setProduct } = this.props;
    if (pP.orgParams !== orgParams) {
      await setProduct(this.props.orgParams);
    }
  }
  onRedirect = () => {
    return (window.location.href = PORTAL_URL);
  };
  onDeleteCookie() {
    axios
      .get("http:localhost:28881/Shibboleth/Logout", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      });
  }
  render() {
    const { history } = this.props;
    const { pathname } = this.props.history.location;
    const { orgParams, findedCompanyId, comPro, company } = this.props;
    return (
      <Navbar
        bg="dark"
        expand="lg"
        variant="dark"
        collapseOnSelect
        style={HeaderStyle.headerPosition}
      >
        <Navbar.Brand>
          {pathname === "/" ? (
            <HomeIconNavLink onClick={this.onRedirect} />
          ) : pathname !== "/" ? (
            <HomeIconNavLink routePath="/" />
          ) : null}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {pathname === "/" || findedCompanyId ? (
              <NavDropdown
                title="Company List"
                id="collasible-nav-dropdown"
                className="mr-3"
              >
                {company.map((com) => (
                  <NavDropdown.Item
                    key={com.id}
                    onClick={() => history.push(`/org/${com.id}`)}
                  >
                    {com.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            ) : null}
            {pathname !== "/" && orgParams ? (
              <NavDropdown title="Product List" id="collasible-nav-dropdown">
                {comPro.map((cp) => (
                  <NavDropdown.Item
                    key={cp.product.id}
                    onClick={() =>
                      history.push(
                        `/org/${cp.organization.id}/pro/${cp.product.id}`
                      )
                    }
                  >
                    {cp.product.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            ) : null}
          </Nav>
          <Nav>
            <LogOutButton
              label="Log out"
              // onClick={() =>
              //   (document.cookie = `JSESSIONID; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/Shibboleth/Logout;`)
              // }
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  comPro: slvProduct,
  orgParams: slvOrgPrams,
  company: soCompanyProduct,
  isProductPending: slvIsProductPending,
  findedCompanyId: selectFindedCompanyId,
});

const mapDispatchToProps = (dispatch) => ({
  setProduct: (val) => dispatch(setProduct(val)),
  getOganizationProduct: () => dispatch(getOganizationProduct()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
