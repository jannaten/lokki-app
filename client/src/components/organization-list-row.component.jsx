import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DataContext } from "../contexts";
import { Button } from "react-bootstrap";
import { routes } from "../config";
import { AddProductModal } from ".";

const OrganizationListRow = ({ organization }) => {
  const navigate = useNavigate();
  const { organizationRoute, productRoute } = routes;
  const { addProduct, products } = useContext(DataContext);

  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { id, name, organization_products } = organization;
  return (
    <tr key={id}>
      <td
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`${organizationRoute}/${id}`)}
      >
        {name}
      </td>
      {organization_products.length > 0 && (
        <>
          {organization_products.map((organization_product) => (
            <td
              key={organization_product.product.id}
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(
                  `${organizationRoute}/${id}/${productRoute}/${organization_product.product.id}`
                )
              }
            >
              {organization_product.product.name}
            </td>
          ))}
        </>
      )}
      <td>
        <Button onClick={() => setVisible(!visible)}>+</Button>
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
