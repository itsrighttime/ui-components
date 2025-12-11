import { useState } from "react";
import { DroppableArea } from "../../DragAndDrop/jsx/DroppableArea.jsx";
import { DraggableItem } from "../../DragAndDrop/jsx/DraggableItm.jsx";

/**
 * 
 * @returns 
 * 
 * TODO : Still Need to work on:
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

export const UseDragAndDropExample = () => {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text", id);
  };

  const handleDrop = (id, x, y) => {
    const name = initialItems.find((item) => item.id === id)?.name || "Item";
    setDroppedItems((prev) => [
      ...prev,
      { id: `${id}-${Date.now()}`, name, x, y },
    ]);
  };

  const initialItems = [
    { id: "item1", name: "Chair" },
    { id: "item2", name: "Lamp" },
    { id: "item3", name: "Desk" },
  ];

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
      <div>
        <h3>Draggable Items</h3>
        {initialItems.map((item) => (
          <DraggableItem
            key={item.id}
            id={item.id}
            name={item.name}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
      <div>
        <h3>Droppable Area</h3>
        <DroppableArea items={droppedItems} onDrop={handleDrop} />
      </div>
    </div>
  );
};
