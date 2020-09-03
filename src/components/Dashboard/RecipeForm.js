import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/core";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button, Form } from "semantic-ui-react";
import { FieldSet } from "../../styled/Form";
import { formatLabel } from "../../services/utils/strings";
import ItemSelect from "../../styled/Dropdown/ItemSelect";
import { Row } from "../../styled/Layout/Layout";
import { ADJUNCT, GRAIN, HOP, YEAST } from "../../constants";

const baseFields = [
  "name",
  "description",
  "brewDate",
  "volume",
  "originalGravity",
  "finalGravity",
  "abv",
];

const ingredientTypes = new Map([
  [GRAIN, "Grains"],
  [HOP, "Hops"],
  [ADJUNCT, "Other"],
  [YEAST, "Yeast"],
]);

const NumberInput = ({ value, onChange, ...rest }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    onChange(parseFloat(value));
  };

  return (
    <input
      lang="en"
      type="number"
      step="any"
      onChange={handleChange}
      value={value || 0}
      {...rest}
    />
  );
};
/**
 *
 * RecipeForm
 *
 */
const RecipeForm = ({ onSave, recipe = {} }) => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: recipe,
  });
  const { fields, append } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <Form
      onSubmit={handleSubmit(onSave)}
      css={css`
        max-width: 1400px !important;
      `}
    >
      <FieldSet label="Basics">
        {baseFields.map((field) => {
          return (
            <Form.Field key={field} width={6}>
              <label htmlFor={field}>{formatLabel(field)}</label>
              <input
                id={field}
                name={`recipe.${field}`}
                defaultValue={recipe[field]}
                ref={register}
              />
            </Form.Field>
          );
        })}
      </FieldSet>

      <FieldSet label="Mash">
        <Form.Field width={6}>
          <label htmlFor="mashDuration">Mash duration (mins)</label>
          <input
            id="mashDuration"
            name="recipe.mashDuration"
            defaultValue={recipe.mashDuration}
            ref={register}
          />
        </Form.Field>
        <Form.Field width={6}>
          <label htmlFor="mashTemp">Mash temperature (&deg;C)</label>
          <input
            id="mashTemp"
            name="recipe.mashTemp"
            defaultValue={recipe.mashTemp}
            ref={register}
          />
        </Form.Field>
      </FieldSet>
      <FieldSet label="Boil">
        <Form.Field width={6}>
          <label htmlFor="boilVolume">Boil volume</label>
          <input
            id="boilVolume"
            name="recipe.boilVolume"
            defaultValue={recipe.boilVolume}
            ref={register}
          />
        </Form.Field>
        <Form.Field width={6}>
          <label htmlFor="boilDuration">Boil duration (mins)</label>
          <input
            id="boilDuration"
            name="recipe.boilDuration"
            defaultValue={recipe.boilDuration}
            ref={register}
          />
        </Form.Field>
      </FieldSet>
      <FieldSet label="Fermentation">
        <Form.Field width={6}>
          <label htmlFor="fermentationDuration">
            Fermentation duration (days)
          </label>
          <input
            id="fermentationDuration"
            name="recipe.fermentationDuration"
            defaultValue={recipe.fermentationDuration}
            ref={register}
          />
        </Form.Field>
        <Form.Field width={6}>
          <label htmlFor="fermentationTemp">
            Fermentation temperature (&deg;C)
          </label>
          <input
            id="fermentationTemp"
            name="recipe.fermentationTemp"
            defaultValue={recipe.fermentationTemp}
            ref={register}
          />
        </Form.Field>
      </FieldSet>

      {[...ingredientTypes].map(([ingredientType, label]) => {
        const hasTiming = [ADJUNCT, HOP].includes(ingredientType);
        return (
          <FieldSet key={ingredientType} label={label}>
            {fields.map((field, index) => {
              if (field?.item?.type !== ingredientType) return null;
              return (
                <Row key={`${field}-${index}`}>
                  <Form.Field width={hasTiming ? 5 : 6}>
                    <label>Name</label>
                    <Controller
                      name={`recipe.ingredients[${index}].item`}
                      control={control}
                      render={({ onChange }) => (
                        <ItemSelect
                          type={ingredientType}
                          defaultValue={field.item.id}
                          onChange={(_, { value }) => {
                            onChange(value);
                          }}
                        />
                      )}
                    />
                  </Form.Field>
                  <Form.Field width={hasTiming ? 5 : 6}>
                    <label htmlFor="amount">Amount</label>
                    <Controller
                      control={control}
                      defaultValue={field.amount}
                      name={`recipe.ingredients[${index}].amount`}
                      render={(props) => <NumberInput {...props} />}
                    />
                  </Form.Field>
                  {hasTiming && (
                    <Form.Field width={5}>
                      <label htmlFor="amount">Timing (minutes)</label>
                      <Controller
                        control={control}
                        defaultValue={field.timing}
                        name={`recipe.ingredients[${index}].timing`}
                        render={(props) => <NumberInput {...props} />}
                      />
                    </Form.Field>
                  )}
                </Row>
              );
            })}
            <Button
              type="button"
              onClick={() =>
                append({ item: { type: ingredientType }, amount: 0 })
              }
            >
              Add row
            </Button>
          </FieldSet>
        );
      })}
      <Button primary>{recipe.id ? "Update" : "Add"}</Button>
    </Form>
  );
};

RecipeForm.propTypes = {
  onSave: PropTypes.func,
  recipe: PropTypes.object,
};

export default RecipeForm;
