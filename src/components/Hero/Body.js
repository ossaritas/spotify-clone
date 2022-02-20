import { Routes, Route } from "react-router-dom";
import classes from "./Body.module.css";

import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Album from "../Album";
import PlaylistElement from "../PlaylistElement";
import Search from "./Search";
import Browse from "./Browse";

const Body = () => {
  return (
    <div className={classes.bbody}>
      <Sidebar />
      <Footer />
      <Routes>
        <Route path="*" element={<Browse />} />
        <Route path="album" element={<Album />} />
        <Route path="playlists" element={<PlaylistElement />} />
        <Route path="search" element={<Search />} />
      </Routes>
    </div>
  );
};

export default Body;
