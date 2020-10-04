import React from "react";
import PropTypes from "prop-types";
// import styled from "@emotion/styled";
import { Button, Form } from "semantic-ui-react";
import { useForm, Controller } from "react-hook-form";
import { Select } from "../../styled/Form";
import { HOP, ingredientTypes } from "../../constants";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const ORIGINS = gql`
  query Origins {
    origins {
      id
      name
    }
  }
`;

export const GET_HOPS = gql`
  query GetHops {
    hops: items(type: HOP) {
      id
      name
    }
  }
`;

/**
 *
 * ItemForm
 *
 */
const ItemForm = (props) => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    errors,
    setValue,
  } = useForm();
  const { data, loading } = useQuery(ORIGINS);
  const { data: hopData, loading: hopLoading } = useQuery(GET_HOPS);
  const origins = loading
    ? []
    : data?.origins
        .filter((or) => or.id !== "0")
        .map((item) => ({
          label: item.name,
          value: item.id,
        }));
  const subs = hopLoading
    ? []
    : hopData.hops.map((hop) => ({ label: hop.name, value: hop.id }));
  const watchType = watch("type");
  const onSave = () => {};

  return (
    <div>
      <h3>Add item</h3>
      <Form onSubmit={handleSubmit(onSave)}>
        <Form.Field>
          <label>Name</label>
          <input type="text" name="name" ref={register} />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <textarea name="description" ref={register} />
        </Form.Field>
        <Form.Field>
          <label>Origin</label>
          <Controller
            name="origin"
            control={control}
            render={(props) => <Select options={origins} {...props} />}
          />
        </Form.Field>
        <Form.Field>
          <label>Type</label>
          <Controller
            name="type"
            control={control}
            render={({ onChange, ...props }) => (
              <Select
                options={[...ingredientTypes].map(([value, label]) => ({
                  label,
                  value,
                }))}
                onChange={(v) => onChange(v.value)}
                {...props}
              />
            )}
          />
        </Form.Field>
        {watchType === HOP && (
          <>
            <Form.Field>
              <label>Purpose</label>
              <Controller
                name="purpose"
                control={control}
                render={({ onChange, ...props }) => (
                  <Select
                    options={[
                      { label: "Bittering", value: "bittering" },
                      { label: "Aroma", value: "aroma" },
                      { label: "Dual", value: "bittering & aroma" },
                    ]}
                    onChange={(v) => onChange(v.value)}
                    {...props}
                  />
                )}
              />
            </Form.Field>
            <Form.Field>
              <label>Alpha Acid Composition</label>
              <input type="text" name="alphaAcid" ref={register} />
            </Form.Field>
            <Form.Field>
              <label>Beta Acid Composition</label>
              <input type="text" name="betaAcid" ref={register} />
            </Form.Field>
            <Form.Field>
              <label>Substitutes</label>
              <Controller
                name="substitutes"
                control={control}
                render={({ onChange, ...props }) => (
                  <Select
                    options={subs}
                    onChange={(v) => onChange(v.value)}
                    {...props}
                  />
                )}
              />
            </Form.Field>
          </>
        )}
      </Form>
    </div>
  );
};

ItemForm.propTypes = {};

export default ItemForm;
