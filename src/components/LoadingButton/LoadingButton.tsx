import styles from "./LoadingButton.module.css";
import {
  LoadingButtonVariant,
  type LoadingButtonProps,
  LoadingButtonVariantColorMap,
} from "./LoadingButton.definitions";
import { MoonLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * A button that shows a loading spinner when loading
 *
 * @param text - REQUIRED: the text to display on the button
 * @param isLoading - REQUIRED: whether or not the button is loading
 * @param onClick - optional function to call when the button is clicked
 * @param styles - optional styles to apply to the button
 * @param isLoadingText - optional text to display when the button is loading (defaults to "Loading...")
 * @param icon - optional icon to display on the button next to label text (defaults to nothing)
 * @param variant - optional variant of the button (defaults to green)
 * @param type - optional type of the button (defaults to "button")
 */
const LoadingButton = ({
  onClick,
  text,
  isLoading,
  isLoadingText = "Loading...",
  styles: style,
  icon,
  variant = LoadingButtonVariant.GREEN,
  type = "button",
}: LoadingButtonProps) => (
  <button
    onClick={onClick}
    className={styles["loading-button"]}
    style={{
      ...style,
      backgroundColor: LoadingButtonVariantColorMap[variant],
    }}
    type={type}
  >
    <span className={styles["loading-button-label"]}>
      {isLoading ? isLoadingText : text}
    </span>
    {icon && !isLoading ? (
      <FontAwesomeIcon
        icon={icon}
        className={styles["loading-button-spinner"]}
      />
    ) : (
      <MoonLoader
        size={16}
        color="#fff"
        loading={isLoading}
        className={styles["loading-button-spinner"]}
      />
    )}
  </button>
);

export default LoadingButton;
