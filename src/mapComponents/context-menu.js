import Map from "./Map";

import { useState, useEffect } from "react";

//child of Map
export default function ContextMenu({
  x,
  y,
  handleAddClick,
  handleDeleteClick,
}) {
  const style = {
    top: `${y}px`,
    left: `${x}px`,
  };

  return (
    <div
      style={style}
      className=" absolute w-[200px] bg-gray-900
    rounded-lg box-border "
    >
      <ul className="box-border p-[10px] m-0 list-none">
        <li
          onClick={handleAddClick}
          className="rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-600"
        >
          Add
        </li>
        <li
          onClick={handleDeleteClick}
          className="rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-600"
        >
          Delete
        </li>
      </ul>
    </div>
  );
}
