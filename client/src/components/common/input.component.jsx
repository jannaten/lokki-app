import { useTheme } from "styled-components";
import { InputGroup, FormControl } from "react-bootstrap";

export const InputGroups = ({ onChange, placeholder }) => {
  const theme = useTheme();
  return (
    <InputGroup size="lg" className="mt-3">
      <FormControl
        aria-label="Large"
        onChange={onChange}
        placeholder={placeholder}
        style={{ borderRadius: "0" }}
        aria-describedby="inputGroup-sizing-sm"
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
  );
};
