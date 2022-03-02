import { routes } from "../config";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { DataChildContext } from "../contexts";

const OrganizationProducts = () => {
  const navigate = useNavigate();
  const { organizationRoute, productRoute } = routes;

  const { organization } = useContext(DataChildContext);
  const { organization_products } = organization;
  return (
    <div className="d-flex">
      {organization_products && organization_products.length > 0 ? (
        <>
          {organization_products.map(({ product }) => (
            <div className="d-flex container" key={product.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() =>
                      navigate(
                        `/${organizationRoute}/${organization.id}/${productRoute}/${product.id}`
                      )
                    }
                  >
                    Go somewhere
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </>
      ) : (
        <h1>{organization.name} has no product</h1>
      )}
    </div>
  );
};

export default OrganizationProducts;
