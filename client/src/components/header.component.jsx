import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DataContext, DataChildContext } from "../contexts";
import { routes, endPoints, themePallate } from "../config";
import { NavBarHolderStyle, ThemePalleteStyle } from "../styles";
import { Nav, Navbar, Container, NavDropdown, Image } from "react-bootstrap";

function Header({ setTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { organizations } = useContext(DataContext);
  const { organization } = useContext(DataChildContext);

  const { getImage } = endPoints;
  const { organizationRoute, home, productRoute } = routes;

  const { organization_products } = organization;
  return (
    <NavBarHolderStyle>
      <Container fluid>
        <Navbar.Brand
          role="button"
          className="text-white"
          onClick={() => navigate(home)}
        >
          Lokki
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <NavDropdown
              className="text-white"
              title="organization list"
              id="navbarScrollingDropdown"
            >
              {organizations.length > 0 &&
                organizations.map(({ id, name }) => (
                  <NavDropdown.Item
                    key={id}
                    className="text-center p-2"
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
                        className="text-center"
                        key={product.id}
                        onClick={() =>
                          navigate(
                            `/${organizationRoute}/${organization.id}/${productRoute}/${product.id}`
                          )
                        }
                      >
                        <Image
                          width={25}
                          height={25}
                          className="m-1"
                          alt={product.image}
                          src={getImage(product.image)}
                        />
                        <span className="ms-2 me-4">{product.name}</span>
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                )}
              </>
            )}
          </Nav>
          <Nav className="pe-1" navbarScroll>
            {themePallate.map((theme) => (
              <ThemePalleteStyle
                bright
                key={theme.id}
                themeColor={theme.primary}
                onClick={() => {
                  // localStorage.setItem("name", theme.themeIdentity);
                  setTheme(theme.themeIdentity);
                }}
              />
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </NavBarHolderStyle>
  );
}

export default Header;
