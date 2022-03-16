import { CartItem } from ".";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { routes, endPoints } from "../config";
import { useNavigate } from "react-router-dom";
import { DataChildContext } from "../contexts";

const OrganizationProducts = () => {
  const navigate = useNavigate();
  const { getImage } = endPoints;
  const { organizationRoute, productRoute } = routes;

  const { organization } = useContext(DataChildContext);
  const { organization_products } = organization;
  return (
    <Row className="w-100 p-0 m-0">
      <Col className="d-flex" style={{ marginTop: "5rem" }}>
        {organization_products && organization_products.length > 0 ? (
          <>
            {organization_products.map(({ product }) => (
              <CartItem
                title={product.name}
                key={product.id}
                onClick={() =>
                  navigate(
                    `/${organizationRoute}/${organization.id}/${productRoute}/${product.id}`
                  )
                }
                src={getImage(product.image)}
              />
            ))}
          </>
        ) : (
          <h1>{organization.name} has no product</h1>
        )}
      </Col>
    </Row>
  );
};

export default OrganizationProducts;
