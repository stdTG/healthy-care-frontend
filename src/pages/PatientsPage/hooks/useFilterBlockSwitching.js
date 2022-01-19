import { useState } from 'react';

const useFilterBlockSwitching = () => {
  const [filtersOpened, setFiltersOpened] = useState(true);

  const handleFilterButtonClick = () => {
    setFiltersOpened(!filtersOpened);
  };
  return [filtersOpened, handleFilterButtonClick];
};

export default useFilterBlockSwitching;
