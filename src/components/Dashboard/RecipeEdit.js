import React from "react";
import PropTypes from "prop-types";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_RECIPE, RECIPE_FIELDS } from "./queries";
import { LoaderScreen } from "../Loader";
import { ErrorMessage } from "../../styled/Alerts";
import { RecipeForm } from "./index";
import gql from "graphql-tag/src";
import { processFormData } from "../../services/utils/form";

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($id: ID!, $input: RecipeInput!) {
    updateRecipe(id: $id, input: $input) {
      ...RecipeFields
    }
  }
  ${RECIPE_FIELDS}
`;
/**
 *
 * RecipeEdit
 *
 */
const RecipeEdit = ({ match }) => {
  const { id } = match.params;
  const [
    updateRecipe,
    { loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_RECIPE);
  const { data, loading, error } = useQuery(GET_RECIPE, {
    variables: { id },
  });

  if (loading || updateLoading) {
    return <LoaderScreen />;
  }

  if (error || updateError) return <ErrorMessage />;

  const onUpdate = async (formData) => {
    const input = processFormData(formData);
    await updateRecipe({
      variables: { id, input },
      update: (proxy, { data: { updateRecipe } }) => {
        const data = proxy.readQuery({ query: GET_RECIPE, variables: { id } });
        proxy.writeQuery({
          query: GET_RECIPE,
          variables: { id },
          data: {
            ...data,
            recipe: { ...data.recipe, ...updateRecipe },
          },
        });
      },
    });
  };

  return (
    <>
      <h1>Edit Recipe</h1>
      <RecipeForm recipe={data.recipe} onSave={onUpdate} />
    </>
  );
};

RecipeEdit.propTypes = {
  match: PropTypes.object,
};

export default RecipeEdit;
