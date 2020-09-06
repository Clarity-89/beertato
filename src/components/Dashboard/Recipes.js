import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { LoaderScreen } from "../Loader";
import { ErrorMessage } from "../../styled/Alerts";
import { GET_RECIPES } from "./queries";

const headers = ["Name", "Date", "Volume", "ABV", "IBU", ""];
/**
 *
 * Recipes
 *
 */
const Recipes = ({ match }) => {
  const { data, loading, error } = useQuery(GET_RECIPES);

  if (loading) {
    return <LoaderScreen />;
  }

  if (error) return <ErrorMessage />;

  return (
    <>
      <h1>Recipes</h1>
      <Link to={`${match.url}/new`}>Add recipe</Link>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            {headers.map((header) => (
              <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.recipes.map((recipe) => {
            return (
              <Table.Row key={recipe.id}>
                <Table.Cell>
                  <Link to={`${match.url}/${recipe.id}`}>{recipe.name}</Link>
                </Table.Cell>
                <Table.Cell>
                  <p>{recipe.brewDate}</p>
                </Table.Cell>
                <Table.Cell>
                  <p>{recipe.volume}</p>
                </Table.Cell>
                <Table.Cell>
                  <p>{recipe.abv}</p>
                </Table.Cell>
                <Table.Cell>
                  <p>{recipe.ibu}</p>
                </Table.Cell>
                <Table.Cell>View Edit Delete</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

Recipes.propTypes = {
  match: PropTypes.object,
};

export default Recipes;
