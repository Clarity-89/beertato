import React from "react";
import gql from "graphql-tag/src";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Table, Tab, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../../styled/Alerts";
import { css } from "@emotion/core";

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
        <InventoryTable query={HOP_INVENTORY} />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Grains",
    render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
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
      hop {
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
      grain {
        name
        id
      }
    }
  }
`;

const ADD_ITEM = gql`
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

const InventoryTable = ({ query, mutation }) => {
  const { data, loading, error } = useQuery(query);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage />;
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
          {data.results.map((item) => (
            <Table.Row key={item.hop.id}>
              <Table.Cell>
                <Link to={`/data/hops/${item.hop.id}`}>{item.hop.name}</Link>
              </Table.Cell>
              <Table.Cell>{item.amount}</Table.Cell>
              <Table.Cell>Edit</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
