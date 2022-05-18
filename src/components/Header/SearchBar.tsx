import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  Stack,
} from "@chakra-ui/react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SearchBar = (props: {
  inputRef: any;
  searchText: string;
  searchHandler: () => void;
}) => {
  return (
    <FormControl
      onSubmit={(e) => {
        e.preventDefault();
      }}
      zIndex="sticky"
      position="fixed"
      top="0"
      pt="3"
      h="16"
      bgGradient={"linear(to-t, #000000,  #3d3d3d)"}
    >
      <FormLabel id="search">
        <InputGroup pl="6" transition="ease-out 200ms">
          <Stack direction="row" spacing={4}>
            <InputLeftAddon
              cursor="pointer"
              border="none"
              p="0"
              m="0"
              _hover={{ transform: "scale(1.05)", color: "white" }}
              color="spotify.text-gray"
              bg="transparent"
              pointerEvents="auto"
              children={
                <SearchOutlinedIcon
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                />
              }
            />
            <Input
              p="2"
              borderRadius="lg"
              noOfLines={1}
              _focus={{ w: "96" }}
              w="50"
              // className="w-[200px] rounded whitespace-nowrap text-ellipsis pl-[5px] text-black focus:w-[360px] ease-in-out duration-300 outline-none italic"
              type="text"
              ref={props.inputRef}
              value={props.searchText}
              onChange={props.searchHandler}
              placeholder="Search for artists and songs"
            />
          </Stack>
        </InputGroup>
      </FormLabel>
    </FormControl>
  );
};

export default SearchBar;
