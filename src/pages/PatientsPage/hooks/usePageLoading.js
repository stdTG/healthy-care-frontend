import { useEffect, useState } from 'react';

const usePageLoading = (dataLoading) => {
  const [pageLoading, setPageLoading] = useState(true);
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    if (firstLoading && dataLoading) {
      setPageLoading(true);
      setFirstLoading(false);
    } else if (!firstLoading && !dataLoading) {
      setPageLoading(false);
    }
  }, [dataLoading]);

  return pageLoading;
};

export default usePageLoading;
