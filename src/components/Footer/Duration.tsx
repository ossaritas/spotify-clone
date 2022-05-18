import { Text } from "@chakra-ui/react";

export default function Duration(props: {
  className?: string;
  seconds: number;
}) {
  return (
    <Text fontSize="14px">
      <time
        dateTime={`P${Math.round(props.seconds)}S`}
        className={props.className}
      >
        {format(props.seconds)}
      </time>
    </Text>
  );
}

function format(seconds: number) {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
}

function pad(string: number | string) {
  return ("0" + string).slice(-2);
}
