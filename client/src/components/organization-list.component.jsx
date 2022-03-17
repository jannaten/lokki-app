import { InputGroups } from ".";
import { DataContext } from "../contexts";
import { useContext, useState } from "react";
import { Table, Row, Col } from "react-bootstrap";
import { OrganizationContainerStyle } from "../styles";
import { OrganizationTableHeaderStyle } from "../styles";
import { OrganizationListRow, AddOrganizationModal, CustomButton } from ".";

function OrganizationsList() {
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
        <OrganizationContainerStyle>
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
              <OrganizationTableHeaderStyle>
                <th>no.</th>
                <th>products</th>
              </OrganizationTableHeaderStyle>
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
        </OrganizationContainerStyle>
      </Col>
    </Row>
  );
}

export default OrganizationsList;
