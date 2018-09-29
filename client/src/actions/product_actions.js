import axios from "axios";
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS
} from "./types";

import { PRODUCT_SERVER } from "../components/utils/misc";

export async function getAllProducts() {
  const resp = await axios.get(`${PRODUCT_SERVER}/articles?sortBy=name`);
  const request = resp.data;

  return {
    type: GET_ALL_PRODUCTS,
    payload: request
  };
}

export async function getProductsByArrival() {
  const resp = await axios.get(
    `${PRODUCT_SERVER}/articles?type=arrival&limit=4`
  );
  const request = resp.data;

  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request
  };
}

export async function getProductsBySell() {
  const resp = await axios.get(`${PRODUCT_SERVER}/articles?type=sold&limit=4`);
  const request = resp.data;

  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: request
  };
}

///////////////////////////////////////
///////// CATEGORIES
//////////////////////////////////////

export async function getBrands() {
  const res = await axios.get(`${PRODUCT_SERVER}/brands`);
  const request = res.data;
  return {
    type: GET_BRANDS,
    payload: request
  };
}

export async function getWoods() {
  const res = await axios.get(`${PRODUCT_SERVER}/woods`);
  const request = res.data;
  return {
    type: GET_WOODS,
    payload: request
  };
}
