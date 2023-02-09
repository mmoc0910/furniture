import React from "react";

export default function useClickOutSide() {
  const initialNodeRef = React.useRef();
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    function handleClickDropdown(e) {
      //   console.log(e.target);
      if (
        e.target &&
        initialNodeRef &&
        !initialNodeRef?.current?.contains(e.target)
      ) {
        setShow(false);
      }
    }
    document.addEventListener("click", handleClickDropdown);
  }, []);
  return {
    show,
    setShow,
    initialNodeRef,
  };
}
