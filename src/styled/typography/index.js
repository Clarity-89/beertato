import styled from "@emotion/styled";

export const Text = styled.p`
  font-weight: ${({ bold }) => (bold ? "bold" : "regular")};
`;
