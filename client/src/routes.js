import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout";
import Auth from "./hoc/Auth";

import Home from "./components/home/Home";
import RegisterLogin from "./components/register_login/RegisterLogin";
import Register from "./components/register_login/Register";
import UserDashboard from "./components/user/Dashboard";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route
          path="/user/dashboard"
          exact
          component={Auth(UserDashboard, true)}
        />
        <Route path="/" exact component={Auth(Home, null)} />
        <Route
          path="/register_login"
          exact
          component={Auth(RegisterLogin, false)}
        />
        <Route path="/register" exact component={Auth(Register, false)} />
      </Switch>
    </Layout>
  );
};
export default Routes;
