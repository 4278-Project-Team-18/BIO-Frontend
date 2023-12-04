import { SignInInputName } from "./SignInModal.definitions";
import styles from "./SignInModal.module.css";
import { signInSchema } from "../../resolvers/auth.resolver";
import FormInput from "../../components/FormInput/FormInput";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import { LoadingButtonVariant } from "../../components/LoadingButton/LoadingButton.definitions";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { useUserContext } from "../../context/User.context";
import {
  removeValueFromLocalStorage,
  setValueToLocalStorage,
} from "../../util/storage.util";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useAuth, useSignIn } from "@clerk/clerk-react";
import { useEffect } from "react";
import type { SignInInput } from "./SignInModal.definitions";
import type { Resolver } from "react-hook-form";
import type { UserType } from "../../interfaces/User.interface";

const SignInModal = () => {
  // hooks from context, clerk, and react-router-dom
  const { isLoaded, signIn, setActive } = useSignIn();
  const navigate = useNavigate();
  const { setCurrentUser } = useUserContext();
  const { signOut } = useAuth();

  // form controller for the new user
  const {
    control: signInControl,
    handleSubmit: handleSignInSubmit,
    formState: { errors: signInErrors },
  } = useForm<SignInInput>({
    defaultValues: {
      [SignInInputName.EMAIL]: "",
      [SignInInputName.PASSWORD]: "",
    },
    resolver: yupResolver(signInSchema) as Resolver<SignInInput>,
    mode: "onSubmit",
  });

  // request to create the user
  const {
    data: userData,
    error: errorUser,
    makeRequest: makeUserRequest,
  } = useCustomFetch<UserType>(
    `/accounts?accountEmail=`,
    RequestMethods.GET_WAIT,
  );

  useEffect(() => {
    const signOutUser = async () => {
      removeValueFromLocalStorage("accountEmail");
      removeValueFromLocalStorage("accountRole");
      // clear out cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // clear out local storage
      localStorage.clear();

      await signOut();
    };

    signOutUser();
  }, []);

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData);
      setValueToLocalStorage("accountEmail", userData.email);
      setValueToLocalStorage("accountRole", userData.role);
      navigate("/");
    }

    if (errorUser) {
      console.log(errorUser);
    }
  }, [userData]);

  /**
   * Handle the submission of the new user data and send the email code.
   *
   * @param {SignUpInput} inputData - the input data from the form
   */
  const onSubmitSignIn = async (inputData: SignInInput) => {
    if (!isLoaded) {
      return;
    }

    try {
      // Complete the sign in and get the session with Clerk
      const completeSignIn = await signIn.create({
        identifier: inputData.email,
        password: inputData.password,
      });

      // If the sign in was successful, set the active session and make the user request
      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });

        await makeUserRequest(undefined, inputData.email);
      }
    } catch (err) {
      await setActive({ session: null });
    }
  };

  return (
    <div className={styles["sign-in-container"]}>
      <form
        onSubmit={handleSignInSubmit(onSubmitSignIn)}
        className={styles["sign-in-inner-container"]}
      >
        <div className={styles["sign-in-header-text"]}>Welcome back.</div>
        <div className={styles["sign-in-subheader-text"]}>
          Sign in to continue to Book I Own
        </div>

        <FormInput
          control={signInControl}
          type="text"
          name={SignInInputName.EMAIL}
          label="Email"
          error={signInErrors[SignInInputName.EMAIL]?.message}
          placeholder="Email"
          autocomplete="email"
        />
        <FormInput
          control={signInControl}
          type="password"
          name={SignInInputName.PASSWORD}
          label="Password"
          error={signInErrors[SignInInputName.PASSWORD]?.message}
          placeholder="Password"
          autocomplete="new-password"
        />
        <div className={styles["sign-in-button-container"]}>
          <LoadingButton
            text="Sign In"
            type="submit"
            isLoading={false}
            isLoadingText="Loading..."
            isResponsive={false}
            variant={LoadingButtonVariant.BLACK}
            styles={{ width: "100%" }}
          />
        </div>
      </form>
    </div>
  );
};

export default SignInModal;
