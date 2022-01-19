import { useRef, useState } from 'react';

function useDialog() {
  const resolveRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);

  async function open(initialData) {
    setInitialData(initialData);
    setIsOpen(true);
    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  }

  function close(payload) {
    setInitialData(null);
    setIsOpen(false);
    resolveRef.current && resolveRef.current(payload);
  }

  return { isOpen, initialData, open, close };
}

export default useDialog;
