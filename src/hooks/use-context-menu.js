import { useState, useEffect } from "react";
const useContextMenu = () => {
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });

  const [isAddTriggered, setIsAddTriggered] = useState(false);
  const [isDeleteTriggered, setIsDeleteTriggered] = useState(false);

  const handleAddClick = () => {
    setIsAddTriggered(true);
    setClicked(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteTriggered(true);
    setClicked(false);
  };

  useEffect(() => {
    const handleClick = () => setClicked(false); // untoggle context menu when clicked
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return {
    clicked,
    setClicked,
    points,
    setPoints,
    handleAddClick,
    handleDeleteClick,
    isAddTriggered,
    isDeleteTriggered,
  };
};
export default useContextMenu;
