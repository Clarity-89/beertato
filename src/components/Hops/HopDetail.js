import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { client } from "../../services/api";
import gql from "graphql-tag";

/**
 *
 * HopDetail
 *
 */
const HopDetail = ({ match }) => {
  const [pageState, setPageState] = useState({ loading: false, error: false });
  const [hop, setHop] = useState({});

  useEffect(() => {
    const loadHop = async () => {
      const id = match.params.id;
      setPageState(state => ({ ...state, loading: true }));
      try {
        const res = await client.query({
          query: gql`
            query Hop($id: String!) {
              hop(id: $id) {
                id
                name
                origin {
                  name
                }
              }
            }
          `,
          variables: { id: id.toString() }
        });
        setPageState(state => ({ ...state, loading: false }));
        setHop(res.data.hop);
      } catch (e) {
        console.error("Error loading hop", e);
        setPageState({ loading: false, error: true });
      }
    };

    loadHop();
  }, [match.params.id]);

  return pageState.loading ? (
    <Loader>Loading...</Loader>
  ) : (
    <Container>{hop.name}</Container>
  );
};

HopDetail.propTypes = {
  match: PropTypes.object
};

const Container = styled.div`
  display: flex;
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

export default HopDetail;
