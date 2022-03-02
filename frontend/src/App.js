import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Route, withRouter } from "react-router-dom";
import { Header, ProductButton } from "./Components/";
import { HeaderContainer } from "./Components/Reusable-Components/";
import { SwitchContainer } from "./Components/Reusable-Components/";
import { LocalizationCompany, LocalizationProduct } from "./Components/";
import { getAuthenticatedUser, selectAuthenticatedUser } from "./redux/";
import { AppContainer, PageNotFound } from "./Components/Reusable-Components/";

class App extends React.Component {
  async componentDidMount() {
    await this.props.getAuthenticatedUser();
  }

  render() {
    return (
      <AppContainer>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <SwitchContainer>
          <Route exact path="/" component={LocalizationCompany} />
          <Route exact path="/org/:orgId/" component={ProductButton} />
          <Route
            exact
            path="/org/:orgId/pro/:proId"
            component={LocalizationProduct}
          />
          <Route path="/not-found" component={PageNotFound} />
        </SwitchContainer>
      </AppContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  authenticatedUser: selectAuthenticatedUser,
});

const mapDispatchToProps = (dispatch) => ({
  getAuthenticatedUser: () => dispatch(getAuthenticatedUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
