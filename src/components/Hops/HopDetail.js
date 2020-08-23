import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import { Container, Header, Table } from "semantic-ui-react";
import gql from "graphql-tag";
import { ErrorMessage } from "../../styled/Alerts";
import { Text } from "../../styled/typography";
import { LoaderScreen } from "../Loader";

const GET_HOP_DETAILS = gql`
  query Hop($id: ID!) {
    hop: item(id: $id) {
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
 * HopDetail
 *
 */
const HopDetail = ({ match }) => {
  const { id } = match.params;
  const { data, loading, error } = useQuery(GET_HOP_DETAILS, {
    variables: { id },
  });

  if (loading) {
    return <LoaderScreen />;
  }

  if (error) return <ErrorMessage />;
  const { hop } = data;
  const hopData = JSON.parse(hop.data);
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
            <Table.Cell>{hopData.purpose}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Alpha Acid Composition</Text>
            </Table.Cell>
            <Table.Cell>{hopData.alpha_acid_composition}%</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Beta Acid Composition</Text>
            </Table.Cell>
            <Table.Cell>{hopData.beta_acid_composition}%</Table.Cell>
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
            <Table.Cell>{hopData.sub_names}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Style Guide</Text>
            </Table.Cell>
            <Table.Cell>{hopData.beer_style}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
};

HopDetail.propTypes = {
  match: PropTypes.object,
};

export default HopDetail;
