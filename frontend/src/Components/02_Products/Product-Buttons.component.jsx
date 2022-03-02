import React from "react";
import { connect } from "react-redux";
import { cleanProduct } from "../../redux/";
import { createStructuredSelector } from "reselect";
import { historyReplace } from "../../utils/historyReplace";
import { slvProduct, slvIsProductPending } from "../../redux/";
import { setOrgParams, setProduct, slvOrgPrams } from "../../redux/";
import { selectFindedCompanyId, soCompanyProduct } from "../../redux/";
import { ProductContainer, CardContainer } from "../Reusable-Components/";

class ProductButtonComponent extends React.Component {
  async componentDidMount() {
    const { orgId } = this.props.match.params;
    const { setOrgParams, setProduct } = this.props;
    await setOrgParams(orgId);
    await setProduct(orgId);
  }

  async componentDidUpdate(pP, pS, SS) {
    const { orgId } = this.props.match.params;
    const { companyProduct, history } = this.props;
    const { setOrgParams, setProduct, cleanProduct } = this.props;
    if (pP.match.params.orgId !== orgId) {
      await cleanProduct();
      await setOrgParams(orgId);
      await setProduct(orgId);
    }
    if (pP.match.params.orgId !== orgId) {
      (await !companyProduct.some((company) => company.id === Number(orgId))) &&
        historyReplace(history, "Organization doesn't exist");
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    const { isProductPending, product } = this.props;
    return (
      <>
        {!isProductPending ? (
          <ProductContainer>
            {product.map((ButtonData) => {
              if (ButtonData.product)
                return <CardContainer ButtonData={ButtonData} />;
              else return null;
            })}
          </ProductContainer>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  product: slvProduct,
  orgParams: slvOrgPrams,
  companyProduct: soCompanyProduct,
  isProductPending: slvIsProductPending,
  findedCompanyId: selectFindedCompanyId,
});

const mapDispatchToProps = (dispatch) => ({
  cleanProduct: () => dispatch(cleanProduct()),
  setProduct: (val) => dispatch(setProduct(val)),
  setOrgParams: (val) => dispatch(setOrgParams(val)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductButtonComponent);
