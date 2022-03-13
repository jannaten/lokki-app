import { DataContext } from "../contexts";
import { useContext, useState } from "react";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { OrganizationListRow, AddOrganizationModal } from "../components";

function OrganizationsList() {
  const [visible, setVisible] = useState(false);
  const { organizations } = useContext(DataContext);
  return (
    <Row className="w-100 p-0 m-0">
      <Col>
        <Container style={{ marginTop: "5rem" }}>
          <Table responsive="sm" borderless>
            <thead>
              <tr style={{ borderBottom: "1px solid #212529" }}>
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
          <Button
            variant="dark"
            onClick={() => setVisible(!visible)}
            style={{ border: "none", borderRadius: "0" }}
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
