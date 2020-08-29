import React from "react";
import PropTypes from "prop-types";
// import styled from "@emotion/styled";
import { useQuery } from "@apollo/react-hooks";
import { useForm, useFieldArray } from "react-hook-form";
import { GET_RECIPE } from "./queries";
import { LoaderScreen } from "../Loader";
import { ErrorMessage } from "../../styled/Alerts";
import { Form } from "semantic-ui-react";
import { formatLabel } from "../../services/utils/strings";

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
      <Form>
        <fieldset>
          <legend>Basics</legend>
          {baseFields.map((field) => {
            return (
              <Form.Field key={field}>
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
        </fieldset>
      </Form>
    </>
  );
};

RecipeEdit.propTypes = {
  match: PropTypes.object,
};

export default RecipeEdit;
