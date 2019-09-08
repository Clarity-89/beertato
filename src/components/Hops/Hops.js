import React, { useState } from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Table, Container, Header } from "semantic-ui-react";
import { ErrorMessage } from "../Alerts";
import { LoaderScreen } from "../Loader";
import { Search } from "../Search";

const GET_HOPS = gql`
  query Hops($pageSize: Int, $after: String) {
    hops(pageSize: $pageSize, after: $after) {
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
      cursor
      hasMore
      totalCount
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
  const {
    data: { hops = {}, cursor, hasMore, totalCount },
    loading,
    error,
    fetchMore
  } = useQuery(GET_HOPS);

  const filteredData = !filter
    ? hops.hops
    : hops.hops.filter(hop =>
        hop.name.toLowerCase().includes(filter.toLowerCase())
      );

  if (loading) {
    return <LoaderScreen />;
  }

  if (error) return <ErrorMessage />;

  return (
    <Container textAlign="center">
      <Header as="h1">Hops</Header>
      <Search getValue={value => setFilter(value)} />
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
          {filteredData.map(hop => (
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
