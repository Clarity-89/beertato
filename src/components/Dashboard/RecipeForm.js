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
import { NumberInput } from "../../styled/Form";

const textFields = ["name", "description", "brewDate"];
const numberFields = ["volume", "originalGravity", "finalGravity", "abv"];

const baseFields = [...textFields, ...numberFields];
const ingredientTypes = new Map([
  [GRAIN, "Grains"],
  [HOP, "Hops"],
  [ADJUNCT, "Other"],
  [YEAST, "Yeast"],
]);

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
              {numberFields.includes(field) ? (
                <Controller
                  control={control}
                  defaultValue={recipe[field]}
                  name={field}
                  render={(props) => <NumberInput id={field} {...props} />}
                />
              ) : (
                <input
                  id={field}
                  name={field}
                  defaultValue={recipe[field]}
                  ref={register({
                    required: field === "name" && `${field} is required`,
                  })}
                />
              )}
              {errors[field] && (
                <FormFieldError>{errors[field]?.message}</FormFieldError>
              )}
            </Form.Field>
          );
        })}
      </FieldSet>

      <FieldSet label="Mash">
        <Form.Field width={6}>
          <label htmlFor="mashDuration">Mash duration (minutes)</label>
          <Controller
            control={control}
            defaultValue={recipe.mashDuration}
            name="mashDuration"
            render={(props) => <NumberInput id="mashDuration" {...props} />}
          />
        </Form.Field>
        <Form.Field width={6}>
          <label htmlFor="mashTemp">Mash temperature (&deg;C)</label>
          <Controller
            control={control}
            defaultValue={recipe.mashTemp}
            name="mashTemp"
            render={(props) => <NumberInput id="mashTemp" {...props} />}
          />
        </Form.Field>
      </FieldSet>
      <FieldSet label="Boil">
        <Form.Field width={6}>
          <label htmlFor="boilVolume">Boil volume (L)</label>
          <Controller
            control={control}
            defaultValue={recipe.boilVolume}
            name="boilVolume"
            render={(props) => <NumberInput id="boilVolume" {...props} />}
          />
        </Form.Field>
        <Form.Field width={6}>
          <label htmlFor="boilDuration">Boil duration (minutes)</label>
          <Controller
            control={control}
            defaultValue={recipe.boilDuration}
            name="boilDuration"
            render={(props) => <NumberInput id="boilDuration" {...props} />}
          />
        </Form.Field>
      </FieldSet>
      <FieldSet label="Fermentation">
        <Form.Field width={6}>
          <label htmlFor="fermentationDuration">
            Fermentation duration (days)
          </label>
          <Controller
            control={control}
            defaultValue={recipe.fermentationDuration}
            name="fermentationDuration"
            render={(props) => (
              <NumberInput id="fermentationDuration" {...props} />
            )}
          />
        </Form.Field>
        <Form.Field width={6}>
          <label htmlFor="fermentationTemp">
            Fermentation temperature (&deg;C)
          </label>
          <Controller
            control={control}
            defaultValue={recipe.fermentationTemp}
            name="fermentationTemp"
            render={(props) => <NumberInput id="fermentationTemp" {...props} />}
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
