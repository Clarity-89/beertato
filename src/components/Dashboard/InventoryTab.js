import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Loader } from "semantic-ui-react";
import { ErrorMessage } from "../../styled/Alerts";
import { InventoryTable, InventoryForm } from "./index";
import { queryMap } from "../../constants";

const cap = (str = "") => {
  return str[0].toUpperCase() + str.substring(1);
};

const getOptResponse = (name) => (type, { amount, item }) => {
  return {
    __typename: "Mutation",
    [type]: {
      __typename: `${cap(name)}Inventory`,
      id: (Math.random() * 1000).toString(),
      amount,
      item: {
        __typename: `${cap(name)}`,
        id: (Math.random() * 1000).toString(),
        name: item,
      },
    },
  };
};

export const InventoryTab = ({ type }) => {
  const queries = queryMap[type];
  const { data, loading, error } = useQuery(queries.list);
  const [addItem] = useMutation(queries.add);
  const [updateItem] = useMutation(queries.update);
  const [deleteItem] = useMutation(queries.delete);
  const optResponse = getOptResponse(type);

  const del = async (id) => {
    await deleteItem({
      variables: { id },
      update: (proxy, { data: { deleteItem: id } }) => {
        const data = proxy.readQuery({ query: queries.list });
        proxy.writeQuery({
          query: queries.list,
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
      optimisticResponse: optResponse("updateItem", {
        amount,
        item,
      }),
    });
  };

  const add = async ({ amount, item }) => {
    await addItem({
      variables: { amount, item_id: item },
      optimisticResponse: optResponse("addItem", {
        amount,
        item,
      }),
      update: (proxy, { data: { addItem } }) => {
        const data = proxy.readQuery({ query: queries.list });
        proxy.writeQuery({
          query: queries.list,
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
      <InventoryForm query={queries.selectList} addItem={save} />
    </>
  );
};
