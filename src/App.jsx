import classNames from "classnames";
import { GalleryContainer } from "./components";
import styles from './assets/css/App.module.css'

const App = () => {
  return (
    <div className={classNames(styles.App)}>
      <GalleryContainer />
    </div>
  );
};

export default App;
