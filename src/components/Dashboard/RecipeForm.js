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
import { FormFieldError } from "../../styled/Alerts";

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
  const { register, control, handleSubmit, errors } = useForm({
    defaultValues: recipe,
  });
  const { fields, append, remove } = useFieldArray({
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
            <Form.Field key={field} width={6} error={!!errors[field]}>
              <label htmlFor={field}>{formatLabel(field)}</label>
              <input
                id={field}
                name={`${field}`}
                defaultValue={recipe[field]}
                ref={register({
                  required: field === "name" && `${field} is required`,
                })}
              />
              {errors[field] && (
                <FormFieldError>{errors[field]?.message}</FormFieldError>
              )}
            </Form.Field>
          );
        })}
      </FieldSet>

      <FieldSet label="Mash">
        <Form.Field width={6}>
          <label htmlFor="mashDuration">Mash duration (mins)</label>
          <input
            id="mashDuration"
            name="mashDuration"
            defaultValue={recipe.mashDuration}
            ref={register}
          />
        </Form.Field>
        <Form.Field width={6}>
          <label htmlFor="mashTemp">Mash temperature (&deg;C)</label>
          <input
            id="mashTemp"
            name="mashTemp"
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
            name="boilVolume"
            defaultValue={recipe.boilVolume}
            ref={register}
          />
        </Form.Field>
        <Form.Field width={6}>
          <label htmlFor="boilDuration">Boil duration (mins)</label>
          <input
            id="boilDuration"
            name="boilDuration"
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
            name="fermentationDuration"
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
            name="fermentationTemp"
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
                  <Form.Field
                    width={hasTiming ? 4 : 6}
                    error={!!errors?.ingredients?.[index]?.item}
                  >
                    <label>Name</label>
                    <Controller
                      name={`ingredients[${index}].item`}
                      control={control}
                      rules={{ required: "Ingredient name is required" }}
                      defaultValue={field.item.id}
                      render={({ onChange }) => (
                        <ItemSelect
                          defaultValue={field.item.id}
                          type={ingredientType}
                          onChange={(_, { value }) => {
                            onChange(value);
                          }}
                        />
                      )}
                    />
                    {!!errors?.ingredients?.[index]?.item && (
                      <FormFieldError>
                        {errors?.ingredients?.[index]?.item.message}
                      </FormFieldError>
                    )}
                  </Form.Field>
                  <Form.Field width={hasTiming ? 4 : 6}>
                    <label htmlFor="amount">Amount</label>
                    <Controller
                      control={control}
                      defaultValue={field.amount}
                      name={`ingredients[${index}].amount`}
                      render={(props) => <NumberInput {...props} />}
                    />
                  </Form.Field>
                  {hasTiming && (
                    <Form.Field width={4}>
                      <label htmlFor="amount">Timing (minutes)</label>
                      <Controller
                        control={control}
                        defaultValue={field.timing}
                        name={`ingredients[${index}].timing`}
                        render={(props) => <NumberInput {...props} />}
                      />
                    </Form.Field>
                  )}

                  <Button type="button" onClick={() => remove(index)}>
                    Delete
                  </Button>
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
