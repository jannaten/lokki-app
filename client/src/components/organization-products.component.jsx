import { useContext } from "react";
import { routes, endPoints } from "../config";
import { useNavigate } from "react-router-dom";
import { DataChildContext } from "../contexts";
import { Card, Col, Row } from "react-bootstrap";

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
              <div className="container" key={product.id}>
                <Card
                  className="text-center"
                  style={{ cursor: "pointer", padding: "5rem" }}
                  onClick={() =>
                    navigate(
                      `/${organizationRoute}/${organization.id}/${productRoute}/${product.id}`
                    )
                  }
                >
                  <Card.Body>
                    <Card.Img
                      width={50}
                      height={50}
                      src={getImage(product.image)}
                    />
                    <Card.Title style={{ marginTop: "2.3vw" }}>
                      {product.name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
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
