import React from "react";
import PropTypes from "prop-types";
// import styled from "@emotion/styled";
import gql from "graphql-tag";

const GET_RECIPES = gql`
  {
    recipes {
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
 * RecipeList
 *
 */
const RecipeList = (props) => {
  return <div>RecipeList</div>;
};

RecipeList.propTypes = {};

export default RecipeList;
