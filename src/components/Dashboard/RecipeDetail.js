import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/react-hooks";
import { LoaderScreen } from "../Loader";
import { ErrorMessage } from "../../styled/Alerts";
import { GET_RECIPE } from "./queries";
import { formatLabel } from "../../services/utils/strings";
import { List } from "../../styled/List";

const basicsFields = [
  "volume",
  "boilVolume",
  "abv",
  "originalGravity",
  "finalGravity",
];
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

  const { recipe } = data;
  return (
    <div>
      <PageHeader>
        <h1>{recipe.name}</h1>
        <Link to={`${match.url}/edit`}>Edit</Link>
      </PageHeader>
      <div>
        {recipe.description && (
          <Section heading="Description">{recipe.description}</Section>
        )}
        <Section heading="Basics">
          <List>
            {basicsFields.map((field) => {
              return (
                <li key={field}>
                  <div>{formatLabel(field)}</div>
                  <div>{recipe[field]}</div>
                </li>
              );
            })}
          </List>
        </Section>
      </div>
    </div>
  );
};

RecipeDetail.propTypes = {
  match: PropTypes.object,
};

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.h2`
  text-transform: uppercase;
  font-weight: bold;
  border-bottom: 2px solid black;
`;

const Section = ({ children, heading }) => {
  return (
    <div>
      <Heading>{heading}</Heading>
      {children}
    </div>
  );
};
export default RecipeDetail;
