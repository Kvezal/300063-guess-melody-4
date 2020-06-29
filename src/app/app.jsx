import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import WelcomeScreen from "@app/welcome-screen";
import GameScreen from "@app/game-screen";
import Types from "@types";


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
    const {questions, errorLimit} = this.props;
    return <GameScreen
      errorLimit={errorLimit}
      questions={questions}
    />;
  }
}

App.propTypes = {
  errorLimit: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(Types.question),
};

export default App;
