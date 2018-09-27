import React from "react";
import UserLayout from "../../hoc/UserLayout";
import MyButton from "../utils/Button";

const Dashboard = props => {
  const userData = props.user.userData;
  console.log(userData);
  return (
    <UserLayout>
      <div>
        <div className="user_nfo_panel">
          <h1>User information</h1>
          <div>
            <span>{userData.name}</span>
            <span>{userData.lastname}</span>
            <span>{userData.email}</span>
          </div>

          <MyButton
            type="default"
            title="Edit account info"
            linkTo="/user/profile"
          />
        </div>

        <div className="user_nfo_panel">
          <h1>History of purchases</h1>
          <div className="user_product_block_wrapper">history</div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
