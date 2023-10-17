import { SignUpCodeName, SignUpInputName } from "./SignUpModal.definitions";
import styles from "./SignUpModal.module.css";
import { signUpCodeSchema, signUpSchema } from "../../resolvers/auth.resolver";
import FormInput from "../FormInput/FormInput";
import LoadingButton from "../LoadingButton/LoadingButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignUp } from "@clerk/clerk-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SignUpCodeInput, SignUpInput } from "./SignUpModal.definitions";
import type { Resolver } from "react-hook-form";

const SignUpModal = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigate = useNavigate();
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);

  // form controller
  const {
    control: signUpControl,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
    // setError,
  } = useForm<SignUpInput>({
    defaultValues: {
      [SignUpInputName.FIRST_NAME]: "",
      [SignUpInputName.LAST_NAME]: "",
      [SignUpInputName.EMAIL]: "",
      [SignUpInputName.PASSWORD]: "",
      [SignUpInputName.CONFIRM_PASSWORD]: "",
    },
    resolver: yupResolver(signUpSchema) as Resolver<SignUpInput>,
    mode: "onSubmit",
  });

  // form controller
  const {
    formState: { errors: signUpCodeErrors },
    handleSubmit: handleCodeSubmit,
    control: signUpCodeControl,
    // setError,
  } = useForm<SignUpCodeInput>({
    defaultValues: {
      [SignUpCodeName.CODE]: "",
    },
    resolver: yupResolver(signUpCodeSchema) as Resolver<SignUpCodeInput>,
    mode: "onSubmit",
  });

  const onSubmitNewClass = async (inputData: SignUpInput) => {
    console.log(inputData);

    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: inputData.email,
        password: inputData.password,
        firstName: inputData.firstName,
        lastName: inputData.lastName,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onSubmitCode = async (inputData: SignUpCodeInput) => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: inputData.code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className={styles["sign-up-container"]}>
      {!pendingVerification ? (
        <form
          onSubmit={handleSignUpSubmit(onSubmitNewClass)}
          className={styles["sign-up-inner-container"]}
        >
          <p className={styles["sign-up-header-text"]}>
            Sign up for{" "}
            <span className={styles["sign-up-header-bold"]}>Book I Own</span>
          </p>
          <div className={styles["name-container"]}>
            <FormInput
              control={signUpControl}
              type="text"
              name={SignUpInputName.FIRST_NAME}
              label="First name"
              error={signUpErrors[SignUpInputName.FIRST_NAME]?.message}
              placeholder="First name"
            />
            <FormInput
              control={signUpControl}
              type="text"
              name={SignUpInputName.LAST_NAME}
              label="Last name"
              error={signUpErrors[SignUpInputName.LAST_NAME]?.message}
              placeholder="Last name"
            />
          </div>
          <FormInput
            control={signUpControl}
            type="text"
            name={SignUpInputName.EMAIL}
            label="Email"
            error={signUpErrors[SignUpInputName.EMAIL]?.message}
            placeholder="Email"
          />
          <FormInput
            control={signUpControl}
            type="password"
            name={SignUpInputName.PASSWORD}
            label="Password"
            error={signUpErrors[SignUpInputName.PASSWORD]?.message}
            placeholder="Password"
          />
          <FormInput
            control={signUpControl}
            type="password"
            name={SignUpInputName.CONFIRM_PASSWORD}
            label="Confirm Password"
            error={signUpErrors[SignUpInputName.CONFIRM_PASSWORD]?.message}
            placeholder="Confirm Password"
          />
          <div className={styles["sign-up-button-container"]}>
            <div className={styles["sign-up-link-container"]}>
              <p className={styles["sign-up-link-text"]}>
                Have an account?&nbsp;&nbsp;
              </p>
              <Link to={"/sign-in"} className={styles["link-to-sign-in"]}>
                Sign In
              </Link>
            </div>
            <LoadingButton
              text="Continue"
              type="submit"
              isLoading={false}
              isLoadingText="Loading..."
              isResponsive={false}
            />
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleCodeSubmit(onSubmitCode)}
          className={styles["sign-up-inner-container"]}
        >
          <p className={styles["sign-up-header-text"]}>
            Enter the code sent to&nbsp;
            <span className={styles["sign-up-header-bold"]}>
              {signUp?.emailAddress}
            </span>
          </p>
          <FormInput
            control={signUpCodeControl}
            type="password"
            name={SignUpCodeName.CODE}
            label="Email code"
            error={signUpCodeErrors[SignUpCodeName.CODE]?.message}
            placeholder="Enter code..."
          />
          <div className={styles["sign-up-button-container"]}>
            <LoadingButton
              text="Sign Up"
              type="submit"
              isLoading={false}
              isLoadingText="Signing Up..."
              isResponsive={false}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default SignUpModal;
