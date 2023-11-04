import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "../assets/css/GalleryHeader.module.css";

// Helper function to generate plural text based on count
const getPluralText = (count, text) => {
  if (count > 1) {
    return `${text}s`; // Plural form
  }
  return `${text}`; // Singular form
};

// Define the GalleryHeader component and specify its PropTypes.
export const GalleryHeader = ({ items, setItems }) => {
  // Calculate the number of selected files by filtering items with "isCheck" property set to true.
  const selectedFiles = items?.reduce((acc, crr) => (crr.isCheck ? acc + 1 : acc), 0);

  return (
    <div className={classNames(styles.galleryHeader)}>
      <div className={classNames(styles.headerLeft)}>
        {selectedFiles ? <input type="checkbox" checked /> : null}
        <h4>{selectedFiles ? `${selectedFiles} ${getPluralText(selectedFiles, "File")} Selected` : "Gallery"}</h4>
      </div>
      <div className={classNames(styles.headerRight)}>
        {selectedFiles ? (
          // Render a "Delete" button if there are selected files and define its click handler.
          <button
            className={classNames(styles.Delete)}
            onClick={() => {
              // Filter out items that are checked and update the state with new items.
              const newItems = items?.filter((item) => !item?.isCheck);
              setItems(newItems);
            }}
          >
            Delete {getPluralText(selectedFiles, "File")}
          </button>
        ) : null}
      </div>
    </div>
  );
};

// Define PropTypes for the GalleryHeader component to specify the expected prop types.
GalleryHeader.propTypes = {
  items: PropTypes.array, // An array of items
  setItems: PropTypes.func, // A function to update items
};
