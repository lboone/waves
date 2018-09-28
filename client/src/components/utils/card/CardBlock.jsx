import React from "react";
import Card from "./Card";

const CardBlock = props => {
  const renderCards = () =>
    props.cards
      ? props.cards.map((card, i) => <Card key={i} {...card} />)
      : null;
  return (
    <div className="card_block">
      <div className="container">
        {props.title ? <div className="title">{props.title}</div> : null}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          {renderCards()}
        </div>
      </div>
    </div>
  );
};

export default CardBlock;
