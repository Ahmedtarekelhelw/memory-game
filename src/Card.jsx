import React from "react";

const Card = ({ card, handleChange, flipped, disabed }) => {
  const handleChoice = () => {
    if (!disabed) handleChange(card, card.id);
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="img" className="front" />
        <img
          src="./img/cover.png"
          alt="cover"
          className="back"
          onClick={handleChoice}
        />
      </div>
    </div>
  );
};

export default Card;
