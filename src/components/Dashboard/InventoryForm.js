import React from "react";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "@apollo/react-hooks";
import { Button, Dropdown, Form, Loader } from "semantic-ui-react";
import { css } from "@emotion/core";
import { GET_ITEMS } from "./queries";

export const InventoryForm = ({ type, addItem }) => {
  const { register, handleSubmit, errors, control } = useForm();
  const { data, loading } = useQuery(GET_ITEMS, { variables: { type } });

  const submit = (formData) => {
    return addItem({ ...formData, amount: parseFloat(formData.amount) });
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
                  options={data.items.map(({ id, name }) => ({
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

InventoryForm.propTypes = {
  query: PropTypes.object,
  addItem: PropTypes.func,
};

export default InventoryForm;
