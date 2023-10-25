import { AuthPageVariant } from "./AuthPage.definitions";
import styles from "./AuthPage.module.css";
import SignUpModal from "../../modals/SignUpModal/SignUpModal";
import SignInModal from "../../modals/SignInModal/SignInModal";
import Logo from "../../assets/BIOLogo.png";
import type { AuthPageProps } from "./AuthPage.definitions";

const AuthPage = ({ variant }: AuthPageProps) => (
  <div className={styles["auth-page-container"]}>
    <div className={styles["auth-page-left"]}>Test Text</div>
    <div className={styles["auth-page-right"]}>
      <div className={styles["auth-logo-container"]}>
        <img src={Logo} alt="BIO Logo" className={styles["auth-logo"]} />
        <div className={styles["auth-logo-text"]}>Book I Own</div>
      </div>
      {variant === AuthPageVariant.SIGN_IN ? <SignInModal /> : <SignUpModal />}
    </div>
  </div>
);

export default AuthPage;
