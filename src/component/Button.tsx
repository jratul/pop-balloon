import styled from "@emotion/styled";

const Button = styled.button<{ disabled: boolean }>`
  font-size: 18px;
  color: white;
  background-color: ${props => (props.disabled ? "grey" : "#f87171")};
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  &:hover {
    background-color: ${props => (props.disabled ? "grey" : "#ef4444")};
  }
`;

export default Button;
