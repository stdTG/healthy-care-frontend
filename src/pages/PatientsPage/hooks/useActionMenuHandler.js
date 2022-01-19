import { useState, useRef, useEffect } from 'react';

const useActionMenuHandler = (anchorRef) => {
  const [open, setOpen] = useState(false);
  const prevOpen = useRef(open);

  const onOpenMenu = (event) => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const onCloseMenu = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return [open, onOpenMenu, handleListKeyDown, onCloseMenu];
};

export default useActionMenuHandler;
