// Import required dependencies and styles
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import styles from "../assets/css/GalleryItem.module.css";
import { getImage } from "../utility/getImage";

export const GalleryItem = React.memo(
  React.forwardRef(
    (
      {
        dragOverlay, // Indicates if the item is part of a drag overlay
        dragging, // Indicates if the item is currently being dragged
        index, // Index of the item in the gallery
        value, // Data associated with the item
        setItems, // Function to update the list of items
        listeners, // Event listeners for the item
        attributes, // Attributes for rendering
        sorting, // Indicates if the item is currently being sorted
        transition, // Transition information for animations
        transform, // Transformation information for animations
      },
      ref
    ) => {
      // Function to handle the checkbox state change
      const handleChecked = () => {
        setItems?.((prev) => {
          const modifiedItems = prev.map((item) => ({
            ...item,
            isCheck: item?.id === value?.id ? !item.isCheck : item.isCheck,
          }));

          return modifiedItems;
        });
      };

      return (
        <div
          className={classNames(styles.ItemWrapper, sorting && styles.sorting, dragOverlay && styles.dragOverlay)}
          style={{
            transition: transition || undefined,
            "--translate-x": transform ? `${Math.round(transform.x)}px` : undefined,
            "--translate-y": transform ? `${Math.round(transform.y)}px` : undefined,
            "--scale-x": transform?.scaleX ? `${transform.scaleX}` : undefined,
            "--scale-y": transform?.scaleY ? `${transform.scaleY}` : undefined,
            "--index": index,
          }}
          ref={ref}
        >
          <div
            className={classNames(styles.Item, dragging && styles.dragging, dragOverlay && styles.dragOverlay)}
            tabIndex={0}
            {...listeners}
            {...attributes}
          >
            <div className={classNames(styles.CheckboxWrapper, value?.isCheck && styles.Checked)}>
              <input
                className={classNames(styles.Checkbox)}
                type="checkbox"
                checked={value?.isCheck}
                onChange={handleChecked}
              />
            </div>
            <div className={classNames(styles.imgWrapper)}>
              <img src={getImage(value?.id)} alt="image" />
            </div>
            <div className={classNames(styles.Backdrop, value?.isCheck && styles.Checked)}></div>
          </div>
        </div>
      );
    }
  )
);

// Define propTypes for type checking and documentation.
GalleryItem.propTypes = {
  dragOverlay: PropTypes.bool, // Indicates whether the item is being dragged
  dragging: PropTypes.bool, // Indicates whether the item is being dragged
  index: PropTypes.number, // Index of the item in the list
  value: PropTypes.object, // Data associated with the item
  setItems: PropTypes.func, // Function to update the list
  listeners: PropTypes.object, // Event listeners for the item
  attributes: PropTypes.object, // Attributes for rendering
  sorting: PropTypes.bool, // Indicates whether the item is being sorted
  transition: PropTypes.string, // Transition information for animations
  transform: PropTypes.object, // Transformation information for animations
};
