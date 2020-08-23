import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import { Container, Header, Table } from "semantic-ui-react";
import gql from "graphql-tag";
import { LoaderScreen } from "../Loader";
import { ErrorMessage } from "../../styled/Alerts";
import { Text } from "../../styled/typography";

const GET_YEAST_DETAIL = gql`
  query Yeast($id: ID!) {
    yeast: item(id: $id) {
      id
      name
      data
      description
    }
  }
`;

/**
 *
 * YeastDetail
 *
 */
const YeastDetail = ({ match }) => {
  const { id } = match.params;
  const { data, loading, error } = useQuery(GET_YEAST_DETAIL, {
    variables: { id: id.toString() },
  });

  if (loading) {
    return <LoaderScreen />;
  }

  if (error) return <ErrorMessage />;

  const { yeast } = data;
  const yeastData = JSON.parse(yeast.data);
  return (
    <Container textAlign="center">
      <Header as="h1">{yeast.name}</Header>
      <Table celled padded>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Text bold>Code</Text>
            </Table.Cell>
            <Table.Cell>{yeastData.code}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Description</Text>
            </Table.Cell>
            <Table.Cell>{yeast.description}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Type</Text>
            </Table.Cell>
            <Table.Cell>{yeastData.type}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Lab</Text>
            </Table.Cell>
            <Table.Cell>{yeastData.lab}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Flocculation</Text>
            </Table.Cell>
            <Table.Cell>{yeastData.flocculation}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Temperature (&deg;C)</Text>
            </Table.Cell>
            <Table.Cell>{yeastData.temperature}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text bold>Beer types</Text>
            </Table.Cell>
            <Table.Cell>{yeastData.beer_type}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
};

YeastDetail.propTypes = {
  match: PropTypes.object,
};

export default YeastDetail;
