import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm, Controller } from "react-hook-form";
import { NumberInput, Select } from "../../styled/Form";
import { ADJUNCT, GRAIN, HOP, ingredientTypes, YEAST } from "../../constants";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { css } from "@emotion/core";

const ORIGINS = gql`
  query Origins {
    origins {
      id
      name
    }
  }
`;

const GET_HOPS = gql`
  query GetHops {
    hops: items(type: HOP) {
      id
      name
    }
  }
`;

const ADD_ITEM = gql`
  mutation AddItem($input: ItemInput!) {
    addItem(input: $input) {
      id
    }
  }
`;

/**
 *
 * ItemForm
 *
 */
const ItemForm = () => {
  const { register, watch, control, handleSubmit } = useForm();
  const { data, loading } = useQuery(ORIGINS);
  const { data: hopData, loading: hopLoading } = useQuery(GET_HOPS);
  const [addItem] = useMutation(ADD_ITEM);
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
  const onSave = async ({
    name,
    type,
    description,
    origin,
    yeastType,
    ...data
  }) => {
    if (yeastType) {
      data.type = yeastType;
    }
    const processedData = JSON.stringify(data);

    await addItem({
      variables: {
        input: { name, type, description, origin, data: processedData },
      },
    });

    window.location.reload();
  };

  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <h3>Add item</h3>
      <Form
        onSubmit={handleSubmit(onSave)}
        css={css`
          max-width: 800px !important;
          margin: 0 auto;
        `}
      >
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
            render={({ onChange, ...props }) => (
              <Select
                options={origins}
                {...props}
                onChange={(v) => onChange(v?.value)}
              />
            )}
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
                    onChange={(v) => onChange([v.value])}
                    {...props}
                  />
                )}
              />
            </Form.Field>
          </>
        )}
        {(watchType === GRAIN || watchType === ADJUNCT) && (
          <>
            <Form.Field>
              <label>Yield</label>
              <Controller
                control={control}
                name="yield"
                render={(props) => <NumberInput id="yield" {...props} />}
              />
            </Form.Field>
            <Form.Field>
              <label>Color</label>
              <Controller
                control={control}
                name="color"
                render={(props) => <NumberInput id="color" {...props} />}
              />
            </Form.Field>
            <Form.Field>
              <label>Protein</label>
              <Controller
                control={control}
                name="protein"
                render={(props) => <NumberInput id="protein" {...props} />}
              />
            </Form.Field>
          </>
        )}

        {watchType === YEAST && (
          <>
            <Form.Field>
              <label>Lab</label>
              <input type="text" name="lab" ref={register} />
            </Form.Field>
            <Form.Field>
              <label>Code</label>
              <input type="text" name="code" ref={register} />
            </Form.Field>
            <Form.Field>
              <label>Beer type</label>
              <input type="text" name="beerType" ref={register} />
            </Form.Field>
            <Form.Field>
              <label>Flocculation</label>
              <input type="text" name="flocculation" ref={register} />
            </Form.Field>
            <Form.Field>
              <label>Temperature</label>
              <input type="text" name="temperature" ref={register} />
            </Form.Field>
            <Form.Field>
              <label>Yeast Type</label>
              <Controller
                control={control}
                name="yeastType"
                render={({ onChange, ...props }) => (
                  <Select
                    options={[
                      { value: "liquid", label: "Liquid" },
                      { value: "dried", label: "Dried" },
                    ]}
                    onChange={(v) => onChange(v.value)}
                    {...props}
                  />
                )}
              />
            </Form.Field>
          </>
        )}
        <Button>Save</Button>
      </Form>
    </div>
  );
};

export default ItemForm;
