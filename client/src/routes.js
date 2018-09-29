import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout";
import Auth from "./hoc/Auth";

import Home from "./components/home/Home";
import RegisterLogin from "./components/register_login/RegisterLogin";
import Register from "./components/register_login/Register";
import UserDashboard from "./components/user/Dashboard";
import Shop from "./components/shop/Shop";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route
          path="/user/dashboard"
          exact
          component={Auth(UserDashboard, true)}
        />
        <Route
          path="/register_login"
          exact
          component={Auth(RegisterLogin, false)}
        />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  );
};
export default Routes;
