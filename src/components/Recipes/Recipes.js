import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Confirm, Table, Checkbox } from "semantic-ui-react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { LoaderScreen } from "../Loader";
import { ErrorMessage } from "../../styled/Alerts";
import { PageHeader } from "../../styled/Layout/Layout";
import { GET_RECIPES } from "../../queries";
import { TotalsModal } from "./index";

const headers = ["", "Name", "Date", "Volume", "ABV", "IBU", ""];

export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
  }
`;
/**
 *
 * Recipes
 *
 */
const Recipes = ({ match }) => {
  const { data, loading, error } = useQuery(GET_RECIPES);
  const [deleteRecipe] = useMutation(DELETE_RECIPE);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [totals, setTotals] = useState(null);

  const doDelete = (id) => {
    return deleteRecipe({
      variables: { id },
      update: (proxy, { data: { deleteRecipe: id } }) => {
        const data = proxy.readQuery({ query: GET_RECIPES });
        proxy.writeQuery({
          query: GET_RECIPES,
          data: {
            ...data,
            recipes: data.recipes.filter((item) => item.id !== id),
          },
        });
      },
    });
  };

  if (loading) {
    return <LoaderScreen />;
  }

  if (error) return <ErrorMessage />;

  const setSelected = (id) => {
    setSelectedRecipes((ids) => {
      if (ids.includes(id)) {
        return ids.filter((selectedId) => selectedId !== id);
      }
      return [...ids, id];
    });
  };

  const showTotal = () => {
    const recipes = selectedRecipes.map((id) =>
      data.recipes.find((r) => r.id === id)
    );
    const sum = {};

    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        const { type, name } = ingredient.item;
        sum[type] = sum[type] || {};
        sum[type][name] = (sum[type]?.[name] || 0) + ingredient.amount;
      });
    });

    setTotals(sum);
  };

  return (
    <>
      <PageHeader>
        <h1>Recipes</h1>
        <div>
          <Button as={Link} primary to={`${match.url}/new`}>
            Add recipe
          </Button>
          {!!selectedRecipes.length && (
            <Button onClick={showTotal}>Calculate ingredients</Button>
          )}
        </div>
      </PageHeader>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            {headers.map((header, i) => (
              <Table.HeaderCell key={i}>{header}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.recipes.map((recipe) => {
            return (
              <Table.Row key={recipe.id}>
                <Table.Cell>
                  <Checkbox
                    onChange={() => setSelected(recipe.id)}
                    checked={selectedRecipes.includes(recipe.id)}
                  />
                </Table.Cell>
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
                <Table.Cell width={4} textAlign={"center"}>
                  <Button
                    type="button"
                    basic
                    primary
                    as={Link}
                    to={`${match.url}/${recipe.id}`}
                  >
                    View
                  </Button>
                  <Button
                    type="button"
                    basic
                    secondary
                    as={Link}
                    to={`${match.url}/${recipe.id}/edit`}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsConfirmOpen(true)}
                    basic
                    negative
                  >
                    Delete
                  </Button>
                  <Confirm
                    open={isConfirmOpen}
                    onCancel={() => setIsConfirmOpen(false)}
                    onConfirm={() => {
                      doDelete(recipe.id);
                      setIsConfirmOpen(false);
                    }}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <TotalsModal
        isOpen={!!totals}
        onClose={() => setTotals(null)}
        data={totals}
      />
    </>
  );
};

Recipes.propTypes = {
  match: PropTypes.object,
};

export default Recipes;
