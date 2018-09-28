import axios from "axios";
import { GET_PRODUCTS_BY_SELL, GET_PRODUCTS_BY_ARRIVAL } from "./types";

import { PRODUCT_SERVER } from "../components/utils/misc";

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
