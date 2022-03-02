import { useContext, useState } from "react";
import { DataContext } from "../contexts";
import { Button } from "react-bootstrap";
import { AddProductModal } from ".";

const OrganizationListRow = ({ organization }) => {
  const { addProduct, products } = useContext(DataContext);

  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { id, name, organization_products } = organization;
  return (
    <tr key={id}>
      <td>{name}</td>
      {organization_products.length > 0 && (
        <>
          {organization_products.map((organization_product) => (
            <td key={organization_product.product.id}>
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
