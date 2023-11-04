import PropTypes from "prop-types";
import { GalleryItem } from "./GalleryItem";
import { useSortable } from "@dnd-kit/sortable";

export function SortableItem({ id, index, itemObj, setItems }) {
  // Use the `useSortable` hook to enable sorting and dragging functionality.
  const {
    attributes,
    isDragging, // Indicates whether the item is currently being dragged
    isSorting, // Indicates whether the item is currently being sorted
    listeners, // Event listeners for the sortable item
    setNodeRef, // Reference to the DOM node of the item
    transform, // Transformation information for animations
    transition, // Transition information for animations
  } = useSortable({
    id, // A unique identifier for the item
    data: itemObj, // Data associated with the item
  });

  return (
    <GalleryItem
      ref={setNodeRef} // Pass the reference to the GalleryItem
      value={itemObj} // Pass the data associated with the item
      setItems={setItems} // Function for updating the list when sorting is done
      dragging={isDragging} // Pass the dragging state
      sorting={isSorting} // Pass the sorting state
      index={index} // Pass the index of the item in the list
      transform={transform} // Pass transformation data for animations
      transition={transition} // Pass transition data for animations
      listeners={listeners} // Pass event listeners
      attributes={attributes} // Pass attributes for rendering
    />
  );
}

// Define the prop types for SortableItem for type checking and documentation.
SortableItem.propTypes = {
  id: PropTypes.string, // Unique identifier for the item
  index: PropTypes.number, // Index of the item in the list
  itemObj: PropTypes.object, // Data associated with the item
  setItems: PropTypes.func, // Function to update the list
};
