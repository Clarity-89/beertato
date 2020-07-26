import React, { useEffect } from "react";
import gql from "graphql-tag/src";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import styled from "@emotion/styled";

const INVENTORY = gql`
  {
    hopInventory {
      amount
      hop {
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
  const { data = {}, loading, error } = useQuery(INVENTORY);
  // const addHop = useMutation(ADD_ITEM)[0];
  //
  // useEffect(() => {
  //   //addHop({ variables: { amount: 10, hop: 2 } });
  // }, []);

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
          {(data?.hopInventory || []).map((item) => (
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

export default Inventory;
