import { AuthPageVariant } from "./AuthPage.definitions";
import styles from "./AuthPage.module.css";
import SignUpModal from "../../components/SignUpModal/SignUpModal";
import { SignIn, useSignUp } from "@clerk/clerk-react";
import { useEffect } from "react";
import type { AuthPageProps } from "./AuthPage.definitions";

const AuthPage = ({ variant }: AuthPageProps) => {
  const { signUp } = useSignUp();

  useEffect(() => {
    console.log("HERE: ", signUp?.status);
  }, [signUp?.status]);

  return (
    <div className={styles["auth-page-container"]}>
      <div className={styles["auth-page-left"]}>Test Text</div>
      <div className={styles["auth-page-right"]}>
        {variant === AuthPageVariant.SIGN_IN ? (
          <SignIn
            signUpUrl="/sign-up/"
            afterSignInUrl="/"
            afterSignUpUrl="/dashboard"
          />
        ) : (
          <SignUpModal />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
