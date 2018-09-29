import React, { Component } from "react";
import PageTop from "../utils/PageTop";
import { connect } from "react-redux";
import CollapseCheckbox from "../utils/CollapseCheckbox";
import CollapseRadio from "../utils/CollapseRadio";
import { frets, price } from "../utils/form/fixedCategories";

import {
  getAllProducts,
  getBrands,
  getWoods
} from "../../actions/product_actions";

class Shop extends Component {
  state = {
    grid: "",
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: []
    }
  };
  componentDidMount() {
    this.props.dispatch(getAllProducts());
    this.props.dispatch(getBrands());
    this.props.dispatch(getWoods());
  }
  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };

    if (category === "price") {
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    } else {
      newFilters[category] = filters;
    }

    this.setState({
      filters: newFilters
    });
  };

  handlePrice(value) {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }

    return array;
  }
  render() {
    const products = this.props.products;
    const woods = products.woods;
    const brands = products.brands;

    return (
      <div>
        <PageTop title="Browse Products" />

        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="Brands"
                list={brands}
                handleFilters={filters => this.handleFilters(filters, "brand")}
              />

              <CollapseCheckbox
                initState={false}
                title="Frets"
                list={frets}
                handleFilters={filters => this.handleFilters(filters, "frets")}
              />
              <CollapseCheckbox
                initState={false}
                title="Woods"
                list={woods}
                handleFilters={filters => this.handleFilters(filters, "wood")}
              />
              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={filters => this.handleFilters(filters, "price")}
              />
            </div>

            <div className="right" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};
export default connect(mapStateToProps)(Shop);
