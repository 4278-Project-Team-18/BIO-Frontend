import SideBar from "./Sidebar";
import styles from "./App.module.css";
import { Outlet } from "react-router";

const App = () => (
  <div className={styles["app-main-container"]}>
    <div className={styles["app-main-sidebar"]}>
      <SideBar />
    </div>
    <div className={styles["app-main-content"]}>
      <Outlet />
    </div>
  </div>
);

export default App;
