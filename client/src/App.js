import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  componentDidMount() {
    axios.get("/api/v1/products/brands").then(response => {
      console.log(response.data);
    });
  }
  render() {
    return <div className="App">My App</div>;
  }
}

export default App;
