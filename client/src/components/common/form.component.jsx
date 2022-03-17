import { Form } from "react-bootstrap";

export const FormControl = ({
  type = "text",
  defaultValue,
  onChange,
  ...props
}) => (
  <Form.Control
    type={type}
    onChange={onChange}
    defaultValue={defaultValue}
    {...props}
  />
);

export const FormLabel = ({ text }) => (
  <Form.Label className="mt-2 ms-2">{text}</Form.Label>
);

export const FormSelect = ({ onClick, queries }) => (
  <Form.Select aria-label="Default select example" onClick={onClick}>
    {queries &&
      queries.map((query) => (
        <option key={query.id} value={query.id}>
          {query.name}
        </option>
      ))}
  </Form.Select>
);
