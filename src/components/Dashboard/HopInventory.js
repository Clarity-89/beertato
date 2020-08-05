import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Loader } from "semantic-ui-react";
import {
  ADD_HOP_ITEM,
  UPDATE_HOP_ITEM,
  GET_HOPS,
  HOP_INVENTORY,
} from "./queries";
import { ErrorMessage } from "../../styled/Alerts";
import { InventoryTable, InventoryForm } from "./Inventory";

const hopOptResponse = (type, { amount, item }) => {
  return {
    __typename: "Mutation",
    [type]: {
      __typename: "HopInventory",
      id: (Math.random() * 1000).toString(),
      amount,
      item: {
        __typename: "Hop",
        id: (Math.random() * 1000).toString(),
        name: item,
      },
    },
  };
};

export const HopInventory = () => {
  const { data, loading, error } = useQuery(HOP_INVENTORY);
  const [addItem] = useMutation(ADD_HOP_ITEM);
  const [updateItem] = useMutation(UPDATE_HOP_ITEM);

  const update = async (id, { amount, item }) => {
    await updateItem({
      variables: {
        id,
        amount,
      },
      optimisticResponse: hopOptResponse("updateHopInventory", {
        amount,
        item,
      }),
    });
  };

  const add = async ({ amount, item }) => {
    await addItem({
      variables: { amount, hop: item },
      optimisticResponse: hopOptResponse("addHopInventory", {
        amount,
        item,
      }),
      update: (proxy, { data: { addHopInventory } }) => {
        const data = proxy.readQuery({ query: HOP_INVENTORY });
        proxy.writeQuery({
          query: HOP_INVENTORY,
          data: {
            ...data,
            results: [...data.results, addHopInventory],
          },
        });
      },
    });
  };

  const save = async (formData) => {
    const item = data.results.find((it) => it.item.id === formData.item);
    if (item) {
      return update(item.id, formData);
    }
    return add(formData);
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
      <InventoryForm query={GET_HOPS} addItem={save} updateItem={update} />
    </>
  );
};