import React, { useState } from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Table, Container, Header } from "semantic-ui-react";
import { ErrorMessage } from "../../styled/Alerts";
import { LoaderScreen } from "../Loader";
import { Search } from "../Search";
import { HOP } from "../../constants";

const GET_HOPS = gql`
  query GetHops($type: ItemType) {
    hops: items(type: $type) {
      id
      name
      description
      data
      origin {
        id
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
  const [filter, setFilter] = useState("");
  const { data = {}, loading, error } = useQuery(GET_HOPS, {
    variables: { type: HOP },
  });

  const filteredData = !filter
    ? data.hops
    : data.hops.filter((hop) =>
        hop.name.toLowerCase().includes(filter.toLowerCase())
      );

  if (loading) {
    return <LoaderScreen />;
  }

  if (error) return <ErrorMessage />;

  return (
    <Container textAlign="center">
      <Header as="h1">Hops</Header>
      <Search getValue={(value) => setFilter(value)} />
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
          {filteredData.map((hop) => {
            const hopData = JSON.parse(hop.data);
            return (
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
                  <p>{hopData.purpose}</p>
                </Table.Cell>
                <Table.Cell>
                  <p>{hopData.sub_names}</p>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default Hops;
