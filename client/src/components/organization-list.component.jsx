import { DataContext } from "../contexts";
import { useTheme } from "styled-components";
import { useContext, useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { OrganizationListRow, AddOrganizationModal } from ".";
import { Container, Table, Button, Row, Col } from "react-bootstrap";

function OrganizationsList() {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { organizations } = useContext(DataContext);

  let filteredOrganizations = [];
  filteredOrganizations = organizations.filter((el) => {
    if (el.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }
    return false;
  });

  return (
    <Row className="w-100 p-0 m-0">
      <Col>
        <Container style={{ marginTop: "8rem" }}>
          <h2>
            {filteredOrganizations.length > 1
              ? `${filteredOrganizations.length} organizations found`
              : `${filteredOrganizations.length} organization found`}
          </h2>
          <InputGroup size="lg" className="mt-3">
            <FormControl
              aria-label="Large"
              style={{ borderRadius: "0" }}
              aria-describedby="inputGroup-sizing-sm"
              placeholder="search organizations by name"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputGroup.Text
              style={{
                borderRadius: "0",
                color: theme.basic.bright,
                backgroundColor: theme.primary,
              }}
              id="inputGroup-sizing-lg"
            >
              Search
            </InputGroup.Text>
          </InputGroup>
          <Table responsive="sm" borderless>
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.basic.dark}` }}>
                <th>no.</th>
                <th>products</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrganizations &&
                filteredOrganizations.map((organization) => (
                  <OrganizationListRow
                    key={organization.id}
                    organization={organization}
                  />
                ))}
            </tbody>
          </Table>
          <Button
            variant=""
            onClick={() => setVisible(!visible)}
            style={{
              border: "none",
              borderRadius: "0",
              color: theme.basic.bright,
              background: theme.primary,
            }}
          >
            Add organization
          </Button>
          <AddOrganizationModal setVisible={setVisible} visible={visible} />
        </Container>
      </Col>
    </Row>
  );
}

export default OrganizationsList;
