import React from "react";
import { forEach } from "lodash";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { slvProParams } from "../../redux/";
import Tooltip from "react-bootstrap/Tooltip";
import { createStructuredSelector } from "reselect";
import { BACKEND_URL_SPRING_ } from "../../constant";
import { EditLocalizedValueModal } from "../Modals/";
import { EditButtonhandler } from "../Reusable-Components/";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { EditButton as Edit } from "../Reusable-Components/";
import { EditButtonContainer } from "../Reusable-Components/";
import { successToast, errorToast } from "../Reusable-Components/";

class LocalizationProductFeildSet extends React.Component {
  constructor() {
    super();
    this.state = {
      status: {},
      showModal: false,
      defaultValues: {},
      deletedRespond: [],
      updatedRespond: [],
      isInEditMode: false,
      localizedValues: {},
    };
  }

  url = `${BACKEND_URL_SPRING_}/localization-value`;

  handleUpdate = async (event) => {
    try {
      event.preventDefault();
      const newArray = [];
      for (let key of Object.keys(this.state.localizedValues)) {
        await fetch(this.url, {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.state.localizedValues[key]),
        })
          .then((response) => {
            this.setState({ status: { value: response.status } });
            return response.status === 200
              ? response.json()
              : () => {
                  errorToast("An Error Occured while editing values");
                };
          })
          .then(
            forEach((data) => {
              newArray.push(data);
              return this.setState({ updatedRespond: newArray });
            })
          )
          .catch((error) => {
            errorToast("An Error Occured while editing values");
          });
      }
      if (this.state.status.value === 200) {
        const updateValue = { ...this.state };
        await this.props.handleUpdate(updateValue, false);
        await this.props.changeCountMode();
        this.setState({ showModal: false, status: {} });
        successToast("Values are updated");
      } else {
        this.setState({ showModal: false, status: {} });
        this.props.onHandleTranslation();
        successToast("Values are updated");
      }
    } catch (error) {
      successToast("Values are updated");
      this.props.onHandleTranslation();
      this.setState({ showModal: false, status: {} });
    }
  };

  handleInputUpdate = async (event) => {
    try {
      event.preventDefault();
      const newArray = [];
      for (let key of Object.keys(this.state.localizedValues)) {
        await fetch(this.url, {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.state.localizedValues[key]),
        })
          .then((response) => {
            this.setState({ status: { value: response.status } });
            return response.status === 200
              ? response.json()
              : () => {
                  errorToast("An Error Occured while editing values");
                };
          })
          .then(
            forEach((data) => {
              newArray.push(data);
              return this.setState({ updatedRespond: newArray });
            })
          )
          .catch((error) => {
            errorToast("An Error Occured while editing values");
          });
      }
      if (this.state.status.value === 200) {
        const updateValue = { ...this.state };
        await this.props.handleUpdate(updateValue, false);
        await this.props.changeCountMode();
        this.setState({ showModal: false, status: {} });
      } else {
        this.setState({ showModal: false, status: {} });
        this.props.onHandleTranslation();
      }
    } catch (error) {
      this.props.onHandleTranslation();
      this.setState({ showModal: false, status: {} });
    }
  };

  onDelete = async (locale) => {
    try {
      let newVal = {};
      let getData = {};
      await fetch(`${BACKEND_URL_SPRING_}/localization-value/${locale}`, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          return res.status === 200 ? res.json() : null;
        })
        .then((data) => {
          this.props.localization.forEach((locale) => {
            let newObj = {};
            getData = data;
            if (this.onDefaultValueList(locale) !== null) {
              newObj.id = this.onDefaultValueList(locale).id;
              newObj.localizationId = locale.id;
              newObj.value = this.onDefaultValueList(locale).value;
              newVal[locale.locale] = newObj;
            }
          });
          return newVal;
        })
        .catch((error) => console.error("Error Occured"));

      await this.props.handleDeletedValue(newVal, getData);
      this.setState({ status: {} });
      successToast("Restored to default value");
    } catch (error) {
      errorToast("An Error Occured while deleting");
    }
  };

  onlocalizationValueChange = (event, local, id, onLocaleValueId) => {
    let localValue = this.state.localizedValues;
    let value = {
      localizationId: id,
      onLocaleValueId: onLocaleValueId,
      localizationKey: {
        key: this.props.translation.key.key,
        id: this.props.translation.key.id,
        productId: this.props.proParams,
      },
      value: event.target.value,
    };
    localValue[local] = value;
    this.setState({
      localizedValues: localValue,
    });
  };

  handleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  onLocaleValue = (locale) => {
    if (this.props.translation.values[locale.locale]) {
      return this.props.translation.values[locale.locale].value;
    } else {
      return "";
    }
  };

  onLocaleValueId = (locale) => {
    if (this.props.translation.values[locale.locale]) {
      return this.props.translation.values[locale.locale].id;
    } else {
      return "";
    }
  };

  onLocaleDefault = (locale) => {
    if (this.props.translation.values[locale.locale]) {
      return this.props.translation.values[locale.locale].fromDefault;
    } else {
      return "";
    }
  };

  onDefaultValue = (locale) => {
    if (typeof this.props.defaultTranslation == "undefined") {
      return "";
    } else if (this.props.defaultTranslation.values[locale.locale]) {
      return this.props.defaultTranslation.values[locale.locale].value;
    }
    return "";
  };

  onDefaultValueList = (locale) => {
    if (typeof this.props.defaultTranslation == "undefined") {
      return null;
    } else if (this.props.defaultTranslation.values[locale.locale]) {
      return this.props.defaultTranslation.values[locale.locale];
    }
    return null;
  };

  render() {
    return (
      <tr>
        <td>{this.props.translation.key.key}</td>
        {this.props.localization.map((locale) => {
          if (!this.props.hiddenLanguages.includes(locale.locale)) {
            const value = this.onLocaleValue(locale);
            const vlaueId = this.onLocaleValueId(locale);
            const fromDefault = this.onLocaleDefault(locale);
            const defaultTrans = this.onDefaultValue(locale);

            if (value === null) {
              return <td key={locale.id}></td>;
            } else if (this.props.isInEditMode) {
              return (
                <td key={locale.id}>
                  <input
                    type="text"
                    ref="theTextInput"
                    defaultValue={value}
                    className="form-control mb-1"
                    onBlur={(event) => {
                      if (event.target.value !== value) {
                        this.onlocalizationValueChange(
                          event,
                          locale.locale,
                          locale.id,
                          vlaueId
                        );
                        this.handleInputUpdate(event);
                      }
                    }}
                  />
                </td>
              );
            } else {
              return (
                <td key={locale.id} data-sortable="false">
                  {value}{" "}
                  {fromDefault === false &&
                  this.onDefaultValueList(locale) !== null &&
                  this.props.translation.organizationId !== 1 ? (
                    <>
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={(props) => (
                          <Tooltip id="button-tooltip" {...props}>
                            <div>
                              {defaultTrans !== ""
                                ? defaultTrans
                                : "Default value : empty"}
                            </div>
                          </Tooltip>
                        )}
                      >
                        <Button
                          variant="success"
                          style={{ opacity: 0.6, cursor: "pointer" }}
                          onClick={() => this.onDelete(vlaueId)}
                        >
                          Restore
                        </Button>
                      </OverlayTrigger>
                    </>
                  ) : null}
                </td>
              );
            }
          }
          return false;
        })}

        <td>
          <EditButtonContainer>
            {this.props.localization.length > 0 ? (
              <EditButtonhandler
                onClick={() => {
                  this.handleModal();
                }}
              >
                <Edit text="Edit" />
              </EditButtonhandler>
            ) : (
              <div style={{ height: "3vh" }}></div>
            )}
            <EditLocalizedValueModal
              handleUpdate={this.handleUpdate}
              showModal={this.state.showModal}
              onLocaleValue={this.onLocaleValue}
              translation={this.props.translation}
              localization={this.props.localization}
              onLocaleValueId={this.onLocaleValueId}
              onlocalizationValueChange={this.onlocalizationValueChange}
              handleModal={() => {
                this.handleModal();
              }}
            />
          </EditButtonContainer>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  proParams: slvProParams,
});

export default connect(mapStateToProps)(LocalizationProductFeildSet);
