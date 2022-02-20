import Body from "./components/Hero/Body";
import { Routes, Route } from "react-router-dom";
import Album from "./components/Album";
import PlaylistElement from "./components/PlaylistElement";
import Search from "./components/Hero/Search";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Body />}>
        <Route path="/album" element={<Album />} />
        <Route path="/playlists" element={<PlaylistElement />} />
        <Route path="/search" element={<Search />} />
      </Route>
    </Routes>
  );
}

export default App;
