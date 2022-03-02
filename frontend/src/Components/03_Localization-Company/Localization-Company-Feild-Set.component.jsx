import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AddProductModal } from "../Modals/";
import { getCompanyValue } from "../../redux/";
import { BACKEND_URL_SPRING_ } from "../../constant";
import { successToast, errorToast } from "../Reusable-Components/";
import { CompanyProducts, AddProductButton } from "../Reusable-Components/";

class LocalizationCompanyFeildSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: {},
      showAddProductModal: false,
    };
  }

  handleAddProduct() {
    this.setState({ showAddProductModal: !this.state.showAddProductModal });
  }

  AddProduct = async (orgId, proId, proName) => {
    try {
      let newValue = (value) => {
        for (let index = 0; index < proName.length; index++) {
          if (proName[index].value === value) {
            return proName[index].text;
          }
        }
      };
      let obj = {};
      obj.id = Number(proId);
      obj.name = newValue(proId);

      await axios
        .post(
          `${BACKEND_URL_SPRING_}/product-organization?organizationId=${orgId}&productId=${proId}`,
          {
            organizationId: orgId,
            productId: proId,
          }
        )
        .then((response) => {
          this.setState({ status: { value: response.status } });
          return response.status === 200
            ? this.props.getCompanyValue(obj, orgId)
            : errorToast("An Error Occured while adding a product");
        })
        .catch(function (error) {
          console.log(error);
        });

      this.setState({ showAddProductModal: false });
      if (this.state.status.value === 200) {
        this.setState({ status: {} });
        successToast(`${obj.name} product has added`);
      } else {
        this.setState({ status: {} });
        errorToast("A company can't have the same product.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { admin, company } = this.props;
    const { showAddProductModal } = this.state;
    return (
      <tr>
        <td>
          <Link to={{ pathname: `/org/${company.id}/` }}>{company.name}</Link>
        </td>
        <td>
          <CompanyProducts company={company}></CompanyProducts>
        </td>
        {admin && (
          <td>
            <AddProductButton
              text="+"
              onClick={() => {
                this.handleAddProduct();
              }}
            />
            <AddProductModal
              show={showAddProductModal}
              handleSubmit={this.AddProduct}
              organization={company}
              handleModal={() => {
                this.handleAddProduct();
              }}
            />
          </td>
        )}
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCompanyValue: (value, comId) => dispatch(getCompanyValue(value, comId)),
});

export default connect(null, mapDispatchToProps)(LocalizationCompanyFeildSet);
