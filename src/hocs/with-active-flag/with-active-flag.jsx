import React, {PureComponent} from "react";
import PropTypes from "prop-types";


const withActiveFlag = (Component) => {
  class WithActiveFlag extends PureComponent {
    constructor(props) {
      super(props);
      this._handlerActiveChange = this._handlerActiveChange.bind(this);
      this.state = {
        isActive: props.isActive,
      };
    }

    _handlerActiveChange() {
      this.setState((prevState) => ({isActive: !prevState.isActive}));
    }

    render() {
      const {isActive} = this.state;

      return <Component
        {...this.props}
        isActive={isActive}
        onActiveChange={this._handlerActiveChange}
      />;
    }
  }

  WithActiveFlag.defaultProps = {
    isActive: false,
  };

  WithActiveFlag.propTypes = {
    isActive: PropTypes.bool.isRequired,
  };

  return WithActiveFlag;
};

export default withActiveFlag;
