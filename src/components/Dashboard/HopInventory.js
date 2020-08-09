import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Loader } from "semantic-ui-react";
import {
  ADD_HOP_ITEM,
  UPDATE_HOP_ITEM,
  GET_HOPS,
  HOP_INVENTORY,
  DELETE_HOP_ITEM,
} from "./queries";
import { ErrorMessage } from "../../styled/Alerts";
import { InventoryTable, InventoryForm } from "./index";

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

export const HopInventory = ({ type }) => {
  const { data, loading, error } = useQuery(HOP_INVENTORY);
  const [addItem] = useMutation(ADD_HOP_ITEM);
  const [updateItem] = useMutation(UPDATE_HOP_ITEM);
  const [deleteItem] = useMutation(DELETE_HOP_ITEM);

  const del = async (id) => {
    await deleteItem({
      variables: { id },
      update: (proxy, { data: { deleteItem: id } }) => {
        const data = proxy.readQuery({ query: HOP_INVENTORY });
        proxy.writeQuery({
          query: HOP_INVENTORY,
          data: {
            ...data,
            results: data.results.filter((item) => item.id !== id),
          },
        });
      },
    });
  };

  const update = async (id, { amount, item }) => {
    await updateItem({
      variables: {
        id,
        amount,
      },
      optimisticResponse: hopOptResponse("updateItem", {
        amount,
        item,
      }),
    });
  };

  const add = async ({ amount, item }) => {
    await addItem({
      variables: { amount, hop: item },
      optimisticResponse: hopOptResponse("addItem", {
        amount,
        item,
      }),
      update: (proxy, { data: { addItem } }) => {
        const data = proxy.readQuery({ query: HOP_INVENTORY });
        proxy.writeQuery({
          query: HOP_INVENTORY,
          data: {
            ...data,
            results: [...data.results, addItem],
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

  return (
    <>
      {!data.results.length ? (
        <p>No data yet.</p>
      ) : (
        <InventoryTable
          items={data.results}
          type={type}
          updateItem={update}
          deleteItem={del}
        />
      )}
      <InventoryForm query={GET_HOPS} addItem={save} />
    </>
  );
};
