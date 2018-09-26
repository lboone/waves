import React from "react";
import MyButton from "../utils/Button";
import Login from "./Login";

const RegisterLogin = props => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customers</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus neque iure ducimus, corporis, deserunt non doloremque
              repellat eius illum excepturi blanditiis voluptatum saepe laborum
              eaque reprehenderit debitis fugiat veritatis pariatur?
            </p>
            <MyButton
              type="default"
              title="Create an account"
              linkTo="/register"
              styles={{
                margin: "10px 0 0 0"
              }}
            />
          </div>
          <div className="right">
            <h2>Registered Customers</h2>
            <p>If you have an account please log in.</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
