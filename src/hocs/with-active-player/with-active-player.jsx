import React, {PureComponent} from "react";

import AudioPlayer from "@components/audio-player";


const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
      this.state = {
        activePlayerId: 0,
      };
    }

    render() {
      const {activePlayerId} = this.state;
      return <Component
        {...this.props}
        renderPlayer={(source, id) => {
          return <AudioPlayer
            source={source}
            isPlaying={activePlayerId === id}
            onPlayButtonClick={() => this._handlePlayButtonClick(id)}
          />;
        }}
      />;
    }

    _handlePlayButtonClick(audioPlayerId) {
      const {activePlayerId} = this.state;
      this.setState({
        activePlayerId: audioPlayerId === activePlayerId ? -1 : audioPlayerId,
      });
    }
  }
  return WithActivePlayer;
};

export default withActivePlayer;
