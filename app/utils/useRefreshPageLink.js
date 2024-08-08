import { useCallback } from 'react';

const useRefreshPageLink = () => {
  return useCallback((href) => {
    return (e) => {
      e.preventDefault();
      if (href) {
        window.location.href = href;
      } else {
        console.error('No href provided to RefreshPageLink');
      }
    };
  }, []);
};

export default useRefreshPageLink;
