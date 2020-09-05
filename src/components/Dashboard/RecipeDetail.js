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

const methodFields = [
  "mashTemp",
  "mashDuration",
  "boilDuration",
  "fermentationTemp",
  "fermentationDuration",
];

const groupIngredients = (ingredients) => {
  return ingredients.reduce((acc, curr) => {
    const { type } = curr.item;
    return { ...acc, [type]: acc[type] ? [...acc[type], curr] : [curr] };
  }, {});
};
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
                <ListItem key={field}>
                  <div>{formatLabel(field)}</div>
                  <div>{recipe[field]}</div>
                </ListItem>
              );
            })}
          </List>
        </Section>
        <Section heading="Method">
          <List>
            {methodFields.map((field) => {
              return (
                <ListItem key={field}>
                  <div>{formatLabel(field)}</div>
                  <div>{recipe[field]}</div>
                </ListItem>
              );
            })}
          </List>
        </Section>

        <Section heading="Ingredients">
          <List>
            {Object.entries(groupIngredients(recipe.ingredients)).map(
              ([type, ingredients]) => {
                return (
                  <List key={type}>
                    <TypeLabel>{type}</TypeLabel>
                    {ingredients.map((ingredient) => {
                      return (
                        <ListItem key={ingredient.id}>
                          <div>{formatLabel(ingredient?.item?.name)}</div>
                          <div>{ingredient.amount}</div>
                        </ListItem>
                      );
                    })}
                  </List>
                );
              }
            )}
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

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid;
`;

const TypeLabel = styled.p`
  font-weight: bold;
  padding-top: 10px;
`;

const Section = ({ children, heading }) => {
  return (
    <SectionContainer>
      <Heading>{heading}</Heading>
      {children}
    </SectionContainer>
  );
};

const SectionContainer = styled.div`
  width: 50%;
  margin: 20px 0;
`;
export default RecipeDetail;
