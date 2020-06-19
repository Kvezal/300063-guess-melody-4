import React, {PureComponent} from "react";
import PropTypes from "prop-types";


const PLAY_BUTTON_SIZES = [`small`, `big`];

class PlayButton extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {className, size, onButtonClick, children} = this.props;

    const sizeClass = PLAY_BUTTON_SIZES.includes(size) ? `play-button--${size}` : ``;
    return <button
      type="button"
      className={`play-button ${sizeClass} ${className ? className : ``}`}
      onClick={onButtonClick}
    >
      {children}
    </button>;
  }
}

PlayButton.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(PLAY_BUTTON_SIZES).isRequired,
  onButtonClick: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default PlayButton;
