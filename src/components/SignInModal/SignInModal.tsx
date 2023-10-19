import { SignInInputName } from "./SignInModal.definitions";
import styles from "./SignInModal.module.css";
import { signInSchema } from "../../resolvers/auth.resolver";
import FormInput from "../FormInput/FormInput";
import LoadingButton from "../LoadingButton/LoadingButton";
import { LoadingButtonVariant } from "../LoadingButton/LoadingButton.definitions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import type { SignInInput } from "./SignInModal.definitions";
import type { Resolver } from "react-hook-form";

const SignInModal = () => {
  // hooks from context, clerk, and react-router-dom
  const { isLoaded, signIn, setActive } = useSignIn();
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
        navigate("/admin/dashboard");
      }
    } catch (err) {
      await setActive({ session: null });
      navigate("/sign-in");
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
