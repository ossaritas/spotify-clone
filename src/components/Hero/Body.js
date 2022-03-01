import { Routes, Route } from "react-router-dom";
import classes from "./Body.module.css";

import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Album from "../Album";
import PlaylistElement from "../PlaylistElement";
import Search from "./Search";
import Browse from "./Browse";
import Artists from "../Artists";
import LikedSongs from "../LikedSongs";

const Body = () => {
  return (
    <div className={classes.bbody}>
      <Sidebar />
      <Footer />
      <Routes>
        <Route path="/*" element={<Browse />} />
        <Route path="/album/:albumId" element={<Album />} />
        <Route path="/playlists/:trackId" element={<PlaylistElement />} />
        <Route path="/artists/:artistsId" element={<Artists />} />
        <Route path="/search" element={<Search />} />
        <Route path="/liked" element={<LikedSongs />} />
      </Routes>
    </div>
  );
};

export default Body;
