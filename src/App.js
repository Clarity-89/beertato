import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { client } from "./services/api";
import gql from "graphql-tag";

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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
