import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/react-hooks";
import { LoaderScreen } from "../Loader";
import { ErrorMessage } from "../../styled/Alerts";
import { GET_RECIPE } from "./queries";

/**
 *
 * RecipeDetail
 *
 */
const RecipeDetail = ({ match }) => {
  const { data, loading, error } = useQuery(GET_RECIPE, {
    variables: { id: match.params.id },
  });

  if (loading) {
    return <LoaderScreen />;
  }

  if (error) return <ErrorMessage />;

  return (
    <div>
      <Header>
        <h1>{data.recipe.name}</h1>
        <Link to={`${match.url}/edit`}>Edit</Link>
      </Header>
    </div>
  );
};

RecipeDetail.propTypes = {
  match: PropTypes.object,
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default RecipeDetail;
