import { createContext } from "react";

const initialState = {
  isLoggedIn: false,
  token: null,
  onLogin: () => {},
  getPlaylist: () => {},
};

const SpotifyContext = createContext(initialState);

export const SpotifyContextProvider = (props) => {
  return (
    <SpotifyContext.Provider value={{}}>
      {props.children}
    </SpotifyContext.Provider>
  );
};

export default SpotifyContext;
