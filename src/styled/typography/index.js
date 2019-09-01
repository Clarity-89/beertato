import styled from "styled-components";

export const Text = styled.p`
  font-weight: ${({ bold }) => (bold ? "bold" : "regular")};
`;
