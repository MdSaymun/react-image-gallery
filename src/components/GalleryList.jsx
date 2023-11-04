// Import required dependencies and components
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCenter,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "../assets/css/GalleryList.module.css";
import { getImage } from "../utility/getImage";
import { GalleryItem } from "./GalleryItem";
import { SortableItem } from "./SortableItem";

// Configuration for the drop animation.
const dropAnimationConfig = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0",
      },
      dragOverlay: {
        opacity: "1",
      },
    },
  }),
};

// Define the GalleryList component.
export const GalleryList = ({ items, setItems }) => {
  const [active, setActive] = useState(null); // Active item being dragged

  // Use the `useSensors` hook to create sensors for pointer and touch events.
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );
  const isFirstAnnouncement = useRef(true);

  const activeIndex = items.findIndex(({ id }) => id === active?.id);

  // Reset the isFirstAnnouncement ref when the active item is null
  useEffect(() => {
    if (!active) {
      isFirstAnnouncement.current = true;
    }
  }, [active]);

  return (
    <div className={classNames(styles.GalleryListWrapper)}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={({ active }) => {
          if (!active) return;

          setActive(active);
        }}
        onDragEnd={({ active, over }) => {
          if (over && active.id !== over?.id) {
            const overIndex = items.findIndex(({ id }) => id === over.id);

            setItems(arrayMove(items, activeIndex, overIndex));
          }
          setActive(null);
        }}
        onDragCancel={() => setActive(null)}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <div className={classNames(styles.GalleryList)}>
            {items.map((item, index) => (
              <SortableItem key={item?.id} index={index} id={item?.id} itemObj={item} setItems={setItems} />
            ))}
            <div className={styles.AddImage}>
              <img src={getImage("0")} alt="Add image" />
              <span>Add Images</span>
            </div>
          </div>
        </SortableContext>

        {createPortal(
          <DragOverlay adjustScale dropAnimation={dropAnimationConfig}>
            {active ? <GalleryItem dragOverlay value={items[activeIndex]} /> : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

// Define propTypes for type checking and documentation.
GalleryList.propTypes = {
  items: PropTypes.array,
  setItems: PropTypes.func,
};
