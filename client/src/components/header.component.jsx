import { useContext } from "react";
import { useTheme } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { DataContext, DataChildContext } from "../contexts";
import { routes, endPoints, themePallate } from "../config";
import { Nav, Navbar, Container, NavDropdown, Image } from "react-bootstrap";

function Header({ setTheme }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { organizations } = useContext(DataContext);
  const { organization } = useContext(DataChildContext);

  const { getImage } = endPoints;
  const { organizationRoute, home, productRoute } = routes;

  const { organization_products } = organization;
  return (
    <>
      <Navbar
        className="w-100"
        style={{
          backgroundColor: theme.primary,
          position: "fixed",
          marginTop: "0rem",
          zIndex: "7",
        }}
      >
        <Container fluid>
          <Navbar.Brand
            style={{ cursor: "pointer", color: theme.basic.bright }}
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
                style={{ color: theme.basic.bright }}
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
                          style={{
                            display: "flex",
                            padding: "0.5rem",
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "center",
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
            <Nav
              style={{ maxHeight: "100px", paddingRight: "1rem" }}
              navbarScroll
            >
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  marginLeft: "5rem",
                  borderRadius: "10%",
                  marginTop: "0.3rem",
                  marginRight: "0.3rem",
                  backgroundColor: theme.primary,
                  border: `0.25rem solid #FFFFFF7F`,
                  boxShadow: `0rem 0rem 0.25rem #0000007F`,
                }}
              ></div>
              <NavDropdown
                title="theme"
                style={{ marginRight: "4rem" }}
                id="navbarScrollingDropdown"
              >
                {themePallate.map((theme) => (
                  <NavDropdown.Item
                    key={theme.id}
                    style={{
                      display: "flex",
                      padding: "0.5rem",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                    onClick={() => {
                      localStorage.setItem("name", theme.themeIdentity);
                      // setTheme(theme.themeIdentity);
                      setTheme(true);
                    }}
                  >
                    <div
                      style={{
                        width: "2rem",
                        height: "2rem",
                        marginLeft: "1rem",
                        marginRight: "1rem",
                        borderRadius: "10%",
                        backgroundColor: theme.primary,
                        boxShadow: `0rem 0rem 0.25rem #0000007F`,
                        border: `0.25rem solid ${theme.secondary}7F`,
                      }}
                    ></div>
                    {theme.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
