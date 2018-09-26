import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout";

import Home from "./components/Home";
import RegisterLogin from "./components/register_login/RegisterLogin";
import Register from "./components/register_login/Register";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register_login" exact component={RegisterLogin} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </Layout>
  );
};
export default Routes;
