import React from "react";
import { Default } from "../../constant";
import { paginate } from "../../utils/paginate";
import { RowColContainer } from "../Reusable-Components/";
import { ToggleButtonInEditMode } from "../Reusable-Components/";
import { LocalizationHeaderButtonHolder } from "../Reusable-Components/";
import { Count, Pagination, ToggleButton } from "../Reusable-Components/";
import { LocalizationValueTableContainer } from "../Reusable-Components/";
import { LocalizationHeaderButtonContainer } from "../Reusable-Components/";
import LocalizationProductFeildSet from "./Localization-Product-feild-set.component";

class LocalizationProductFeild extends React.Component {
  render() {
    const { length: count } = this.props.translation;
    const translation = paginate(
      this.props.translation,
      this.props.currentPage,
      this.props.pageSize
    );
    return (
      <RowColContainer>
        <br />
        <Count title="Translations" count={count} addText=" Rows" />
        <LocalizationHeaderButtonContainer>
          {this.props.localization.length > 0 ? (
            <LocalizationHeaderButtonHolder>
              {this.props.organizationId !== Default.toString() ? (
                <ToggleButton
                  value={
                    !this.props.sorted
                      ? "Check modifed value"
                      : "Check unmodified value"
                  }
                  onClick={this.props.onSort}
                />
              ) : null}
              <ToggleButtonInEditMode>
                {this.props.changeEditMode ? (
                  <ToggleButton
                    value={
                      this.props.isInEditMode
                        ? "Change to default View"
                        : "Enable Edit All Mode"
                    }
                    onClick={this.props.changeEditMode}
                  />
                ) : null}
              </ToggleButtonInEditMode>
            </LocalizationHeaderButtonHolder>
          ) : null}
          <br />
        </LocalizationHeaderButtonContainer>

        <LocalizationValueTableContainer>
          <thead>
            <tr>
              <th className="col" onClick={this.props.onSort}>
                Keys
              </th>
              {this.props.localization.map((locale) => {
                if (!this.props.hiddenLanguages.includes(locale.locale))
                  return (
                    <React.Fragment key={locale.id}>
                      <th className="col">
                        "{locale.name} ({locale.locale})"
                      </th>
                    </React.Fragment>
                  );
                else {
                  return null;
                }
              })}
              <th className="col col-tight">
                <span className="sr-only">Functions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {translation.map((translation) => (
              <LocalizationProductFeildSet
                key={translation.key.id}
                translation={translation}
                handleUpdate={this.props.handleUpdate}
                isInEditMode={this.props.isInEditMode}
                localization={this.props.localization}
                changeEditMode={this.props.changeEditMode}
                changeCountMode={this.props.changeCountMode}
                hiddenLanguages={this.props.hiddenLanguages}
                localTranslation={this.props.localTranslation}
                handleDeletedValue={this.props.handleDeletedValue}
                onHandleTranslation={this.props.onHandleTranslation}
                onTranslationRender={this.props.onTranslationRender}
                updateComponentValue={this.props.updateComponentValue}
                defaultTranslation={this.props.listDefault.find(
                  (d) => d.key.id === translation.key.id
                )}
              />
            ))}
          </tbody>
        </LocalizationValueTableContainer>
        <Pagination
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChange={this.props.handlePageChange}
          itemsCount={this.props.translation.length}
        />
      </RowColContainer>
    );
  }
}

export default LocalizationProductFeild;
