import { DataContext } from "../contexts";
import { useContext, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { OrganizationListRow, AddOrganizationModal } from "../components";

function OrganizationsList() {
  const [visible, setVisible] = useState(false);
  const { organizations } = useContext(DataContext);
  return (
    <Container>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>no.</th>
            <th>products</th>
          </tr>
        </thead>
        <tbody>
          {organizations &&
            organizations.map((organization) => (
              <OrganizationListRow
                key={organization.id}
                organization={organization}
              />
            ))}
        </tbody>
      </Table>
      <Button onClick={() => setVisible(!visible)}>Add an organization</Button>
      <AddOrganizationModal setVisible={setVisible} visible={visible} />
    </Container>
  );
}

export default OrganizationsList;
