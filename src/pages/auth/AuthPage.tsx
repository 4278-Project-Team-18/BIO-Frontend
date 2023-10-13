import { AuthPageVariant } from "./AuthPage.definitions";
import styles from "./AuthPage.module.css";
import { SignIn, SignUp } from "@clerk/clerk-react";
import type { AuthPageProps } from "./AuthPage.definitions";

const AuthPage = ({ variant }: AuthPageProps) => (
  <div className={styles["auth-page-container"]}>
    <div className={styles["auth-page-left"]}>Test Text</div>
    <div className={styles["auth-page-right"]}>
      {variant === AuthPageVariant.SIGN_IN ? (
        <SignIn signUpUrl="/sign-up/" redirectUrl="/dashboard" />
      ) : (
        <SignUp signInUrl="/sign-in/" redirectUrl="/dashboard" />
      )}
    </div>
  </div>
);

export default AuthPage;
