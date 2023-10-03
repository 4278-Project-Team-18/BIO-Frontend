import styles from "./FullPageLoadingIndicator.module.css";
import { MoonLoader } from "react-spinners";
import type { FullPageLoadingIndicatorProps } from "./FullPageLoadingIndicator.definitions";

const FullPageLoadingIndicator = ({
  height = 200,
  width = 200,
}: FullPageLoadingIndicatorProps) => (
  <div className={styles["full-page-loading"]}>
    <div
      className={styles["full-page-loading-spinner"]}
      style={{
        height: `${height}px`,
        width: `${width}px`,
      }}
    >
      <MoonLoader color="#209bb6" />
    </div>
  </div>
);

export default FullPageLoadingIndicator;
