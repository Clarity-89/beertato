import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Table, Tab, Loader, Form, Dropdown, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { css } from "@emotion/core";
import { useForm, Controller } from "react-hook-form";
import { GRAIN_INVENTORY } from "./queries";
import { HopInventory } from "./HopInventory";

const paneStyles = css`
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
`;

const panes = [
  {
    menuItem: "Hops",
    render: () => (
      <Tab.Pane attached={false} css={paneStyles}>
        <HopInventory />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Grains",
    render: () => (
      <Tab.Pane attached={false} css={paneStyles}>
        <InventoryTable query={GRAIN_INVENTORY} type={"grains"} />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Adjuncts",
    render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
  },
];

const Inventory = (props) => {
  return (
    <Tab
      menu={{
        borderless: true,
        attached: false,
        secondary: true,
        pointing: true,
      }}
      panes={panes}
    />
  );
};

export default Inventory;

export const InventoryTable = ({ items, type }) => {
  return (
    <div>
      <h3>Inventory</h3>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Amount (gr)</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {items
            .sort((a, b) => a.item.name.localeCompare(b.item.name))
            .map(({ item, amount }) => (
              <Table.Row key={item.id}>
                <Table.Cell>
                  <Link to={`/data/${type}/${item.id}`}>{item.name}</Link>
                </Table.Cell>
                <Table.Cell>{amount}</Table.Cell>
                <Table.Cell>Edit</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export const InventoryForm = ({ query, addItem }) => {
  const { register, handleSubmit, errors, control } = useForm();
  const { data, loading } = useQuery(query);

  const submit = (formData) => {
    return addItem(formData);
  };

  return (
    <Form
      onSubmit={handleSubmit(submit)}
      css={css`
        margin-top: 50px;
        width: 400px;
      `}
    >
      <Form.Field>
        {loading ? (
          <Loader />
        ) : (
          <>
            <label>Item</label>
            <Controller
              name="item"
              control={control}
              render={({ onChange }) => (
                <Dropdown
                  placeholder="Select item"
                  search
                  selection
                  options={data.results.map(({ id, name }) => ({
                    key: id,
                    text: name,
                    value: id,
                  }))}
                  onChange={(_, { value }) => {
                    onChange(value);
                  }}
                />
              )}
            />
          </>
        )}
      </Form.Field>
      <Form.Field error={!!errors.amount}>
        <label>Amount</label>
        <input
          placeholder="Amount"
          name="amount"
          type="number"
          ref={register({ required: "Amount is required" })}
        />
      </Form.Field>
      <Button type="submit" disabled={loading}>
        Submit
      </Button>
    </Form>
  );
};
