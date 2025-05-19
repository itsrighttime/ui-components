import React from "react";
import styles from "../css/DraggableItem.module.css";

const DraggableItem = ({ id, name, onDragStart }) => {
  return (
    <div
      className={styles.draggableItem}
      draggable
      onDragStart={(e) => onDragStart(e, id)}
    >
      {name}
    </div>
  );
};

export default DraggableItem;
