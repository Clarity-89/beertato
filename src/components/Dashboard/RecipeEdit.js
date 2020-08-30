import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import { useForm, useFieldArray } from "react-hook-form";
import { css } from "@emotion/core";
import { Form } from "semantic-ui-react";
import { GET_RECIPE } from "./queries";
import { LoaderScreen } from "../Loader";
import { ErrorMessage } from "../../styled/Alerts";
import { formatLabel } from "../../services/utils/strings";
import { FieldSet } from "../../styled/Form";

const baseFields = [
  "name",
  "volume",
  "boilVolume",
  "originalGravity",
  "finalGravity",
  "abv",
];
/**
 *
 * RecipeEdit
 *
 */
const RecipeEdit = ({ match }) => {
  const { data, loading, error } = useQuery(GET_RECIPE, {
    variables: { id: match.params.id },
  });
  const { register, control, handleSubmit } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "recipe",
    }
  );

  if (loading) {
    return <LoaderScreen />;
  }

  if (error) return <ErrorMessage />;

  const { recipe } = data;

  return (
    <>
      <h1>Edit Recipe</h1>
      <Form
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
            <label htmlFor="mashDuration">Mash duration (mins) </label>
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
        <FieldSet label="Fermentation">
          <Form.Field width={6}>
            <label htmlFor="fermentationDuration">
              Fermentation duration (mins){" "}
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
      </Form>
    </>
  );
};

RecipeEdit.propTypes = {
  match: PropTypes.object,
};

export default RecipeEdit;
