import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../../store/player-slice";
import { Link as ReachTo } from "react-router-dom";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { RootState } from "../../../store";
import { Button, HStack, Image, Text, Link } from "@chakra-ui/react";

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
    <HStack
      borderRadius="lg"
      w="full"
      _hover={{ bg: "#72727266", color: "white" }}
      role="group"
      p="2.5"
      my="2.5"
      h="auto"
      transition="ease-in 300ms"
    >
      <Button
        w="3vw"
        _hover={{ color: "spotify.g1" }}
        onClick={() =>
          getSongData(props.artist, props.name, props.img, props.name)
        }
      >
        {songData.id === props.name && playing ? (
          <PauseIcon
            style={{ color: "#04aa6d", width: "32px", height: "32px" }}
          />
        ) : (
          <PlayArrowIcon style={{ width: "32px", height: "32px" }} />
        )}
      </Button>
      <HStack w="33vw">
        <Image boxSize="10" objectFit="contain" src={props.img} alt="song" />
        <Text w="80%" noOfLines={1}>
          {props.name}
        </Text>
      </HStack>
      <Text
        w="33vw"
        noOfLines={1}
        color="spotify.text-gray"
        _groupHover={{ color: "white" }}
      >
        <Link
          as={ReachTo}
          _hover={{ textDecor: "underline" }}
          to={`/artists/${props.artist_link}`}
        >
          {props.artist}
        </Link>
      </Text>
      <Text
        w="33vw"
        noOfLines={1}
        color="spotify.text-gray"
        _groupHover={{ color: "white" }}
      >
        <Link
          as={ReachTo}
          _hover={{ textDecor: "underline" }}
          to={`/album/${props.album_link}`}
        >
          {props.album}
        </Link>
      </Text>
    </HStack>
  );
};

export default Song;
