import React from "react";
import { connect } from "react-redux";
import { paginate } from "../../utils/paginate";
import { createStructuredSelector } from "reselect";
import { CountContainer } from "../Reusable-Components/";
import { RowContainer, Count } from "../Reusable-Components/";
import { CompanyTableHeaders } from "../Reusable-Components/";
import { CompanyTable, Pagination } from "../Reusable-Components/";
import { handlePageChange, soPageSize, soCurrentPage } from "../../redux/";
import LocalizationCompanyFeildSet from "./Localization-Company-Feild-Set.component";

const LocalizationCompanyFeild = ({
  admin,
  pageSize,
  currentPage,
  companyProduct,
  handlePageChange,
}) => {
  const { length: count } = companyProduct;
  const comPro = paginate(companyProduct, currentPage, pageSize);
  return (
    <RowContainer>
      <CountContainer>
        <Count title="Companies" count={count} addText=" Rows" />
      </CountContainer>
      <CompanyTable>
        <CompanyTableHeaders
          admin={admin}
          colOne="Name"
          colTwo="Products"
          colOneSize="auto"
          colTwoSize="66%"
          colThree="Add Product"
        />
        <tbody>
          {comPro.map((com) => (
            <LocalizationCompanyFeildSet
              key={com.id}
              company={com}
              admin={admin}
            />
          ))}
        </tbody>
      </CompanyTable>
      <Pagination
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsCount={companyProduct.length}
      />
    </RowContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  pageSize: soPageSize,
  currentPage: soCurrentPage,
});

const mapDispatchToProps = (dispatch) => ({
  handlePageChange: (paeg) => dispatch(handlePageChange(paeg)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocalizationCompanyFeild);
