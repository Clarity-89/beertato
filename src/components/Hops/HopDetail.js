import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import { Loader, Dimmer, Container, Header, Table } from "semantic-ui-react";
import gql from "graphql-tag";
import { ErrorMessage } from "../Alerts";
import { Text } from "../../styled/typography";

const GET_HOP_DETAILS = gql`
  query Hop($id: String!) {
    hop(id: $id) {
      id
      name
      description
      purpose
      alpha_acid_composition
      beta_acid_composition
      sub_names
      beer_style
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
  const { hop } = data;
  return (
    <Container textAlign="center">
      <Header as="h1">{hop.name}</Header>
      <Table celled padded>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Text bold>Description</Text>
            </Table.Cell>
            <Table.Cell>{hop.description}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Purpose</Text>
            </Table.Cell>
            <Table.Cell>{hop.purpose}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Alpha Acid Composition</Text>
            </Table.Cell>
            <Table.Cell>{hop.alpha_acid_composition}%</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Beta Acid Composition</Text>
            </Table.Cell>
            <Table.Cell>{hop.beta_acid_composition}%</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Origin</Text>
            </Table.Cell>
            <Table.Cell>{hop.origin.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Substitutes</Text>
            </Table.Cell>
            <Table.Cell>{hop.sub_names}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Style Guide</Text>
            </Table.Cell>
            <Table.Cell>{hop.beer_style}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
};

HopDetail.propTypes = {
  match: PropTypes.object
};

export default HopDetail;
