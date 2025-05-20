import styles from "../css/DraggableItem.module.css";

/**
 * DraggableItem component
 *
 * A basic draggable UI element representing an item that can be moved into a droppable zone.
 *
 * @component
 * @param {Object} props
 * @param {string|number} props.id - The unique identifier of the draggable item.
 * @param {string} props.name - The display name of the item.
 * @param {function} props.onDragStart - Callback triggered when drag starts. Receives the event and item ID.
 *
 * @example
 * <DraggableItem
 *   id="item1"
 *   name="Chair"
 *   onDragStart={(e, id) => console.log("Dragging:", id)}
 * />
 */
export const DraggableItem = ({ id, name, onDragStart }) => {
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
