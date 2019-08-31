import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { client } from "../../services/api";
import gql from "graphql-tag";
import { List } from "../../styled/List";
import { Link } from "react-router-dom";
import { Loader, Dimmer } from "semantic-ui-react";

const GET_HOPS = gql`
  {
    hops {
      id
      name
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
      <List>
        {hops.map((hop, i) => (
          <HopItem key={i}>
            <Link to={`/data/hops/${hop.id}`}>{hop.name}</Link>
          </HopItem>
        ))}
      </List>
    </Container>
  );
};

Hops.propTypes = {};

const Container = styled.div`
  display: flex;
`;

const HopItem = styled.li``;

export default Hops;
