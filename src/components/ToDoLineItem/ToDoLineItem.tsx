import styles from "./ToDoLineItem.module.css";
import { useNavigationContext } from "../../context/Navigation.context";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { TabOptions } from "../../interfaces/User.interface";
import type { ToDoLineItemProps } from "./ToDoLineItem.definitions";

const ToDoLineItem = ({ toDoItem, link, icon }: ToDoLineItemProps) => {
  const { setCurrentTab } = useNavigationContext();

  // Sets the active route when a route is clicked
  const handleRouteChange = (route: TabOptions) => {
    setCurrentTab(route);
  };

  return (
    <div className={styles["todo-item-container"]}>
      <div className={styles["todo-item-container-left"]}>
        <div className={styles["todo-item-icon"]}>
          <FontAwesomeIcon icon={icon} />
        </div>
        {toDoItem}
      </div>
      <div className={styles["todo-item-container-right"]}>
        <div className={styles["todo-item-button"]}>
          <Link
            to={"/" + link}
            onClick={() => {
              handleRouteChange(link.toLowerCase() as TabOptions);
            }}
            className={styles["todo-item-button-title"]}
          >
            {"Go To " + link.charAt(0).toUpperCase() + link.slice(1) + " Page"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ToDoLineItem;
