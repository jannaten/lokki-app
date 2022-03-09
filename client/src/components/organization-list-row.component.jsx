import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { routes, endPoints } from "../config";
import { Plus } from "react-bootstrap-icons";
import { useContext, useState } from "react";
import { DataContext } from "../contexts";
import { AddProductModal } from ".";

const OrganizationListRow = ({ organization }) => {
  const navigate = useNavigate();
  const { getImage } = endPoints;
  const { organizationRoute, productRoute } = routes;
  const { addProduct, products } = useContext(DataContext);

  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { id, name, organization_products } = organization;
  return (
    <tr key={id} style={{ borderBottom: "1px solid #212529" }}>
      <td onClick={() => navigate(`${organizationRoute}/${id}`)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Button
            variant=""
            style={{
              background: "none",
              display: "flex",
              padding: "0.5rem",
              borderRadius: "0",
              marginRight: "1rem",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {name}
          </Button>
        </div>
      </td>
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
            .map((organization_product) => (
              <Button
                style={{
                  display: "flex",
                  padding: "0.5rem",
                  borderRadius: "0",
                  marginRight: "1rem",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
                onClick={() =>
                  navigate(
                    `${organizationRoute}/${id}/${productRoute}/${organization_product.product.id}`
                  )
                }
                variant="outline-dark"
                key={organization_product.product.id}
              >
                <Image
                  width={30}
                  height={30}
                  src={getImage(organization_product.product.image)}
                />
                <td>{organization_product.product.name}</td>
              </Button>
            ))}
        </div>
      )}
      <td>
        <Button
          style={{ border: "0", borderRadius: "0" }}
          onClick={() => setVisible(!visible)}
          variant="dark"
        >
          <Plus width={25} height={25} />
        </Button>
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
