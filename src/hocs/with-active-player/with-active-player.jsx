import React, {PureComponent} from "react";

import AudioPlayer from "@components/audio-player";
import withAudio from "@hocs/with-audio";


const AudioPlayerWrapper = withAudio(AudioPlayer);

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0,
      };
    }

    render() {
      const {activePlayerId} = this.state;

      return <Component
        {...this.props}
        renderPlayer={(source, id) => {
          return (
            <AudioPlayerWrapper
              source={source}
              isPlaying={id === activePlayerId}
              onPlayButtonClick={() => this.setState({
                activePlayerId: activePlayerId === id ? -1 : id
              })}
            />
          );
        }}
      />;
    }
  }

  return WithActivePlayer;
};

export default withActivePlayer;
