import { AddProductModal, AddButton, IconButton } from ".";
import { OrganizationProductIconHolder } from "../styles";
import { useNavigate } from "react-router-dom";
import { routes, endPoints } from "../config";
import { useContext, useState } from "react";
import { DataContext } from "../contexts";

const OrganizationListRow = ({ organization }) => {
  const navigate = useNavigate();
  const { getImage } = endPoints;
  const { organizationRoute, productRoute } = routes;
  const { addProduct, products } = useContext(DataContext);

  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { id, name, organization_products } = organization;
  return (
    <tr key={id} className="border-bottom">
      <td onClick={() => navigate(`${organizationRoute}/${id}`)}>
        <p className="mt-2 lead" role="button">
          {name}
        </p>
      </td>
      <td>
        {organization_products.length > 0 && (
          <OrganizationProductIconHolder>
            {organization_products
              .sort((a, b) => a.id - b.id)
              .map(({ product }) => (
                <IconButton
                  key={product.id}
                  text={product.name}
                  src={getImage(product.image)}
                  onClick={() =>
                    navigate(
                      `${organizationRoute}/${id}/${productRoute}/${product.id}`
                    )
                  }
                />
              ))}
          </OrganizationProductIconHolder>
        )}
      </td>
      <td className="float-end">
        <AddButton onClick={() => setVisible(!visible)} />
      </td>
      <AddProductModal
        setSelectedProduct={setSelectedProduct}
        selectedProduct={selectedProduct}
        organization={organization}
        setVisible={setVisible}
        addProduct={addProduct}
        products={products}
        visible={visible}
      />
    </tr>
  );
};

export default OrganizationListRow;
