import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/core";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button, Form, Checkbox } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { FieldSet } from "../../styled/Form";
import { formatLabel } from "../../services/utils/strings";
import { ItemSelect } from "../../styled/Dropdown";
import { Row } from "../../styled/Layout/Layout";
import { ADJUNCT, HOP, ingredientTypes } from "../../constants";
import { FormFieldError } from "../../styled/Alerts";
import { NumberInput } from "../../styled/Form";
import { getAbv, getIBU, scaleRecipe } from "../../services/utils/calculations";
import { INVENTORY, UPDATE_INVENTORY_ITEMS } from "../../queries";

const textFields = ["name", "description", "brewDate"];
const numberFields = ["volume", "originalGravity", "finalGravity"];

const baseFields = [...textFields, ...numberFields];

/**
 *
 * RecipeForm
 *
 */
const RecipeForm = ({ onSave, recipe = {} }) => {
  const [updateInventory, setUpdateInventory] = useState(true);
  const { data = {} } = useQuery(INVENTORY);
  const [updateInventoryItems] = useMutation(UPDATE_INVENTORY_ITEMS);
  const { register, watch, control, handleSubmit, errors, setValue } = useForm({
    defaultValues: recipe,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });
  const watchOG = watch("originalGravity", recipe.originalGravity);
  const watchFG = watch("finalGravity", recipe.finalGravity);
  const watchIngredients = watch("ingredients", recipe.ingredients);
  const watchVolume = watch("volume", recipe.volume);
  const watchBoilVolume = watch("boilVolume", recipe.boilVolume);
  const watchBoilDuration = watch("boilDuration", recipe.boilDuration);

  const scaler = useMemo(() => scaleRecipe(recipe.boilVolume), [
    recipe.boilVolume,
  ]);

  const updateIngredients = () => {
    let updated = [];
    if (!recipe.ingredients) {
      updated = watchIngredients.map((ingredient) => {
        const found = data.inventory.find((i) => i.item.id === ingredient.item);
        if (found) {
          return { amount: found.amount - ingredient.amount, id: found.id };
        }
      });
    } else {
      updated = data.inventory.map((inv) => {
        const fromRecipe = recipe.ingredients.find(
          (i) => inv.item.id === i.item.id
        );
        const currItem = watchIngredients.find(
          (i) => i.item.id === inv.item.id
        );

        if (!currItem && !fromRecipe) return;
        const prev = fromRecipe?.amount || 0;
        const curr = currItem?.amount || 0;
        const delta = curr - prev;
        return { amount: inv.amount - delta, id: inv.id };
      });
    }

    const input = updated.filter(Boolean);
    if (input.length) {
      return updateInventoryItems({ variables: { input } });
    }
  };

  const handleSave = () => {
    if (updateInventory) {
      updateIngredients();
    }
    handleSubmit(onSave)();
  };

  return (
    <Form
      onSubmit={handleSave}
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
                  type={field === "brewDate" ? "date" : "text"}
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
        <Form.Field width={6}>
          <label>ABV</label>
          <Controller
            control={control}
            name="abv"
            render={(props) => <NumberInput id="abv" {...props} />}
          />
          <Button
            type="button"
            onClick={() => setValue("abv", getAbv(watchOG, watchFG))}
          >
            Calculate
          </Button>
        </Form.Field>
        <Form.Field width={6}>
          <label>IBU</label>
          <Controller
            control={control}
            name="ibu"
            render={(props) => <NumberInput id="ibu" {...props} />}
          />
          <Button
            type="button"
            onClick={() =>
              setValue(
                "ibu",
                getIBU(
                  watchIngredients.filter((ing) => ing.item.type === HOP),
                  watchOG,
                  watchVolume,
                  watchBoilDuration
                )
              )
            }
          >
            Calculate
          </Button>
        </Form.Field>
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
          <Button
            type="button"
            onClick={() => scaler(watchBoilVolume, watchIngredients, setValue)}
          >
            Scale
          </Button>
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
              const item = watchIngredients?.[index]?.item;
              const inInventory = item
                ? data.inventory?.find((inv) => {
                    return item.id
                      ? inv.item.id === item.id
                      : inv.item.id === item;
                  })
                : null;
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
                      render={({ onChange }) => (
                        <ItemSelect
                          defaultValue={field.item.id}
                          type={ingredientType}
                          onChange={(item) => {
                            onChange(item?.value);
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
                    {inInventory && (
                      <small>
                        Available in inventory:{" "}
                        <strong>{inInventory.amount}</strong> gr
                      </small>
                    )}
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

      <Form.Field>
        <Checkbox
          label="Update inventory items"
          checked={updateInventory}
          onChange={() => setUpdateInventory(!updateInventory)}
        />
      </Form.Field>
      <Button primary>{recipe.id ? "Update" : "Add"}</Button>
      {recipe.id && (
        <Button as={Link} to={`/dashboard/recipes/${recipe.id}`}>
          View
        </Button>
      )}
      <Button type="button" secondary as={Link} to={"/dashboard/recipes"}>
        Cancel
      </Button>
    </Form>
  );
};

RecipeForm.propTypes = {
  onSave: PropTypes.func,
  recipe: PropTypes.object,
};

export default RecipeForm;
