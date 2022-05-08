import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  searchQ: string;
  songData: {
    artist: string;
    song: string;
    img: string;
    id: string;
  };
  url: string;
  pip: null;
  playing: boolean;
  controls: null;
  light: null;
  volume: number;
  muted: boolean;
  seeking: boolean;
  loaded: number;
  duration: number;
  playbackRate: number;
  loop: null;
  volumeOpen: null;
  dropdownOpen: null;
  fullscreen: null;
  progress: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  };
}

export type ProgressType = {
  progress: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  };
};

export type SongDataType = {
  artist: string;
  song: string;
  img: string;
  id: string;
};

const initialPlayerState: PlayerState = {
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

const playerSlice = createSlice({
  name: "player",
  initialState: initialPlayerState,
  reducers: {
    onPlayPause(state) {
      state.playing = !state.playing;
    },
    onPlay(state) {
      state.playing = true;
    },
    onPause(state) {
      state.playing = false;
    },
    onHandleEnd(state) {
      state.playing = false;
      state.progress.played = 0;
      state.progress.playedSeconds = 0;
    },
    onVolumeChange(
      state,
      action: PayloadAction<{ value: number; muted: boolean }>
    ) {
      state.volume = action.payload.value;
      state.muted = action.payload.muted;
    },
    onMouseDown(state) {
      state.seeking = false;
    },
    onMouseUp(state) {
      state.seeking = true;
    },
    onHandleSeek(state, action: PayloadAction<{ played: number }>) {
      state.progress.played = action.payload.played;
    },
    onProgress(state, action: PayloadAction<ProgressType>) {
      state.progress = {
        played: action.payload.progress.played,
        playedSeconds: action.payload.progress.playedSeconds,
        loaded: action.payload.progress.loaded,
        loadedSeconds: action.payload.progress.loadedSeconds,
      };
    },
    onDuration(state, action: PayloadAction<{ duration: number }>) {
      state.duration = action.payload.duration;
    },
    onSongData(
      state,
      action: PayloadAction<{ songData: SongDataType; searchQ: string }>
    ) {
      state.songData = action.payload.songData;
      state.searchQ = action.payload.searchQ;
    },
  },
});

export default playerSlice;
export const playerActions = playerSlice.actions;
