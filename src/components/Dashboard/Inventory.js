import React from "react";
import gql from "graphql-tag/src";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Table, Tab, Loader, Form, Dropdown, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../../styled/Alerts";
import { css } from "@emotion/core";
import { useForm, Control } from "react-hook-form";

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
        <InventoryTable query={HOP_INVENTORY} type={"hops"} />
        <InventoryForm mutation={ADD_HOP_ITEM} />
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

const HOP_INVENTORY = gql`
  {
    results: hopInventory {
      amount
      item: hop {
        name
        id
      }
    }
  }
`;

const GRAIN_INVENTORY = gql`
  {
    results: grainInventory {
      amount
      item: grain {
        name
        id
      }
    }
  }
`;

const GET_HOPS = gql`
  {
    results: hops {
      id
      name
    }
  }
`;

const ADD_HOP_ITEM = gql`
  mutation addHopInventory($amount: Int!, $hop: Int!) {
    addHopInventory(amount: $amount, hop: $hop)
  }
`;

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

const InventoryTable = ({ query, mutation, type }) => {
  const { data, loading, error } = useQuery(query);

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
          {data.results.map(({ item, amount }) => (
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

const InventoryForm = ({ mutation, type }) => {
  const { register, handleSubmit, errors } = useForm();
  const { data, loading, error } = useQuery(GET_HOPS);

  const [addItem] = useMutation(mutation);
  const submit = (formData) => {
    console.log("d", formData);
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
            <Dropdown
              placeholder="Select item"
              search
              selection
              options={data.results.map(({ id, name }) => ({
                key: id,
                text: name,
                value: id,
              }))}
            />
          </>
        )}
      </Form.Field>
      <Form.Field error={!!errors.amount}>
        <label>Amount</label>
        <input
          placeholder="Amount"
          name="amount"
          ref={register({ required: "Amount is required" })}
        />
      </Form.Field>
      <Button type="submit" disabled={loading}>
        Submit
      </Button>
    </Form>
  );
};
