import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import { Loader, Dimmer, Container, Header } from "semantic-ui-react";
import gql from "graphql-tag";
import { ErrorMessage } from "../Alerts";

const GET_HOP_DETAILS = gql`
  query Hop($id: String!) {
    hop(id: $id) {
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
 * HopDetail
 *
 */
const HopDetail = ({ match }) => {
  const { id } = match.params;
  const { data, loading, error } = useQuery(GET_HOP_DETAILS, {
    variables: { id: id.toString() }
  });

  if (loading) {
    return (
      <Dimmer active inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>
    );
  }

  if (error) return <ErrorMessage />;

  return (
    <Container textAlign="center">
      <Header as="h1">{data.hop.name}</Header>
    </Container>
  );
};

HopDetail.propTypes = {
  match: PropTypes.object
};

export default HopDetail;
