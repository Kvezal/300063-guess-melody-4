import {GameScreenTypes} from "@enums";

import {ActionCreator, ActionType, reducer} from "./reducer";


describe(`Reducer`, () => {
  const questions = [
    {
      type: `genre`,
      genre: `rock`,
      answers: [{
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `rock`,
      }, {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `blues`,
      }, {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `jazz`,
      }, {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `rock`,
      }],
    }, {
      type: `artist`,
      song: {
        artist: `Jim Beam`,
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      },
      answers: [{
        picture: `picture`,
        artist: `John Snow`,
      }, {
        picture: `picture`,
        artist: `Jack Daniels`,
      }, {
        picture: `picture`,
        artist: `Jim Beam`,
      }],
    },
  ];

  test(`increment mistake action should increment mistake`, () => {
    expect(ActionCreator.incrementMistake(questions[0], [false, false, false, true]))
      .toEqual({
        type: ActionType.INCREMENT_MISTAKE,
        payload: 1,
      });
  });

  test(`increment mistake action shouldn't increment mistake`, () => {
    expect(ActionCreator.incrementMistake(questions[0], [true, false, false, true]))
      .toEqual({
        type: ActionType.INCREMENT_MISTAKE,
        payload: 0,
      });
  });

  test(`increment level action should increment level`, () => {
    expect(ActionCreator.incrementLevel())
      .toEqual({
        type: ActionType.INCREMENT_LEVEL,
        payload: 1,
      });
  });

  test(`reset game action should reset game`, () => {
    expect(ActionCreator.resetGame())
      .toEqual({
        type: ActionType.RESET_GAME,
        payload: null,
      });
  });

  test(`choose screen action should choose screen`, () => {
    expect(ActionCreator.chooseScreen())
      .toEqual({
        type: ActionType.CHOOSE_SCREEN,
        payload: null,
      });
  });

  test(`should have initial state if action type doesn't match`, () => {
    const state = {
      level: 0,
      mistakes: 0,
    };
    const action = {
      type: null,
      payload: null,
    };
    expect(reducer(state, action)).toEqual(state);
  });

  test(`should increment level`, () => {
    const state = {
      level: 0,
    };
    const action = {
      type: ActionType.INCREMENT_LEVEL,
      payload: 1,
    };
    expect(reducer(state, action)).toEqual({
      level: 1,
    });
  });

  test(`should increase mistakes by 1`, () => {
    const state = {
      mistakes: 0,
    };
    const action = {
      type: ActionType.INCREMENT_MISTAKE,
      payload: 1,
    };
    expect(reducer(state, action)).toEqual({
      mistakes: 1,
    });
  });

  test(`should increase mistakes by 2`, () => {
    const state = {
      mistakes: 0,
    };
    const action = {
      type: ActionType.INCREMENT_MISTAKE,
      payload: 2,
    };
    expect(reducer(state, action)).toEqual({
      mistakes: 2,
    });
  });

  test(`should increase mistakes`, () => {
    const state = {
      mistakes: 1,
    };
    const action = {
      type: ActionType.INCREMENT_MISTAKE,
      payload: 1,
    };
    expect(reducer(state, action)).toEqual({
      mistakes: 2,
    });
  });

  test(`should reset game`, () => {
    const state = {
      level: 9,
      mistakes: 2,
    };
    const action = {
      type: ActionType.RESET_GAME,
      payload: null,
    };
    expect(reducer(state, action)).toEqual({
      level: 0,
      mistakes: 0,
    });
  });

  test(`should choose "game" game screen`, () => {
    const state = {
      level: 0,
      mistakes: 0,
      errorLimit: 3,
      screen: null,
      questions,
    };
    const action = {
      type: ActionType.CHOOSE_SCREEN,
      payload: null,
    };
    expect(reducer(state, action)).toEqual({
      level: 0,
      mistakes: 0,
      errorLimit: 3,
      screen: GameScreenTypes.GAME,
      questions,
    });
  });

  test(`should choose "failed" game screen`, () => {
    const state = {
      level: 0,
      mistakes: 3,
      errorLimit: 3,
      screen: null,
      questions,
    };
    const action = {
      type: ActionType.CHOOSE_SCREEN,
      payload: null,
    };
    expect(reducer(state, action)).toEqual({
      level: 0,
      mistakes: 3,
      errorLimit: 3,
      screen: GameScreenTypes.FAILED,
      questions,
    });
  });

  test(`should choose "success" game screen`, () => {
    const state = {
      level: questions.length,
      mistakes: 0,
      errorLimit: 3,
      screen: null,
      questions,
    };
    const action = {
      type: ActionType.CHOOSE_SCREEN,
      payload: null,
    };
    expect(reducer(state, action)).toEqual({
      level: questions.length,
      mistakes: 0,
      errorLimit: 3,
      screen: GameScreenTypes.SUCCESS,
      questions,
    });
  });
});
