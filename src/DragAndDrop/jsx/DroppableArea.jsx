import React, { useState, useRef } from "react";
import styles from "../css/DroppableArea.module.css";

const DroppableArea = ({ items, onDrop }) => {
  const droppableRef = useRef(null); // Reference to the droppable area
  const [cursorPoint, setCursorPoint] = useState(["-", "-"]);

  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");

    // Get the bounding rectangle of the droppable area
    const rect = droppableRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // Calculate the relative X position
    const y = e.clientY - rect.top; // Calculate the relative Y position

    // Call onDrop with the new position
    onDrop(id, x, y);
  };

  const handleMouseMove = (e) => {
    const rect = droppableRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCursorPoint([x, y]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleItemDragStart = (e, id) => {
    e.dataTransfer.setData("text", id);
  };

  return (
    <>
      <div
        ref={droppableRef}
        className={styles.droppableArea}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseMove={handleMouseMove}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={styles.droppedItem}
            draggable
            onDragStart={(e) => handleItemDragStart(e, item.id)}
            style={{ left: item.x, top: item.y }}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className={styles.cursorPoint}>
        {`{${cursorPoint[0]}, ${cursorPoint[1]}} `}
      </div>
    </>
  );
};

export default DroppableArea;
