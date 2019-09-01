import React from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Table, Container, Header } from "semantic-ui-react";
import { ErrorMessage } from "../Alerts";
import { LoaderScreen } from "../Loader";

const GET_MALTS = gql`
  {
    grains {
      id
      name
      description
      yield
      origin {
        name
      }
    }
  }
`;

/**
 *
 * Malts
 *
 */
const Grains = () => {
  const { data = {}, loading, error } = useQuery(GET_MALTS);

  if (loading) {
    return <LoaderScreen />;
  }
  if (error) return <ErrorMessage />;

  return (
    <Container textAlign="center">
      <Header as="h1">Grains</Header>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Origin</Table.HeaderCell>
            <Table.HeaderCell>Yield (%)</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.grains.map(grain => (
            <Table.Row key={grain.id}>
              <Table.Cell>
                <Link to={`/data/grains/${grain.id}`}>{grain.name}</Link>
              </Table.Cell>
              <Table.Cell>
                <p>{grain.description}</p>
              </Table.Cell>
              <Table.Cell>
                <p>{grain.origin.name}</p>
              </Table.Cell>
              <Table.Cell>
                <p>{grain.yield}</p>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default Grains;
