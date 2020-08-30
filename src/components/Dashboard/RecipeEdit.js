import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import { GET_RECIPE } from "./queries";
import { LoaderScreen } from "../Loader";
import { ErrorMessage } from "../../styled/Alerts";
import { RecipeForm } from "./index";

/**
 *
 * RecipeEdit
 *
 */
const RecipeEdit = ({ match }) => {
  const { data, loading, error } = useQuery(GET_RECIPE, {
    variables: { id: match.params.id },
  });

  if (loading) {
    return <LoaderScreen />;
  }

  if (error) return <ErrorMessage />;

  return (
    <>
      <h1>Edit Recipe</h1>
      <RecipeForm recipe={data.recipe} />
    </>
  );
};

RecipeEdit.propTypes = {
  match: PropTypes.object,
};

export default RecipeEdit;
