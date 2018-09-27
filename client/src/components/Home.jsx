import React, { Component } from "react";

class Home extends Component {
  userData = this.props.user.userData;

  render() {
    return (
      <div>
        Home Hi {this.userData.name} {this.userData.lastname}
      </div>
    );
  }
}

export default Home;
