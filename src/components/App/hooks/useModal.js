import { useCallback } from "react";

const useModal = ({ setDisplayModal }) => {
  const handleModalClose = useCallback(() => {
    setDisplayModal(false);
  }, []);

  const handleModalShow = useCallback(() => {
    setDisplayModal(true);
  }, []);

  return { handleModalClose, handleModalShow };
};

export default useModal;
