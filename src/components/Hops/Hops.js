import React from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Loader, Dimmer, Table, Container, Header } from "semantic-ui-react";
import { ErrorMessage } from "../Alerts";

const GET_HOPS = gql`
  {
    hops {
      id
      name
      description
      purpose
      sub_names
      origin {
        name
      }
    }
  }
`;

/**
 *
 * Hops
 *
 */
const Hops = () => {
  const { data = {}, loading, error } = useQuery(GET_HOPS);

  if (loading)
    return (
      <Dimmer active inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>
    );
  if (error) return <ErrorMessage />;
  return (
    <Container textAlign="center">
      <Header as="h1">Hops</Header>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Origin</Table.HeaderCell>
            <Table.HeaderCell>Purpose</Table.HeaderCell>
            <Table.HeaderCell>Substitutes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.hops.map(hop => (
            <Table.Row key={hop.id}>
              <Table.Cell>
                <Link to={`/data/hops/${hop.id}`}>{hop.name}</Link>
              </Table.Cell>
              <Table.Cell>
                <p>{hop.description}</p>
              </Table.Cell>
              <Table.Cell>
                <p>{hop.origin.name}</p>
              </Table.Cell>
              <Table.Cell>
                <p>{hop.purpose}</p>
              </Table.Cell>
              <Table.Cell>
                <p>{hop.sub_names}</p>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default Hops;
