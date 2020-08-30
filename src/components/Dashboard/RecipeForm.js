import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/core";
import { useFieldArray, useForm } from "react-hook-form";
import { Button, Form } from "semantic-ui-react";
import { FieldSet } from "../../styled/Form";
import { formatLabel } from "../../services/utils/strings";

const baseFields = [
  "name",
  "description",
  "brewDate",
  "volume",
  "originalGravity",
  "finalGravity",
  "abv",
];

/**
 *
 * RecipeForm
 *
 */
const RecipeForm = ({ onSave, recipe = {} }) => {
  const { register, control, handleSubmit } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "recipe",
    }
  );
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
      <Button primary>{recipe.id ? "Update" : "Add"}</Button>
    </Form>
  );
};

RecipeForm.propTypes = {
  onSave: PropTypes.func,
  recipe: PropTypes.object,
};

export default RecipeForm;
