import React from "react";
import { useWindowSize } from "react-use";

export default function use100vh() {
  const ref = React.useRef();
  const { height } = useWindowSize();

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.style.height = height + "px";
  }, [height]);

  return ref;
}
