import styles from "./ActionTile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ActionTileProps } from "./ActionTile.definitions";

const ActionTile = ({ title, icon, onClick }: ActionTileProps) => (
  <div className={styles["action-tile-container"]} onClick={onClick}>
    <FontAwesomeIcon icon={icon} className={styles["action-tile-icon"]} />
    <div className={styles["action-tile-title"]}>{title}</div>
  </div>
);

export default ActionTile;
