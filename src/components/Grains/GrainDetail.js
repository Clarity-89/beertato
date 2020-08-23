import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import { Container, Header, Table } from "semantic-ui-react";
import gql from "graphql-tag";
import { LoaderScreen } from "../Loader";
import { ErrorMessage } from "../../styled/Alerts";
import { Text } from "../../styled/typography";

const GET_GRAIN_DETAILS = gql`
  query Grain($id: ID!) {
    grain: item(id: $id) {
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
 * MaltDetail
 *
 */
const GrainDetail = ({ match }) => {
  const { id } = match.params;
  const { data, loading, error } = useQuery(GET_GRAIN_DETAILS, {
    variables: { id },
  });

  if (loading) {
    return <LoaderScreen />;
  }

  if (error) return <ErrorMessage />;

  const { grain } = data;
  const grainData = JSON.parse(grain.data);
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
              <Text bold>Yield (%)</Text>
            </Table.Cell>
            <Table.Cell>{grainData.yield}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Color (EBC)</Text>
            </Table.Cell>
            <Table.Cell>{grainData.color}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Protein</Text>
            </Table.Cell>
            <Table.Cell>{grainData.protein}</Table.Cell>
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
