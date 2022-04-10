import { createStore } from "redux";

import {
  HANDLE_SEEK,
  MOUSE_DOWN,
  MOUSE_UP,
  ON_DURATION,
  ON_PROGRESS,
  PLAY,
  PLAY_PAUSE,
  SONG_DATA,
  VOLUME_CHANGED,
  VOLUME_TOGGLE,
} from "./actions";

const initialState = {
  searchQ: "",
  songData: {
    artist: "Serdar Sarıtaş",
    song: "My First Project",
    img: "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png",
    id: "",
  },
  url: "",
  pip: null,
  playing: false,
  controls: null,
  light: null,
  volume: 0.5,
  muted: false,
  seeking: false,
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
};

const playerReducer = (state = initialState, action) => {
  if (action.type === PLAY_PAUSE) {
    return { ...state, playing: !state.playing };
  }
  if (action.type === PLAY) {
    return { ...state, playing: true };
  }
  if (action.type === VOLUME_CHANGED) {
    return {
      ...state,
      volume: action.payload.value,
      muted: action.payload.muted,
    };
  }
  if (action.type === VOLUME_TOGGLE) {
    return {
      ...state,
      volume: action.payload.value,
      muted: action.payload.muted,
    };
  }
  if (action.type === MOUSE_DOWN) {
    return { ...state, seeking: true };
  }
  if (action.type === MOUSE_UP) {
    return { ...state, seeking: false };
  }
  if (action.type === HANDLE_SEEK) {
    return {
      ...state,
      progress: { ...state.progress, played: action.payload.played },
    };
  }
  if (action.type === ON_PROGRESS) {
    return {
      ...state,
      progress: {
        played: action.payload.progress.played,
        playedSeconds: action.payload.progress.playedSeconds,
        loaded: action.payload.progress.loaded,
        loadedSeconds: action.payload.progress.loadedSeconds,
      },
    };
  }
  if (action.type === ON_DURATION) {
    return {
      ...state,
      duration: action.payload.duration,
    };
  }
  if (action.type === SONG_DATA) {
    return {
      ...state,
      songData: action.payload.songData,
      searchQ: action.payload.searchQ,
    };
  }
  return state;
};

const store = createStore(playerReducer);

export default store;
