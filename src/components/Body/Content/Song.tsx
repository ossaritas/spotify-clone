import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../../store/player-slice";
import { Link } from "react-router-dom";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { RootState } from "../../../store";

const Song = (props: {
  name: string;
  className?: string;
  artist: string;
  img: string;
  artist_link?: string;
  album_link?: string;
  album?: string;
}) => {
  const songData = useSelector((state: RootState) => state.songData);
  const progress = useSelector((state: RootState) => state.progress);
  const playing = useSelector((state: RootState) => state.playing);
  const dispatch = useDispatch();

  const getSongData = (
    artist: string,
    song: string,
    img: string,
    id: string
  ) => {
    let searchParam = `${artist} ${song}`;
    const paramsString = encodeURIComponent(searchParam);
    let mySearchParams = new URLSearchParams(`q=${paramsString}`);
    let searchQ = new URL(
      `http://46.101.218.180:2000/api/search?${mySearchParams}`
    );
    const searchData = searchQ.href;

    if (songData.id !== props.name) {
      dispatch(
        playerActions.onSongData({
          songData: {
            artist: artist,
            song: song,
            img: img,
            id: id,
          },
          searchQ: searchData,
        })
      );
      dispatch(playerActions.onPlay());
    }
    if (progress.played >= 0.001 && songData.id === props.name) {
      dispatch(playerActions.onPlayPause());
    }
  };
  return (
    <div
      className={`${"group text-[16px] w-full grid gap-[10px] grid-cols-[0.1fr_1fr_1fr_0.9fr] items-center p-[10px] mx-[5px] my-[10px] rounded-[5px] h-auto  ease-in duration-300 hover:bg-[#72727266] hover:text-white"} ${
        props.className ? props.className : ""
      }`}
    >
      <div className="col-start-1 col-end-2">
        <button
          onClick={() =>
            getSongData(props.artist, props.name, props.img, props.name)
          }
          className="cursor-pointer hover:text-[#079707]"
        >
          {songData.id === props.name && playing ? (
            <PauseIcon
              style={{ color: "#04aa6d", width: "32px", height: "32px" }}
            />
          ) : (
            <PlayArrowIcon style={{ width: "32px", height: "32px" }} />
          )}
        </button>
      </div>
      <div className="col-start-2 col-end-3 flex items-center space-x-[15px]">
        <div className="w-[40px] h-[40px]">
          <img
            className="w-full h-full object-contain"
            src={props.img}
            alt="song"
          />
        </div>
        <p className="cursor-default w-[240px] whitespace-nowrap overflow-hidden text-ellipsis">
          {props.name}
        </p>
      </div>
      <div className="group-hover:text-white col-start-3 col-end-4 text-[#B8B8B8] whitespace-nowrap overflow-hidden text-ellipsis ">
        <Link className="hover:underline" to={`/artists/${props.artist_link}`}>
          {props.artist}
        </Link>
      </div>
      <div className="group-hover:text-white col-start-4 col-end-5 text-[#B8B8B8] whitespace-nowrap overflow-hidden text-ellipsis ">
        <Link className="hover:underline" to={`/album/${props.album_link}`}>
          {props.album}
        </Link>
      </div>
    </div>
  );
};

export default Song;
