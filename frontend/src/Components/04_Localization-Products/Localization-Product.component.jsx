import React from "react";
import axios from "axios";
import { SideBar } from "../";
import { connect } from "react-redux";
import { getWindowSize } from "../../utils/getWindowSize";
import { setOrgParams, setProParams } from "../../redux/";
import { historyReplace } from "../../utils/historyReplace";
import { Default, BACKEND_URL_SPRING_ } from "../../constant";
import { successToast, Loader } from "../Reusable-Components/";
import { LocalizationValueHolder } from "../Reusable-Components/";
import { LocalizationValueContainer } from "../Reusable-Components/";
import { LocalizationSearchBoxHolder } from "../Reusable-Components/";
import LocalizationFeild from "./Localization-Product-feild.compnent";
import { Headings, SearchBox, ScrollToTop } from "../Reusable-Components/";

class LocalizationProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comPro: [],
      pageSize: 50,
      sorted: false,
      currentPage: 1,
      searchField: "",
      listDefault: [],
      localization: [],
      organization: {},
      translations: null,
      hiddenLanguages: [],
      translationCount: 0,
      isInEditMode: false,
      selectedTrans: null,
      showOnlyEmpty: false,
      organizationProduct: [],
      isShrink: getWindowSize(680),
    };
  }

  onLanguagehandle = () => {
    this.getLocalization();
    this.getTranslation();
  };

  onHandleTranslation = () => {
    this.getTranslation();
  };

  getListDefault = () => {
    const { proId } = this.props.match.params;
    axios
      .get(`${BACKEND_URL_SPRING_}/localization-values/${Default}/${proId}/`)
      .then((res) => {
        this.setState({ listDefault: res.data });
      });
  };

  getTranslation = () => {
    const { orgId, proId } = this.props.match.params;
    axios
      .get(`${BACKEND_URL_SPRING_}/localization-values/${orgId}/${proId}/`)
      .then((res) => {
        this.setState({ translations: res.data });
      });
  };

  getLocalization = () => {
    const { orgId, proId } = this.props.match.params;
    axios
      .get(`${BACKEND_URL_SPRING_}/localization/${orgId}/${proId}/`)
      .then((res) => {
        this.setState({ localization: res.data });
      });
  };

  getCompanyProduct = () => {
    const { proId } = this.props.match.params;
    axios.get(`${BACKEND_URL_SPRING_}/product/${proId}`).then((res) => {
      this.setState({ comPro: res.data });
    });
  };

  getOrganization = () => {
    const { orgId } = this.props.match.params;
    axios
      .get(`${BACKEND_URL_SPRING_}/organization/${orgId}`)
      .then((res) => {
        this.setState({ organization: res.data });
      })
      .catch((err) => {
        console.error(err.message);
        historyReplace(this.props.history, "Organization doesn't exist");
      });
  };

  getOrganizationProduct = () => {
    const { orgId, proId } = this.props.match.params;
    axios
      .get(`${BACKEND_URL_SPRING_}/organization-products/${orgId}`)
      .then(({ data }) => {
        if (data.length > 0) {
          if (data.some(({ product }) => product.id === Number(proId))) {
            this.setState({ organizationProduct: data });
          } else {
            historyReplace(this.props.history, "Product doesn't exist");
          }
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  async componentDidMount() {
    const { orgId, proId } = this.props.match.params;

    this.getOrganization();
    this.getOrganizationProduct();

    this.getTranslation();
    this.getListDefault();
    this.getLocalization();
    this.getCompanyProduct();
    this.props.setOrgParams(orgId);
    this.props.setProParams(proId);

    window.addEventListener("resize", () => {
      this.setState({
        isShrink: getWindowSize(680),
      });
    });
  }

  componentDidUpdate(pP, pS, SS) {
    const { orgId, proId } = this.props.match.params;
    if (
      pS.translationCount !== this.state.translationCount &&
      this.state.sorted === false
    ) {
      this.getTranslation();
    }

    if (pS.localizationCount !== this.state.localizationCount) {
      this.getLocalization();
    }

    if (pP.match.params.orgId !== orgId || pP.match.params.proId !== proId) {
      this.getOrganization();
      this.getOrganizationProduct();
    }

    if (pP.match.params.orgId !== orgId || pP.match.params.proId !== proId) {
      this.getTranslation();
      this.getListDefault();
      this.getLocalization();
      this.getCompanyProduct();
      this.props.setOrgParams(orgId);
      this.props.setProParams(proId);
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  onSort = () => {
    if (this.state.sorted === false) {
      const sortedTranslations = this.state.localization.map((locale) => {
        return this.state.translations.sort((a, b) => {
          if (
            a.values[locale.locale] !== undefined &&
            b.values[locale.locale] !== undefined &&
            this.state.sorted === false
          ) {
            return a.values[locale.locale].fromDefault ===
              b.values[locale.locale].fromDefault
              ? 0
              : a.values[locale.locale].fromDefault
              ? 1
              : -1;
          } else {
            return null;
          }
        });
      });
      this.setState({
        translations: sortedTranslations[0],
      });
    }
    this.setState({
      sorted: !this.state.sorted,
      translationCount: this.state.translationCount + 1,
    });
  };

  addItem(language) {
    let currentHiddenLanguages = this.state.hiddenLanguages;
    currentHiddenLanguages.push(language);
    this.setState({
      hiddenLanguages: [...this.state.hiddenLanguages, currentHiddenLanguages],
    });
  }

  deleteItem(language) {
    let currentHiddenLanguages = this.state.hiddenLanguages;
    for (let i = currentHiddenLanguages.length - 1; i--; ) {
      if (currentHiddenLanguages[i] === language) {
        currentHiddenLanguages.splice(i, 1);
      }
    }
    this.setState({
      hiddenLanguages: [...this.state.hiddenLanguages, currentHiddenLanguages],
    });
  }

  onToggleLanguage = (language) => {
    if (this.state.hiddenLanguages.includes(language)) {
      return this.deleteItem(language);
    } else {
      return this.addItem(language);
    }
  };

  changeEditMode = () => {
    this.state.isInEditMode && successToast("Values are up to date");
    this.setState({
      isInEditMode: !this.state.isInEditMode,
    });
  };

  updateComponentValue = (value) => {
    this.setState({
      isInEditMode: false,
      value: value,
    });
  };

  handleSearch = (query) => {
    this.setState({ searchField: query, selectedTrans: null, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDeletedValue = (updatevalue, deletedValueId) => {
    let newValue = updatevalue;
    let newArray = [];
    newArray.push(newValue);
    const ModifiedState = this.state.localization.map((locale) => {
      return this.state.translations.map((trans) => {
        if (
          trans.values[locale.locale] !== undefined &&
          updatevalue[locale.locale] !== undefined
        ) {
          if (trans.values[locale.locale].id === deletedValueId) {
            let myObj = Object.values(trans.values);
            let val = myObj.find((m) => m.id === deletedValueId);
            let nn = newArray.find(
              (d) => d[locale.locale].localizationId === val.localizationId
            );
            val.id = nn[locale.locale].id;
            val.value = nn[locale.locale].value;
            val.fromDefault = true;
            return trans;
          }
          return trans;
        }
        return trans;
      });
    });
    this.setState({ translations: ModifiedState[0] });
  };

  handleUpdate = (updatevalue, setBolean) => {
    let newArray = updatevalue.updatedRespond;
    let newObj = {};
    this.state.localization.map((locale) => {
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].localizationId === locale.id) {
          return (newObj[locale.locale] = newArray[i]);
        }
      }
      return newObj;
    });
    const ModifiedState = this.state.localization.map((locale) => {
      return this.state.translations.map((trans) => {
        if (
          trans.values[locale.locale] !== undefined &&
          updatevalue.localizedValues[locale.locale] !== undefined
        ) {
          if (
            trans.values[locale.locale].id ===
            updatevalue.localizedValues[locale.locale].onLocaleValueId
          ) {
            const newValue = { ...trans, ...updatevalue };
            const obj = {};
            obj.organizationId = newValue.organizationId;
            obj.key = newValue.key;
            obj.values = newValue.values;
            obj.values[locale.locale].value =
              newValue.localizedValues[locale.locale].value;
            obj.values[locale.locale].id = newValue.localizedValues[
              locale.locale
            ].id = newObj[locale.locale].id;
            obj.values[locale.locale].fromDefault = newValue.localizedValues[
              locale.locale
            ].fromDefault = setBolean;
            return newValue;
          }
          return trans;
        } else if (
          trans.values[locale.locale] === undefined &&
          updatevalue.localizedValues[locale.locale] !== undefined
        ) {
          if (trans.key.key === newObj[locale.locale].localizationKey.key) {
            const newValue = { ...trans, ...updatevalue };
            const obj = {};
            obj.organizationId = newValue.organizationId;
            obj.key = newValue.key;
            newValue.localizedValues[locale.locale] = {
              id: newObj[locale.locale].id,
              fromDefault: false,
              localizationId: updatevalue.updatedRespond.localizationId,
              value: newValue.localizedValues[locale.locale].value,
            };
            obj.values = { ...newValue.values, ...newValue.localizedValues };
            newValue.values[locale.locale] = {
              ...newValue.values[locale.locale],
              ...newValue.localizedValues[locale.locale],
            };
            return obj;
          }
        }
        return trans;
      });
    });
    this.setState({ translations: ModifiedState[0] });
  };

  render() {
    const {
      comPro,
      isShrink,
      pageSize,
      currentPage,
      searchField,
      translations,
      translationCount,
      organization,
    } = this.state;

    const { orgId: organizationId } = this.props.match.params;
    const onTranslationRender = () =>
      this.setState({ translationCount: translationCount + 1 });

    const onBlankFeild = () => {
      this.setState({
        showOnlyEmpty: !this.state.showOnlyEmpty,
        currentPage: 1,
      });
    };

    const isTransltionDefined = Array.isArray(translations);

    let filteredTranslations;

    if (isTransltionDefined) {
      filteredTranslations = translations.filter((filtering) => {
        if (
          filtering.key.key.toLowerCase().includes(searchField.toLowerCase())
        ) {
          return true;
        }

        for (let locale of Object.keys(filtering.values)) {
          if (!filtering.values[locale].value) {
            continue;
          }
          if (
            filtering.values[locale].value
              .toLowerCase()
              .includes(searchField.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
    }

    if (this.state.showOnlyEmpty) {
      let newLocales = this.state.localization.map(
        (localization) => localization.locale
      );
      filteredTranslations = translations.filter((filtering) => {
        for (let loc of newLocales) {
          if (!filtering.values[loc]) {
            return true;
          }
        }
        for (let locale of Object.keys(filtering.values)) {
          if (!filtering.values[locale].value) {
            return true;
          }
        }
        return false;
      });
    }

    return (
      <>
        <ScrollToTop />
        <LocalizationValueContainer isShrink={isShrink}>
          <SideBar
            isShrink={isShrink}
            onBlankFeild={onBlankFeild}
            translation={filteredTranslations}
            changeEditMode={this.changeEditMode}
            localization={this.state.localization}
            onToggleLanguage={this.onToggleLanguage}
            onLanguagehandle={this.onLanguagehandle}
            onTranslationRender={onTranslationRender}
            hiddenLanguages={this.state.hiddenLanguages}
          />
          <LocalizationValueHolder>
            <Headings
              key={comPro.id}
              heading={
                comPro.name === undefined
                  ? " "
                  : `${comPro.name} Localization - ${organization.name}`
              }
            />
            <LocalizationSearchBoxHolder>
              <SearchBox
                value={searchField}
                onChange={this.handleSearch}
                placeholder="Search Key or value"
              />
            </LocalizationSearchBoxHolder>
            {isTransltionDefined ? (
              <LocalizationFeild
                pageSize={pageSize}
                onSort={this.onSort}
                currentPage={currentPage}
                sorted={this.state.sorted}
                organizationId={organizationId}
                handleUpdate={this.handleUpdate}
                translation={filteredTranslations}
                listDefault={this.state.listDefault}
                changeEditMode={this.changeEditMode}
                changeCountMode={this.changeCountMode}
                localization={this.state.localization}
                isInEditMode={this.state.isInEditMode}
                handlePageChange={this.handlePageChange}
                onTranslationRender={onTranslationRender}
                hiddenLanguages={this.state.hiddenLanguages}
                handleDeletedValue={this.handleDeletedValue}
                onHandleTranslation={this.onHandleTranslation}
                updateComponentValue={this.updateComponentValue}
              />
            ) : (
              <Loader />
            )}
          </LocalizationValueHolder>
        </LocalizationValueContainer>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setOrgParams: (val) => dispatch(setOrgParams(val)),
  setProParams: (val) => dispatch(setProParams(val)),
});

export default connect(null, mapDispatchToProps)(LocalizationProduct);
