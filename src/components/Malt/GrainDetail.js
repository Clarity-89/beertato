import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import { Container, Header, Table } from "semantic-ui-react";
import gql from "graphql-tag";
import { LoaderScreen } from "../Loader";
import { ErrorMessage } from "../Alerts";
import { Text } from "../../styled/typography";

const GET_GRAIN_DETAILS = gql`
  query Grain($id: String!) {
    grain(id: $id) {
      id
      name
      description
      yield
      color
      protein
      origin {
        name
      }
    }
  }
`;

/**
 *
 * MaltDetail
 *
 */
const GrainDetail = ({ match }) => {
  const { id } = match.params;
  const { data, loading, error } = useQuery(GET_GRAIN_DETAILS, {
    variables: { id: id.toString() },
  });

  if (loading) {
    return <LoaderScreen />;
  }

  if (error) return <ErrorMessage />;

  const { grain } = data;
  return (
    <Container textAlign="center">
      <Header as="h1">{grain.name}</Header>
      <Table celled padded>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Text bold>Description</Text>
            </Table.Cell>
            <Table.Cell>{grain.description}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Origin</Text>
            </Table.Cell>
            <Table.Cell>{grain.origin.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Yield</Text>
            </Table.Cell>
            <Table.Cell>{grain.yield}%</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Color</Text>
            </Table.Cell>
            <Table.Cell>{grain.color} EBC</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Protein</Text>
            </Table.Cell>
            <Table.Cell>{grain.protein}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
};

GrainDetail.propTypes = {
  match: PropTypes.object,
};

export default GrainDetail;
