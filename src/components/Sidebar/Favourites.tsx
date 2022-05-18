import { Container, List, ListItem, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as ReachTo } from "react-router-dom";
import { PlaylistItems } from "../../Spotify/interfaces";

import Spotify from "../../Spotify/Spotify";

const Favourites = () => {
  const [playList, setplayList] = useState<PlaylistItems[]>([]);

  useEffect(() => {
    const getPlaylist = async () => {
      const playList = await Spotify.getPlayList();
      const items = playList.items;
      setplayList(items);
    };
    getPlaylist();
  }, []);

  return (
    <Container maxW="full" p="0">
      <List pb="20" overflowY="scroll" h="lg">
        {playList
          ? playList.map((item) => (
              <ListItem
                h="8"
                p="2px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                key={item.id}
              >
                <Link
                  _activeLink={{ color: "white" }}
                  _focus={{ outline: "none", color: "white" }}
                  _hover={{ color: "gray.200" }}
                  color="spotify.text-gray"
                  as={ReachTo}
                  to={`/playlists/${item.id}`}
                >
                  {item.name}
                </Link>
              </ListItem>
            ))
          : null}
      </List>
    </Container>
  );
};

export default Favourites;
