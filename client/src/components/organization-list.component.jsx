import { InputGroups } from ".";
import { DataContext } from "../contexts";
import { useTheme } from "styled-components";
import { useContext, useState } from "react";
import { Container, Table, Row, Col } from "react-bootstrap";
import { OrganizationListRow, AddOrganizationModal, CustomButton } from ".";

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
          <InputGroups
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search organizations by name"
          />
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
          <CustomButton
            text="Add organization"
            onClick={() => setVisible(!visible)}
          />
          <AddOrganizationModal setVisible={setVisible} visible={visible} />
        </Container>
      </Col>
    </Row>
  );
}

export default OrganizationsList;
