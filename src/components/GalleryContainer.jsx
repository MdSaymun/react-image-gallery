import { GalleryHeader } from "./GalleryHeader";
import { GalleryList } from "./GalleryList";
import classNames from "classnames";
import styles from "../assets/css/GalleryContainer.module.css";
import { useState } from "react";

// Create an initial array of items with 11 elements, each having an ID and an "isCheck" property.
const initialItems = Array.from({ length: 11 }, (_, i) => ({
  id: (i + 1).toString(),
  isCheck: false,
}));

// Define the GalleryContainer component.
export const GalleryContainer = () => {
  // Use the useState hook to manage the "items" state. Initialize it with the "initialItems" array.
  const [items, setItems] = useState(() => initialItems);

  // Render the GalleryContainer component.
  return (
    <div className={classNames(styles.GalleryContainer)}>
      {/* Render the GalleryHeader component and pass the "items" state and "setItems" function as props. */}
      <GalleryHeader items={items} setItems={setItems} />

      {/* Render the GalleryList component and pass the "items" state and "setItems" function as props. */}
      <GalleryList items={items} setItems={setItems} />
    </div>
  );
};
