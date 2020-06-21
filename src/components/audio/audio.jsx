import React, {Fragment} from "react";
import PropTypes from "prop-types";

import PlayButton from "@components/play-button";
import Player from "@components/player";


const Audio = (props) => {
  const {onPlayAudioClick} = props;
  return <Fragment>
    <PlayButton onButtonClick={onPlayAudioClick} />
    <Player />
  </Fragment>;
};

Audio.propTypes = {
  onPlayAudioClick: PropTypes.func.isRequired,
};

export default Audio;
