import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Table, Tab, Loader, Form, Dropdown, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../../styled/Alerts";
import { css } from "@emotion/core";
import { useForm, Controller } from "react-hook-form";
import {
  HOP_INVENTORY,
  ADD_HOP_ITEM,
  GET_HOPS,
  GRAIN_INVENTORY,
} from "./queries";

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

const InventoryTable = ({ items, type }) => {
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
          {items.map(({ item, amount }) => (
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

const InventoryForm = ({ query, addItem }) => {
  const { register, handleSubmit, errors, control } = useForm();
  const { data, loading } = useQuery(query);

  const submit = (data) => {
    return addItem(data);
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

const HopInventory = () => {
  const { data, loading, error, refetch } = useQuery(HOP_INVENTORY);
  const [addItem] = useMutation(ADD_HOP_ITEM);

  const save = async ({ amount, item }) => {
    await addItem({ variables: { amount, hop: item } });
    return refetch();
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (!data.results.length) {
    return <p>No data yet.</p>;
  }
  return (
    <>
      <InventoryTable items={data.results} type={"hops"} />
      <InventoryForm query={GET_HOPS} addItem={save} />
    </>
  );
};
