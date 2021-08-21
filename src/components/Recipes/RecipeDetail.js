import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/react-hooks";
import { Button } from "semantic-ui-react";
import { LoaderScreen } from "../Loader";
import { ErrorMessage } from "../../styled/Alerts";
import { PageHeader } from "../../styled/Layout/Layout";
import { List } from "../../styled/List";
import { GET_RECIPE } from "../../queries";
import { formatLabel } from "../../services/utils/strings";
import { ingredientTypes, HOP } from "../../constants";
import { getTiming } from "../../services/utils/format";

const basicsFields = [
  "volume",
  "boilVolume",
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
        <Button as={Link} to={`${match.url}/edit`}>
          Edit
        </Button>
      </PageHeader>

      <DetailRow>
        <DetailRowInner>
          <p>Brew Date</p>
          <DetailRowData>{recipe.brewDate}</DetailRowData>
        </DetailRowInner>
        <DetailRowInner>
          <p>ABV</p>
          <DetailRowData>{recipe.abv}</DetailRowData>
        </DetailRowInner>
        <DetailRowInner>
          <p>IBU</p>
          <DetailRowData>{recipe.ibu}</DetailRowData>
        </DetailRowInner>
      </DetailRow>

      <Container>
        <Inner>
          {recipe.description && (
            <Section heading="Description">
              <p>{recipe.description}</p>
            </Section>
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
        </Inner>

        <Inner>
          <Section heading="Ingredients">
            <List>
              {Object.entries(groupIngredients(recipe.ingredients)).map(
                ([type, ingredients]) => {
                  return (
                    <List key={type}>
                      <TypeHeader>
                        <TypeLabel width={type === HOP ? "33.3%" : "50%"}>
                          {ingredientTypes.get(type)}
                        </TypeLabel>
                        {type === HOP && (
                          <TypeLabel width={"33.3%"} textAlign={"center"}>
                            Timing
                          </TypeLabel>
                        )}
                        <TypeLabel width={type === HOP ? "33.3%" : "50%"}>
                          Amount
                        </TypeLabel>
                      </TypeHeader>
                      {ingredients.map((ingredient) => {
                        return (
                          <ListItem key={ingredient.id}>
                            <ItemValue width={type === HOP ? "33.3%" : "50%"}>
                              {formatLabel(ingredient?.item?.name)}
                            </ItemValue>
                            {ingredient.item.type === HOP && (
                              <ItemValue
                                width={type === HOP ? "33.3%" : "50%"}
                                textAlign={"center"}
                              >
                                {getTiming(
                                  recipe.boilDuration,
                                  ingredient.timing
                                )}
                              </ItemValue>
                            )}
                            <ItemValue width={type === HOP ? "33.3%" : "50%"}>
                              {ingredient.amount}
                            </ItemValue>
                          </ListItem>
                        );
                      })}
                    </List>
                  );
                }
              )}
            </List>
          </Section>
        </Inner>
      </Container>
    </div>
  );
};

RecipeDetail.propTypes = {
  match: PropTypes.object,
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Inner = styled.div`
  min-width: 300px;
  width: 47%;
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

const ItemValue = styled.div`
  width: ${({ width }) => width};
  text-align: ${({ textAlign }) => textAlign || "left"};

  &:last-of-type {
    text-align: right;
  }
`;

const TypeLabel = styled(ItemValue)`
  font-weight: bold;
  padding-top: 10px;
`;

const DetailRow = styled.div`
  display: flex;
  border-bottom: 2px solid black;
`;

const DetailRowInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 30px 10px 0;
  font-size: 18px;
`;

const DetailRowData = styled.div`
  font-weight: bold;
  line-height: 1.5;
`;

const TypeHeader = styled.div`
  display: flex;
  justify-content: space-between;
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
  margin: 20px 0;
`;
export default RecipeDetail;
