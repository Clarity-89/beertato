import React from "react";
import { Button, Modal } from "semantic-ui-react";
import { ingredientTypes } from "../../constants";
import styled from "@emotion/styled";

const TotalsModal = ({ isOpen, onClose, data }) => {
  return (
    data && (
      <Modal onClose={onClose} open={isOpen}>
        <Modal.Header>Total ingredients</Modal.Header>
        <Modal.Content>
          {Object.entries(data).map(([type, item]) => {
            return (
              <div key={type}>
                <Header>{ingredientTypes.get(type)}</Header>
                {Object.entries(item).map(([name, value]) => {
                  return (
                    <div key={name}>
                      <Name>{name}:</Name> <strong>{value}</strong>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onClose}>Close</Button>
        </Modal.Actions>
      </Modal>
    )
  );
};

const Header = styled.h4`
  margin: 16px 0 !important;
`;

const Name = styled.span`
  display: inline-block;
  min-width: 50%;
`;
export default TotalsModal;
