import { Routes, Route } from "react-router-dom";
import Album from "../Album";
import Playlist from "../Playlist";
import Search from "../Search";
import Browse from "../Browse";
import Artists from "../Artists";
import LikedSongs from "../LikedSongs";

const Body = () => {
  return (
    <Routes>
      <Route path="/*" element={<Browse />} />
      <Route path="/album/:albumId" element={<Album />} />
      <Route path="/playlists/:trackId" element={<Playlist />} />
      <Route path="/artists/:artistsId" element={<Artists />} />
      <Route path="/search" element={<Search />} />
      <Route path="/liked" element={<LikedSongs />} />
    </Routes>
  );
};

export default Body;
