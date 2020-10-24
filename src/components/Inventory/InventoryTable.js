import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Confirm, Input, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

const defaultEdited = { id: 0, item: null, amount: 0 };

export const InventoryTable = ({ items, type, updateItem, deleteItem }) => {
  const [edited, setEdited] = useState(defaultEdited);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const changeAmount = (_, { value }) => {
    setEdited((ed) => ({ ...ed, amount: value }));
  };

  const saveOnEnter = ({ key }) => {
    if (key === "Enter") {
      return onSave();
    }
  };

  const onSave = () => {
    const { id, ...rest } = edited;
    const original = items.find((it) => it.id === id);
    setEdited(defaultEdited);
    if (original.amount === rest.amount) {
      return;
    }
    updateItem(id, rest);
  };

  return (
    <div>
      <h3>Inventory</h3>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={6}>Name</Table.HeaderCell>
            <Table.HeaderCell width={6}>Amount (gr)</Table.HeaderCell>
            <Table.HeaderCell width={6} />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {items
            .sort((a, b) => a.item.name.localeCompare(b.item.name))
            .map(({ item, amount, id }) => (
              <Table.Row key={item.id}>
                <Table.Cell>
                  <Link to={`/data/${type}/${item.id}`}>{item.name}</Link>
                </Table.Cell>
                <Table.Cell>
                  {edited.item?.id !== item.id ? (
                    amount
                  ) : (
                    <Input
                      type="number"
                      value={edited.amount}
                      onChange={changeAmount}
                      onKeyDown={saveOnEnter}
                    />
                  )}
                </Table.Cell>
                <Table.Cell>
                  {edited.item?.id !== item.id ? (
                    <Button onClick={() => setEdited({ id, item, amount })}>
                      Edit
                    </Button>
                  ) : (
                    <Button onClick={onSave} positive>
                      Save
                    </Button>
                  )}
                  <Button negative onClick={() => setIsConfirmOpen(true)}>
                    Delete
                  </Button>
                  <Confirm
                    open={isConfirmOpen}
                    onCancel={() => setIsConfirmOpen(false)}
                    onConfirm={() => {
                      deleteItem(id);
                      setIsConfirmOpen(false);
                    }}
                  />
                  <Confirm
                    open={isConfirmOpen}
                    onCancel={() => setIsConfirmOpen(false)}
                    onConfirm={() => {
                      deleteItem(id);
                      setIsConfirmOpen(false);
                    }}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

InventoryTable.propTypes = {
  items: PropTypes.array,
  type: PropTypes.string,
  updateItem: PropTypes.func,
  deleteItem: PropTypes.func,
};

export default InventoryTable;
