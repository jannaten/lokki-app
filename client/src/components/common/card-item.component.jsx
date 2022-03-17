import { Card } from "react-bootstrap";

export const CartItem = ({ onClick, src, title }) => (
  <div className="container">
    <Card role="button" className="text-center p-5 my-4" onClick={onClick}>
      <Card.Body>
        <Card.Img width={50} height={50} src={src} />
        <Card.Title className="mt-5">{title}</Card.Title>
      </Card.Body>
    </Card>
  </div>
);
