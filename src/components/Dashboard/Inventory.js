import React, { useEffect } from "react";
import gql from "graphql-tag/src";
import { useMutation, useQuery } from "@apollo/react-hooks";
// import styled from "@emotion/styled";

const INVENTORY = gql`
  {
    hopInventory {
      amount
      hop_id
    }
  }
`;

const ADD_ITEM = gql`
  mutation addHopInventory($amount: Int!, $hop_id: Int!) {
    addHopInventory(amount: $amount, hop_id: $hop_id)
  }
`;

const Inventory = (props) => {
  const { data = {}, loading, error } = useQuery(INVENTORY);
  const addItem = useMutation(ADD_ITEM)[0];

  return <div>Inventory</div>;
};

export default Inventory;
