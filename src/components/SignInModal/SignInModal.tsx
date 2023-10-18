import { SignInInputName } from "./SignInModal.definitions";
import styles from "./SignInModal.module.css";
import { signInSchema } from "../../resolvers/auth.resolver";
import FormInput from "../FormInput/FormInput";
import LoadingButton from "../LoadingButton/LoadingButton";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { useUserContext } from "../../context/User.context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignIn, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { SignInInput } from "./SignInModal.definitions";
import type { UserType } from "../../interfaces/User.interface";
import type { Resolver } from "react-hook-form";

const SignInModal = () => {
  // hooks from context, clerk, and react-router-dom
  const { setCurrentUser } = useUserContext();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { user } = useUser();
  const navigate = useNavigate();

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

  // request to get the user
  const {
    data: userData,
    error: userError,
    makeRequest: makeUserRequest,
  } = useCustomFetch<UserType>(`/accounts`, RequestMethods.GET_WAIT);

  // After the user is loaded, set the current user and navigate to the dashboard
  useEffect(() => {
    // Handle error
    if (userError && isLoaded) {
      console.log(userError);
      setActive({ session: null });
    }

    // Set the current user and navigate to the dashboard
    if (userData && !userError) {
      setCurrentUser(userData);
      navigate("/admin/dashboard");
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
        console.log(JSON.stringify(completeSignIn));
        setActive({ session: completeSignIn.createdSessionId });
        await makeUserRequest(
          undefined,
          `?role=${user?.unsafeMetadata?.role}&accountEmail=${inputData.email}`,
        );
      } else {
        console.log(completeSignIn);
      }
    } catch (err) {
      setActive({ session: null });
      console.log(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className={styles["sign-in-container"]}>
      <form
        onSubmit={handleSignInSubmit(onSubmitSignIn)}
        className={styles["sign-in-inner-container"]}
      >
        <p className={styles["sign-in-header-text"]}>
          Welcome back! Sign in to&nbsp;
          <span className={styles["sign-in-header-bold"]}>Book I Own</span>
        </p>

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
          />
        </div>
      </form>
    </div>
  );
};

export default SignInModal;
