import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { client } from "../../services/api";
import gql from "graphql-tag";
import { List } from "../List";
import { Link } from "react-router-dom";

/**
 *
 * Hops
 *
 */
const Hops = props => {
  const [hops, setHops] = useState([]);

  useEffect(() => {
    getHops();
  }, []);

  const getHops = async () => {
    try {
      const res = await client.query({
        query: gql`
          {
            hops {
              id
              name
              origin {
                name
              }
            }
          }
        `
      });
      console.log("got hops", res);
      setHops(res.data.hops);
    } catch (e) {
      console.error("Error", e);
    }
  };
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
