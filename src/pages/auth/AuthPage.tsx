import { AuthPageVariant } from "./AuthPage.definitions";
import styles from "./AuthPage.module.css";
import SignUpModal from "../../components/SignUpModal/SignUpModal";
import SignInModal from "../../components/SignInModal/SignInModal";
import type { AuthPageProps } from "./AuthPage.definitions";

const AuthPage = ({ variant }: AuthPageProps) => (
  <div className={styles["auth-page-container"]}>
    <div className={styles["auth-page-left"]}>Test Text</div>
    <div className={styles["auth-page-right"]}>
      {variant === AuthPageVariant.SIGN_IN ? <SignInModal /> : <SignUpModal />}
    </div>
  </div>
);

export default AuthPage;
