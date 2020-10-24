import React from "react";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { Button, Form } from "semantic-ui-react";
import { css } from "@emotion/core";
import { ItemSelect } from "../../styled/Dropdown";

export const InventoryForm = ({ type, addItem }) => {
  const { register, handleSubmit, errors, control, reset } = useForm();

  const submit = (formData) => {
    addItem({ ...formData, amount: parseFloat(formData.amount) });
    reset();
  };

  const submitOnEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit(submit)();
    }
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
        <Controller
          name="item"
          control={control}
          render={({ onChange }) => (
            <ItemSelect
              label="Item"
              type={type}
              onChange={(item) => {
                onChange(item?.value);
              }}
            />
          )}
        />
      </Form.Field>
      <Form.Field error={!!errors.amount}>
        <label>Amount</label>
        <input
          onKeyDown={submitOnEnter}
          placeholder="Amount"
          name="amount"
          type="number"
          ref={register({ required: "Amount is required" })}
        />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

InventoryForm.propTypes = {
  query: PropTypes.object,
  addItem: PropTypes.func,
};

export default InventoryForm;
