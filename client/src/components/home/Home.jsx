import React, { Component } from "react";
import HomeSlider from "./HomeSlider";
import HomePromotion from "./HomePromotion";

import { connect } from "react-redux";
import {
  getProductsBySell,
  getProductsByArrival
} from "../../actions/product_actions";

import CardBlock from "../utils/card/CardBlock";

class Home extends Component {
  userData = this.props.user.userData;

  componentDidMount() {
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());
  }
  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock
          cards={this.props.products.bySell}
          title="Best Selling Guitars"
        />
        <HomePromotion />
        <CardBlock cards={this.props.products.byArrival} title="New Arrivals" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(Home);
