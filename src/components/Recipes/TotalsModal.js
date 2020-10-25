import React from "react";
import { Button, Modal } from "semantic-ui-react";

const TotalsModal = ({ isOpen, onClose, data }) => {
  return (
    data && (
      <Modal onClose={onClose} open={isOpen}>
        <Modal.Header>Total ingredients</Modal.Header>
        <Modal.Content>
          {Object.entries(data).map(([name, value]) => {
            return (
              <p key={name}>
                {name}: <strong>{value}</strong>
              </p>
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

export default TotalsModal;
