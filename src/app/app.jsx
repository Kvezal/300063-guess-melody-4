import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import WelcomeScreen from "@app/welcome-screen";


class App extends PureComponent {
  constructor(props) {
    super(props);
    this._handleNewGameButtonClick = this._handleNewGameButtonClick.bind();
  }

  _handleNewGameButtonClick() {

  }

  render() {
    const {errorLimit} = this.props;
    return <WelcomeScreen
      errorLimit={errorLimit}
      onWelcomeButtonClick={this._handleNewGameButtonClick}
    />;
  }
}

App.propTypes = {
  errorLimit: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
