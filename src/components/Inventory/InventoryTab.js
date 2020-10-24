import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Loader } from "semantic-ui-react";
import { ErrorMessage } from "../../styled/Alerts";
import { InventoryTable, InventoryForm } from "./index";
import {
  ADD_INVENTORY,
  DELETE_INVENTORY,
  INVENTORY,
  UPDATE_INVENTORY,
} from "../../queries";

const optResponse = (queryType, { amount, item, type }) => {
  return {
    __typename: "Mutation",
    [queryType]: {
      __typename: "Inventory",
      id: Date.now().toString(10),
      amount,
      item: {
        __typename: "Item",
        id: Date.now().toString(10),
        name: item,
        type,
      },
    },
  };
};

const InventoryTab = ({ type }) => {
  const { data, loading, error } = useQuery(INVENTORY, { variables: { type } });
  const [addItem] = useMutation(ADD_INVENTORY);
  const [updateItem] = useMutation(UPDATE_INVENTORY);
  const [deleteItem] = useMutation(DELETE_INVENTORY);

  const del = async (id) => {
    await deleteItem({
      variables: { id },
      update: (proxy, { data: { deleteInventory: id } }) => {
        const data = proxy.readQuery({ query: INVENTORY, variables: { type } });
        proxy.writeQuery({
          query: INVENTORY,
          variables: { type },
          data: {
            ...data,
            inventory: data.inventory.filter((item) => item.id !== id),
          },
        });
      },
    });
  };

  const update = async (id, { amount, item }) => {
    await updateItem({
      variables: {
        id,
        amount: parseFloat(amount),
      },
      optimisticResponse: optResponse("updateInventory", {
        amount: parseFloat(amount),
        item,
        type,
      }),
    });
  };

  const add = async ({ amount, item }) => {
    await addItem({
      variables: { amount, item_id: item },
      optimisticResponse: optResponse("addInventory", {
        amount,
        item,
        type,
      }),
      update: (proxy, { data: { addInventory } }) => {
        const data = proxy.readQuery({ query: INVENTORY, variables: { type } });
        proxy.writeQuery({
          query: INVENTORY,
          variables: { type },
          data: {
            ...data,
            inventory: [...data.inventory, addInventory],
          },
        });
      },
    });
  };

  const save = async (formData) => {
    const item = data.inventory.find((it) => it.item.id === formData.item);
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
      {!data.inventory.length ? (
        <p>No data yet.</p>
      ) : (
        <InventoryTable
          items={data.inventory}
          type={type}
          updateItem={update}
          deleteItem={del}
        />
      )}
      <InventoryForm type={type} addItem={save} />
    </>
  );
};

export default InventoryTab;
