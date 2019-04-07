import React, { Component } from "react";
import { client } from "./services/api";
import { ApolloProvider } from "react-apollo";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
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
