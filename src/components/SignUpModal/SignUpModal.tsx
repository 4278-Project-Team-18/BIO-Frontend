import { SignUpCodeName, SignUpInputName } from "./SignUpModal.definitions";
import styles from "./SignUpModal.module.css";
import { signUpCodeSchema, signUpSchema } from "../../resolvers/auth.resolver";
import FormInput from "../FormInput/FormInput";
import LoadingButton from "../LoadingButton/LoadingButton";
import { useCustomFetch } from "../../api/request.util";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignUp } from "@clerk/clerk-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import type { Invite } from "../../interfaces/Invites.interface";
import type { SignUpCodeInput, SignUpInput } from "./SignUpModal.definitions";
import type { Resolver } from "react-hook-form";
import type { Admin } from "../../interfaces/User.interface";

const SignUpModal = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { inviteId } = useParams();
  const navigate = useNavigate();
  const [pendingVerification, setPendingVerification] = useState(false);

  // form controller
  const {
    control: signUpControl,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
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
  } = useForm<SignUpCodeInput>({
    defaultValues: {
      [SignUpCodeName.CODE]: "",
    },
    resolver: yupResolver(signUpCodeSchema) as Resolver<SignUpCodeInput>,
    mode: "onSubmit",
  });

  const {
    data: inviteData,
    loading: isLoadingInvite,
    error: errorInvite,
  } = useCustomFetch<Invite>(`invite/${inviteId}`);

  const onSubmitNewClass = async (inputData: SignUpInput) => {
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
        throw new Error("Unable to verify email address.");
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (isLoadingInvite) {
    return (
      <div className={styles["sign-up-container"]}>
        <MoonLoader color="#209bb6" />
      </div>
    );
  }

  if (errorInvite || !inviteData) {
    return (
      <div className={styles["sign-up-container"]}>
        <p>You have not been invited!</p>
      </div>
    );
  }

  return (
    <div className={styles["sign-up-container"]}>
      {!pendingVerification ? (
        <form
          onSubmit={handleSignUpSubmit(onSubmitNewClass)}
          className={styles["sign-up-inner-container"]}
        >
          <p className={styles["sign-up-header-text"]}>
            {inviteData?.sender
              ? (inviteData?.sender as Admin).firstName +
                " " +
                (inviteData?.sender as Admin).lastName +
                " has invited you to join "
              : "You have been invited to "}
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
              autocomplete="given-name"
            />
            <FormInput
              control={signUpControl}
              type="text"
              name={SignUpInputName.LAST_NAME}
              label="Last name"
              error={signUpErrors[SignUpInputName.LAST_NAME]?.message}
              placeholder="Last name"
              autocomplete="family-name"
            />
          </div>
          <FormInput
            control={signUpControl}
            type="text"
            name={SignUpInputName.EMAIL}
            label="Email"
            error={signUpErrors[SignUpInputName.EMAIL]?.message}
            placeholder="Email"
            autocomplete="email"
          />
          <FormInput
            control={signUpControl}
            type="password"
            name={SignUpInputName.PASSWORD}
            label="Password"
            error={signUpErrors[SignUpInputName.PASSWORD]?.message}
            placeholder="Password"
            autocomplete="new-password"
          />
          <FormInput
            control={signUpControl}
            type="password"
            name={SignUpInputName.CONFIRM_PASSWORD}
            label="Confirm Password"
            error={signUpErrors[SignUpInputName.CONFIRM_PASSWORD]?.message}
            placeholder="Confirm Password"
            autocomplete="new-password"
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
