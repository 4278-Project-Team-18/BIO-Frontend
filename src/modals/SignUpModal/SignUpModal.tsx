import { SignUpCodeName, SignUpInputName } from "./SignUpModal.definitions";
import styles from "./SignUpModal.module.css";
import { signUpCodeSchema, signUpSchema } from "../../resolvers/auth.resolver";
import FormInput from "../../components/FormInput/FormInput";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { type Invite } from "../../interfaces/Invites.interface";
import { useUserContext } from "../../context/User.context";
import { LoadingButtonVariant } from "../../components/LoadingButton/LoadingButton.definitions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth, useSignUp } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import type { Admin, Role, UserType } from "../../interfaces/User.interface";
import type { SignUpCodeInput, SignUpInput } from "./SignUpModal.definitions";
import type { Resolver } from "react-hook-form";

const SignUpModal = () => {
  // hooks from context, clerk, and react-router-dom
  const { setCurrentUser } = useUserContext();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  // get the invite id from the url
  const { inviteId } = useParams();

  // state for the pending verification of the email address
  const [pendingVerification, setPendingVerification] = useState(false);

  // form controller for the new user
  const {
    control: signUpControl,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
    setError: setSignUpError,
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

  // form controller for the email code
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

  // request to get the invite
  const {
    data: inviteData,
    loading: isLoadingInvite,
    error: errorInvite,
  } = useCustomFetch<Invite>(`/unp-invite/${inviteId}`);

  // request to open the invite
  const { makeRequest: makeInviteOpenedRequest } = useCustomFetch<Invite>(
    `/unp-invite/opened/`,
    RequestMethods.PATCH,
  );

  // request to create the user
  const {
    data: userData,
    error: errorUser,
    makeRequest: makeUserRequest,
  } = useCustomFetch<UserType>(`/accounts`, RequestMethods.POST);

  // When the user data is loaded, set the current user and navigate to the dashboard
  useEffect(() => {
    // check if the user in the backend was created successfully
    if (userData && !errorUser) {
      // set the current user in the context
      setCurrentUser({
        _id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        approvalStatus: userData.approvalStatus,
        role: inviteData?.role as Role,
      });

      // navigate to the dashboard
      // TODO: Change this to reflect the user's role
      navigate("/admin/dashboard");
    } else if (errorUser) {
      // TODO: Handle the error
      console.error(JSON.stringify(errorUser, null, 2));
    }
  }, [userData]);

  // when the invite data is load, send a patch to set it to opened
  useEffect(() => {
    if (inviteData) {
      // send the request to set the invite to opened
      const setInviteOpened = async () => {
        await makeInviteOpenedRequest(undefined, inviteData._id || "");
      };

      // set the invite to opened
      setInviteOpened();
    }
  }, [inviteData]);

  /**
   * Handle the submission of the new user data and send the email code.
   *
   * @param {SignUpInput} inputData - the input data from the form
   */
  const onSubmitSignUp = async (inputData: SignUpInput) => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));

      // if the error is that the email is already in use, show the error
      if (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        err.errors.some((error: any) => error.code === "form_identifier_exists")
      ) {
        setSignUpError(SignUpInputName.EMAIL, {
          type: "manual",
          message: "That email address is taken. Please try another.",
        });
      }

      // if the error is that there is already a session, stop the session and retry
      if (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        err.errors.some((error: any) => error.code === "session_exists")
      ) {
        console.log("session already exists");
        await signOut();
        await onSubmitSignUp(inputData);
      }
    }
  };

  /**
   * Handle the submission of the email code and complete the sign up process.
   *
   * @param {SignUpCodeInput} inputData - the input data from the form
   */
  const onSubmitCode = async (inputData: SignUpCodeInput) => {
    if (!isLoaded) {
      return;
    }

    // complete the sign up process with the code from the email
    const completeSignUp = await signUp.attemptEmailAddressVerification({
      code: inputData.code,
    });

    // check if the code was not verified
    if (completeSignUp.status !== "complete") {
      throw new Error("Unable to verify email address.");
    }

    // check if the sign up process was completed successfully
    if (completeSignUp.status === "complete") {
      // set the user as active in clerk
      await setActive({ session: completeSignUp.createdSessionId });

      // call the backend to create the user
      await makeUserRequest({
        firstName: signUp.firstName,
        lastName: signUp.lastName,
        email: signUp.emailAddress,
        role: inviteData?.role || "",
        inviteId: inviteData?._id || "",
      });
    }
  };

  // if the invite request is loading, show a loading message
  if (isLoadingInvite) {
    return (
      <div className={styles["sign-up-fixed-container"]}>
        <MoonLoader color="#209bb6" />
      </div>
    );
  }

  // if the request for the invite failed, show an error message
  if (errorInvite || !inviteData) {
    return (
      <div className={styles["sign-up-fixed-container"]}>
        <p>You have not been invited!</p>
      </div>
    );
  }

  return (
    <div className={styles["sign-up-container"]}>
      {!pendingVerification ? (
        <form
          onSubmit={handleSignUpSubmit(onSubmitSignUp)}
          className={styles["sign-up-inner-container"]}
        >
          <div className={styles["sign-up-header-title"]}>
            Create your account.
          </div>
          <div className={styles["sign-up-header-text"]}>
            {inviteData?.sender
              ? (inviteData?.sender as Admin).firstName +
                " " +
                (inviteData?.sender as Admin).lastName +
                " has invited you to join "
              : "You have been invited to "}
          </div>
          <div className={styles["sign-up-header-second-line"]}>
            {"Book I Own as a"}
            <span className={styles["sign-up-header-bold"]}>
              {` ${inviteData?.role}`}
            </span>
            {"."}
          </div>
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
            <LoadingButton
              text="Continue"
              type="submit"
              isLoading={false}
              isLoadingText="Loading..."
              isResponsive={false}
              variant={LoadingButtonVariant.BLACK}
              styles={{ width: "100%" }}
            />
          </div>
          <div className={styles["sign-up-link-container"]}>
            <p className={styles["sign-up-link-text"]}>
              Have an account?&nbsp;&nbsp;
            </p>
            <Link to={"/sign-in"} className={styles["link-to-sign-in"]}>
              Sign In
            </Link>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleCodeSubmit(onSubmitCode)}
          className={styles["sign-up-inner-container"]}
        >
          <div className={styles["sign-up-header-title"]}>
            {"Let's make sure it's you."}
          </div>
          <div className={styles["sign-up-header-confirm-text"]}>
            Enter the code sent to&nbsp;
            <span className={styles["sign-up-header-bold"]}>
              {signUp?.emailAddress}
            </span>
          </div>
          <FormInput
            control={signUpCodeControl}
            type="text"
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
              variant={LoadingButtonVariant.BLACK}
              styles={{ width: "100%" }}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default SignUpModal;
