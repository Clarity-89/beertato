import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { client } from "../../services/api";
import gql from "graphql-tag";
//import { List } from "../../styled/List";
import { Link } from "react-router-dom";
import { Loader, Dimmer, Table } from "semantic-ui-react";

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
  const [hops, setHops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getHops();
  }, []);

  const getHops = async () => {
    setError(false);
    try {
      const res = await client.query({
        query: GET_HOPS
      });
      console.log("got hops", res);
      setHops(res.data.hops);
      setLoading(false);
    } catch (e) {
      setError(true);
      setLoading(false);
      console.error(e);
    }
  };
  if (loading)
    return (
      <Dimmer active inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>
    );
  if (error) return "Error";
  return (
    <Container>
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
          {hops.map(hop => (
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

Hops.propTypes = {};

const Container = styled.div`
  display: flex;
  padding: 24px 48px;
`;

export default Hops;
