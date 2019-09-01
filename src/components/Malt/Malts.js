import React from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Loader, Dimmer, Table, Container, Header } from "semantic-ui-react";
import { ErrorMessage } from "../Alerts";

const GET_MALTS = gql`
  {
    grain {
      id
      name
      description
      yield
      origin {
        name
      }
    }
  }
`;

/**
 *
 * Malts
 *
 */
const Malts = props => {
  const { data = {}, loading, error } = useQuery(GET_MALTS);
  return <div>Malt</div>;
};

export default Malts;
