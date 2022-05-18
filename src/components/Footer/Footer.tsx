import { useEffect, useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import DevicesIcon from "@mui/icons-material/Devices";

import ReactPlayer from "react-player/youtube";
import Spotify from "../../Spotify/Spotify";
import Duration from "./Duration";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../store/player-slice";
import { RootState } from "../../store";
import {
  HStack,
  GridItem,
  Image,
  Text,
  VStack,
  Slider,
  SliderThumb,
  SliderTrack,
  SliderFilledTrack,
  Button,
} from "@chakra-ui/react";

const Footer = () => {
  const isPlaying = useSelector((state: RootState) => state.playing);
  const songData = useSelector((state: RootState) => state.songData);
  const volume = useSelector((state: RootState) => state.volume);
  const muted = useSelector((state: RootState) => state.muted);
  const progress = useSelector((state: RootState) => state.progress);
  const seeking = useSelector((state: RootState) => state.seeking);
  const duration = useSelector((state: RootState) => state.duration);
  const searchQ = useSelector((state: RootState) => state.searchQ);
  const dispatch = useDispatch();

  let player: any;
  const ref = (playerRef: any) => {
    player = playerRef;
  };

  const [url, setUrl] = useState<string>();
  useEffect(() => {
    const getDetails = async () => {
      const details = await Spotify.getYoutubeSong(searchQ);
      let { url } = details;
      setUrl(url);
    };
    getDetails();
  }, [searchQ]);

  // default volume input handler
  // const volumeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (volume > 0) {
  //     dispatch(
  //       playerActions.onVolumeChange({
  //         value: parseFloat(event.target.value),
  //         muted: false,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       playerActions.onVolumeChange({
  //         value: parseFloat(event.target.value),
  //         muted: true,
  //       })
  //     );
  //   }
  // };

  // chakra-ui slider volume handler
  const volumeH = (val: number) => {
    if (volume > 0) {
      dispatch(
        playerActions.onVolumeChange({
          value: val,
          muted: false,
        })
      );
    } else {
      dispatch(
        playerActions.onVolumeChange({
          value: val,
          muted: true,
        })
      );
    }
  };
  const volumeMuteHandler = () => {
    if (volume > 0) {
      dispatch(playerActions.onVolumeChange({ value: 0, muted: true }));
    } else {
      dispatch(playerActions.onVolumeChange({ value: 0.5, muted: false }));
    }
  };
  //    default input seek handler
  // const seekHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   dispatch(
  //     playerActions.onHandleSeek({ played: parseFloat(event.target.value) })
  //   );
  //   player.seekTo(parseFloat(event.target.value), "fraction");
  // };

  //chakra-ui slider seek handler
  const seekH = (val: number) => {
    dispatch(playerActions.onHandleSeek({ played: val }));
    player.seekTo(val, "fraction");
  };

  const progressHandler = (progress: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    if (!seeking) {
      dispatch(playerActions.onProgress({ progress }));
    }
    if (progress.played >= 0.997) {
      dispatch(playerActions.onHandleEnd());
    }
  };
  const durationHandler = (duration: number) => {
    dispatch(playerActions.onDuration({ duration }));
  };
  return (
    <GridItem
      gridArea="2/1/3/3"
      h="24"
      display="flex"
      bg="spotify.footer"
      p="2.5"
      pr="5"
      justifyContent="space-between"
    >
      <HStack p="2.5" spacing="2.5">
        <ReactPlayer
          ref={ref}
          url={url}
          volume={volume}
          width={0}
          height={0}
          playing={isPlaying}
          muted={muted}
          onSeek={(e) => console.log("onSeek", e)}
          onPlay={() => dispatch(playerActions.onPlay())}
          onEnded={() => dispatch(playerActions.onHandleEnd())}
          onProgress={progressHandler}
          onDuration={durationHandler}
          onError={(e) => console.log("onError", e)}
        />

        <Image
          border="2px"
          borderColor="spotify.g1"
          boxSize="16"
          objectFit="contain"
          src={songData.img}
          alt=""
        />
        <Text w="48" noOfLines={1}>
          {songData.artist} &amp; {songData.song}
        </Text>
      </HStack>
      <VStack mr="10" p="2.5" spacing="1.5" justifyContent="center">
        <HStack spacing="2">
          <Duration seconds={progress.playedSeconds} />

          <Slider
            colorScheme="green"
            w="56"
            onMouseDown={() => dispatch(playerActions.onMouseUp())}
            onMouseUp={() => dispatch(playerActions.onMouseDown())}
            onChange={seekH}
            focusThumbOnChange={false}
            aria-label="slider-ex-1"
            value={progress.played}
            min={0}
            max={1}
            step={0.001}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb ml="0.5" />
          </Slider>

          <Duration seconds={duration} />
        </HStack>

        <HStack>
          <Button bg="transparent" _hover={{ transform: "scale(1.1)" }}>
            <SkipPreviousIcon style={{ width: "35px", height: "35px" }} />
          </Button>

          <Button
            bg="transparent"
            _hover={{ transform: "scale(1.1)" }}
            onClick={() => dispatch(playerActions.onPlayPause())}
          >
            {!isPlaying ? (
              <PlayCircleIcon style={{ width: "35px", height: "35px" }} />
            ) : (
              <PauseCircleFilledIcon
                style={{ width: "35px", height: "35px" }}
              />
            )}
          </Button>

          <Button bg="transparent" _hover={{ transform: "scale(1.1)" }}>
            <SkipNextIcon style={{ width: "35px", height: "35px" }} />
          </Button>
        </HStack>
      </VStack>
      <HStack mr="10">
        <Button
          _active={{ bg: "transparent" }}
          bg="transparent"
          _hover={{ transform: "scale(1.1)" }}
        >
          <DevicesIcon />
        </Button>

        <Button
          _focus={{ outline: "none" }}
          bg="transparent"
          _hover={{ transform: "scale(1.1)" }}
          onClick={volumeMuteHandler}
        >
          {volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </Button>

        <Slider
          w="28"
          colorScheme="green"
          onChange={volumeH}
          focusThumbOnChange={false}
          aria-label="slider-vol"
          value={volume}
          min={0}
          max={1}
          step={0.01}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </HStack>
    </GridItem>
  );
};

export default Footer;
