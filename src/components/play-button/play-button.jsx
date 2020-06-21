import React from "react";
import PropTypes from "prop-types";


const PLAY_BUTTON_SIZES = [`small`, `big`];

const PlayButton = (props) => {
  const {className, size, onButtonClick, children} = props;

  const sizeClass = PLAY_BUTTON_SIZES.includes(size) ? `play-button--${size}` : ``;
  return <button
    type="button"
    className={`play-button ${sizeClass} ${className ? className : ``}`}
    onClick={onButtonClick}
  >
    {children}
  </button>;
};

PlayButton.defaultProps = {
  size: `small`,
};

PlayButton.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(PLAY_BUTTON_SIZES).isRequired,
  onButtonClick: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default PlayButton;
