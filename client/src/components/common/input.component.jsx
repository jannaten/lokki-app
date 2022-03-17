import { InputGroupTextStyle } from "../../styles";
import { InputGroup, FormControl } from "react-bootstrap";

export const InputGroups = ({ onChange, placeholder }) => (
  <InputGroup size="lg" className="mt-3">
    <FormControl
      aria-label="Large"
      onChange={onChange}
      className="rounded-0"
      placeholder={placeholder}
      aria-describedby="inputGroup-sizing-sm"
    />
    <InputGroupTextStyle className="rounded-0" id="inputGroup-sizing-lg">
      Search
    </InputGroupTextStyle>
  </InputGroup>
);
