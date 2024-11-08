import PropTypes from "prop-types";
import React from "react";
//import "./card.css";

export const Card = ({
  cardVariant,
  className,
  pickupBasketballClassName,
  text = "Pickup basketball game at Pottruck in 30 mins&nbsp;&nbsp;3 spots left",
  buttonClassName,
  joinGameSyntheticClassName,
  text1 = "Join Game",
  avatarClassName,
  overlapGroupClassName,
  colinSpeakerClassName,
  text2 = "Colin Speaker",
  cspeakerHrClassName,
  text3 = "@cspeaker - 1 hr",
}) => {
  return (
    <div className={`card ${className}`}>
      <p className={`pickup-basketball ${pickupBasketballClassName}`}>{text}</p>

      <button className={`button ${buttonClassName}`}>
        <div className={`join-game-synthetic ${joinGameSyntheticClassName}`}>
          {text1}
        </div>
      </button>

      <div className={`avatar ${avatarClassName}`}>
        <img className="rectangle" alt="Rectangle" />
      </div>

      <div className={`overlap-group ${overlapGroupClassName}`}>
        <div className={`colin-speaker ${colinSpeakerClassName}`}>{text2}</div>

        <div className={`cspeaker-hr ${cspeakerHrClassName}`}>{text3}</div>
      </div>
    </div>
  );
};

Card.propTypes = {
  cardVariant: PropTypes.oneOf(["default"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
};
