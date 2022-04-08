import { createContext, useState } from "react";

const initialState = {
  searchQ: "",
  songData: {
    artist: "",
    song: "",
    img: "",
    id: "",
  },
  url: null,
  pip: null,
  playing: null,
  controls: null,
  light: null,
  volume: 0,
  muted: null,
  loaded: 0,
  duration: 0,
  playbackRate: 1.0,
  loop: null,
  volumeOpen: null,
  dropdownOpen: null,
  fullscreen: null,
  progress: {
    played: 0,
    playedSeconds: 0,
    loaded: 0,
    loadedSeconds: 0,
  },
  onPlayPause: () => {},
  onPlay: () => {},
  onHandleSeek: () => {},
  onVolumechange: () => {},
  onVolumeToggle: () => {},
  onMouseDown: () => {},
  onMouseUp: () => {},
  onProgress: () => {},
  getSongData: () => {},
  onDuration: () => {},
};

const PlayerContext = createContext(initialState);

export const PlayerContextProvider = (props) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState({
    played: 0,
    playedSeconds: 0,
    loaded: 0,
    loadedSeconds: 0,
  });
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [url, setUrl] = useState("");
  const [songData, setSongData] = useState({
    artist: "Serdar Sarıtaş",
    song: "My First Project",
    img: "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png",
    id: "",
  });
  const [searchQ, setSearchQ] = useState();

  const handlePlayPause = () => {
    setPlaying(!playing);
  };
  const handlePlay = () => {
    setPlaying(true);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleToggleMuted = () => {
    console.log(muted);
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(0.5);
    }
    setMuted(!muted);
  };

  const handleSeekMouseDown = (e) => {
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    setProgress((prevState) => {
      return {
        ...prevState,
        played: parseFloat(e.target.value),
      };
    });
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
  };
  const handleOnProgress = (e) => {
    if (!seeking) {
      setProgress(e);
    }
  };
  const handleDuration = (e) => {
    setDuration(e);
  };

  const handleSongData = (aa, bb, cc, dd) => {
    let searchParam = `${aa} ${bb}`;
    const paramsString = encodeURIComponent(searchParam);
    let mySearchParams = new URLSearchParams(`q=${paramsString}`);
    let searchQ = new URL(
      `http://46.101.218.180:2000/api/search?${mySearchParams}`
    );
    setSearchQ(searchQ.href);
    setSongData({ artist: aa, song: bb, img: cc, id: dd });
  };

  return (
    <PlayerContext.Provider
      value={{
        searchQ: searchQ,
        songData: songData,
        duration: duration,
        url: url,
        volume: volume,
        progress: progress,
        playing: playing,
        muted: muted,
        onPlayPause: handlePlayPause,
        onPlay: handlePlay,
        onVolumechange: handleVolumeChange,
        onMouseDown: handleSeekMouseDown,
        onMouseUp: handleSeekMouseUp,
        onVolumeToggle: handleToggleMuted,
        onHandleSeek: handleSeekChange,
        onProgress: handleOnProgress,
        getSongData: handleSongData,
        onDuration: handleDuration,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;
