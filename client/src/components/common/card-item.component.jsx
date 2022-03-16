import { Card } from "react-bootstrap";

export const CartItem = ({ onClick, src, title }) => (
  <div className="container">
    <Card
      className="text-center"
      style={{ cursor: "pointer", padding: "5rem" }}
      onClick={onClick}
    >
      <Card.Body>
        <Card.Img width={50} height={50} src={src} />
        <Card.Title style={{ marginTop: "2.3vw" }}>{title}</Card.Title>
      </Card.Body>
    </Card>
  </div>
);
