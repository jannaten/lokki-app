import { AddProductModal, AddButton, IconButton } from ".";
import { useNavigate } from "react-router-dom";
import { routes, endPoints } from "../config";
import { useTheme } from "styled-components";
import { useContext, useState } from "react";
import { DataContext } from "../contexts";

const OrganizationListRow = ({ organization }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { getImage } = endPoints;
  const { organizationRoute, productRoute } = routes;
  const { addProduct, products } = useContext(DataContext);

  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { id, name, organization_products } = organization;
  return (
    <tr key={id} style={{ borderBottom: `1px solid ${theme.basic.dark}` }}>
      <td onClick={() => navigate(`${organizationRoute}/${id}`)}>
        <p style={{ marginTop: "0.8rem", fontSize: "1rem", cursor: "pointer" }}>
          {name}
        </p>
      </td>
      <td>
        {organization_products.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
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
          </div>
        )}
      </td>
      <td>
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
