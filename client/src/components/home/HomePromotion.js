import React from "react";
import MyButton from "../utils/Button";

const HomePromotion = props => {
  const promotion = {
    img: "/images/featured/featured_home_3.jpg",
    lineOne: "Up to 40% off",
    lineTwo: "In Second Hand Guitars",
    link: {
      title: "Shop Now",
      to: "/shop"
    }
  };
  const renderPromotion = () =>
    promotion ? (
      <div
        className="home_promotion_img"
        style={{ background: `url(${promotion.img})` }}
      >
        <div className="tag title">{promotion.lineOne}</div>
        <div className="tag low_title">{promotion.lineTwo}</div>
        <div>
          <MyButton
            type="default"
            title={promotion.link.title}
            linkTo={promotion.link.to}
            styles={{
              margin: "10px 0 0 0"
            }}
          />
        </div>
      </div>
    ) : null;
  return <div className="home_promotion">{renderPromotion()}</div>;
};

export default HomePromotion;
