import React from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Table, Container, Header } from "semantic-ui-react";
import { ErrorMessage } from "../../styled/Alerts";
import { LoaderScreen } from "../Loader";
import { YEAST } from "../../constants";

const GET_YEAST = gql`
  query GetYeasts($type: ItemType) {
    yeasts: items(type: $type) {
      id
      name
      data
      description
    }
  }
`;

/**
 *
 * Yeast
 *
 */
const Yeast = () => {
  const { data = {}, loading, error } = useQuery(GET_YEAST, {
    variables: { type: YEAST },
  });

  if (loading) {
    return <LoaderScreen />;
  }

  if (error) return <ErrorMessage />;

  return (
    <Container textAlign="center">
      <Header as="h1">Yeast</Header>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Code</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Lab</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.yeasts.map((y) => {
            const yeastData = JSON.parse(y.data);
            return (
              <Table.Row key={y.id}>
                <Table.Cell>
                  <Link to={`/data/yeast/${y.id}`}>{y.name}</Link>
                </Table.Cell>
                <Table.Cell>
                  <p>{yeastData.code}</p>
                </Table.Cell>
                <Table.Cell>
                  <p>{y.description}</p>
                </Table.Cell>
                <Table.Cell>
                  <p>{yeastData.type}</p>
                </Table.Cell>
                <Table.Cell>
                  <p>{yeastData.lab}</p>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default Yeast;
