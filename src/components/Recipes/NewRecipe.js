import React, { useState } from "react";
import gql from "graphql-tag/src";
import { useMutation } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import { GET_RECIPES } from "../../queries";
import { RecipeForm } from "./index";
import { processFormData } from "../../services/utils/form";

const ADD_RECIPE = gql`
  mutation AddRecipe($input: RecipeInput!) {
    addRecipe(input: $input) {
      id
      name
      volume
      abv
      ibu
      brewDate
    }
  }
`;

/**
 *
 * NewRecipe
 *
 */
const NewRecipe = () => {
  const [addRecipe, { loading, error }] = useMutation(ADD_RECIPE);
  const [redirect, setRedirect] = useState(false);

  const onSave = async (formData) => {
    const input = processFormData(formData);
    await addRecipe({
      variables: { input },
      update: (proxy, { data: { addRecipe } }) => {
        const data = proxy.readQuery({ query: GET_RECIPES });
        proxy.writeQuery({
          query: GET_RECIPES,
          data: {
            ...data,
            recipes: [...data.recipes, addRecipe],
          },
        });
      },
    });
    setRedirect(true);
  };

  if (loading) {
    return <Loader />;
  }

  if (redirect) {
    return <Redirect to="/dashboard/recipes" />;
  }

  return (
    <>
      {error && <p>Failed to save recipe</p>}
      <h1>Add new recipe</h1>
      <RecipeForm onSave={onSave} />
    </>
  );
};

export default NewRecipe;
