
const useReload = () => {
  const handleReload = () => {
    window.location.reload(); 
  };

  return { handleReload };
};

export default useReload;
