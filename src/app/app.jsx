import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";

import WelcomeScreen from "@app/welcome-screen";
import GameScreen from "@app/game-screen";


class App extends PureComponent {
  constructor(props) {
    super(props);

    this._chooseWelcomeScreen = this._chooseWelcomeScreen.bind(this);
    this._chooseGameScreen = this._chooseGameScreen.bind(this);
  }

  render() {
    return <BrowserRouter>
      <Switch>
        <Route exact path="/">{this._chooseWelcomeScreen()}</Route>
        <Route exact path="/game">{this._chooseGameScreen()}</Route>
      </Switch>
    </BrowserRouter>;
  }

  _chooseWelcomeScreen() {
    const {errorLimit} = this.props;
    return <WelcomeScreen errorLimit={errorLimit}/>;
  }

  _chooseGameScreen() {
    return <GameScreen/>;
  }
}

App.propTypes = {
  errorLimit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  errorLimit: state.errorLimit,
});

export {App};
export default connect(mapStateToProps, null)(App);
