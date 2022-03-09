import { useContext } from "react";
import { routes, endPoints } from "../config";
import { useNavigate, useLocation } from "react-router-dom";
import { DataContext, DataChildContext } from "../contexts";
import { Nav, Navbar, Container, NavDropdown, Image } from "react-bootstrap";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { organizations } = useContext(DataContext);
  const { organization } = useContext(DataChildContext);

  const { organizationRoute, home, productRoute } = routes;
  const { organization_products } = organization;
  const { getImage } = endPoints;

  return (
    <>
      <Navbar
        bg="dark"
        expand="lg"
        variant="dark"
        className="w-100"
        style={{
          position: "fixed",
          marginTop: "0rem",
          zIndex: "7",
        }}
      >
        <Container fluid>
          <Navbar.Brand
            style={{ cursor: "pointer" }}
            onClick={() => navigate(home)}
          >
            Lokki
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavDropdown
                title="organization list"
                id="navbarScrollingDropdown"
              >
                {organizations.length > 0 &&
                  organizations.map(({ id, name }) => (
                    <NavDropdown.Item
                      key={id}
                      onClick={() => navigate(`/${organizationRoute}/${id}`)}
                      style={{
                        display: "flex",
                        padding: "0.5rem",
                        textAlign: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        style={{
                          margin: "0.1rem 0.7rem 0rem 0rem",
                        }}
                      >
                        {name}
                      </p>
                    </NavDropdown.Item>
                  ))}
              </NavDropdown>
              {location.pathname !== home && (
                <>
                  {organization_products && organization_products.length > 0 && (
                    <NavDropdown
                      title="product list"
                      id="navbarScrollingDropdown1"
                    >
                      {organization_products.map(({ product }) => (
                        <NavDropdown.Item
                          key={product.id}
                          onClick={() =>
                            navigate(
                              `/${organizationRoute}/${organization.id}/${productRoute}/${product.id}`
                            )
                          }
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "center",
                            padding: "0.5rem",
                          }}
                        >
                          <Image
                            width={25}
                            height={25}
                            alt={product.image}
                            src={getImage(product.image)}
                          />
                          <p
                            style={{
                              margin: "0.1rem 0.5rem 0rem 1rem",
                            }}
                          >
                            {product.name}
                          </p>
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  )}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
