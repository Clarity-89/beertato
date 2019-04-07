import React, { Component } from "react";
import { client } from "./services/api";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    client
      .query({
        query: gql`
          {
            hops {
              name
              origin {
                name
              }
            }
          }
        `
      })
      .then(result => console.log("got hops", result));
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Navbar />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
