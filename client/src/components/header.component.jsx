import { routes } from "../config";
import { useContext } from "react";
import { FormControl, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { DataContext, DataChildContext } from "../contexts";
import { Nav, Navbar, Container, NavDropdown, Form } from "react-bootstrap";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { organizations } = useContext(DataContext);
  const { organization } = useContext(DataChildContext);

  const { organizationRoute, home, productRoute } = routes;
  const { organization_products } = organization;

  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        className="w-100"
        style={{
          position: "fixed",
          marginTop: "0rem",
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
                    >
                      {name}
                    </NavDropdown.Item>
                  ))}
              </NavDropdown>
              {location.pathname !== home && (
                <>
                  {organization_products && organization_products.length > 0 && (
                    <NavDropdown
                      title="product list"
                      id="navbarScrollingDropdown"
                    >
                      {organization_products.map(({ product }) => (
                        <NavDropdown.Item
                          key={product.id}
                          onClick={() =>
                            navigate(
                              `/${organizationRoute}/${organization.id}/${productRoute}/${product.id}`
                            )
                          }
                        >
                          {product.name}
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  )}
                </>
              )}
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
