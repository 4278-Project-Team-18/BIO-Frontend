import { SendInviteInputName } from "./SendInviteForm.definitions";
import styles from "./SendInviteForm.module.css";
import { sendInviteSchema } from "../../resolvers/invite.resolver";
import FormInput from "../FormInput/FormInput";
import FormSelect from "../FormSelect/FormSelect";
import { Role } from "../../interfaces/User.interface";
import LoadingButton from "../LoadingButton/LoadingButton";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { useInvitesContext } from "../../context/Invites.context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import type { Invite } from "../../interfaces/Invites.interface";
import type { Resolver } from "react-hook-form";
import type { SendInviteInput } from "./SendInviteForm.definitions";

const sendInviteForm = () => {
  const { addInvite } = useInvitesContext();

  // form controller
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<SendInviteInput>({
    defaultValues: {
      [SendInviteInputName.EMAIL]: "",
      [SendInviteInputName.INVITEEROLE]: Role.ADMIN,
    },
    resolver: yupResolver(sendInviteSchema) as Resolver<SendInviteInput>,
    mode: "onSubmit",
  });

  // send the request to add the class
  const {
    data: inviteData,
    loading: inviteLoading,
    error: inviteError,
    makeRequest: makeInviteRequest,
  } = useCustomFetch<Invite>(`/invite/sendInvite`, RequestMethods.POST);

  useEffect(() => {
    if (inviteData && !inviteError) {
      // add the invite to the context
      addInvite(inviteData);
    }

    // reset the form values in the form controller for success or error
    reset(
      {
        [SendInviteInputName.EMAIL]: "",
        [SendInviteInputName.INVITEEROLE]: Role.ADMIN,
      },
      { keepErrors: true },
    );
  }, [inviteData]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitSendInvite = async (inputData: SendInviteInput, e: any) => {
    await makeInviteRequest(inputData);

    // reset the form inputs
    e.target[0].value = "";
    e.target[1].value = Role.ADMIN;
  };

  const formOptions = [
    { value: Role.ADMIN, label: "Admin" },
    { value: Role.TEACHER, label: "Teacher" },
    { value: Role.VOLUNTEER, label: "Volunteer" },
  ];

  return (
    <form
      className={styles["send-invite-container"]}
      onSubmit={handleSubmit(onSubmitSendInvite)}
    >
      <FormInput
        control={control}
        type="text"
        name={SendInviteInputName.EMAIL}
        label="Email"
        error={errors[SendInviteInputName.EMAIL]?.message}
        placeholder="Email"
      />
      <FormSelect
        control={control}
        name={SendInviteInputName.INVITEEROLE}
        label="Teacher"
        error={errors[SendInviteInputName.INVITEEROLE]?.message}
        options={formOptions}
        defaultValue={formOptions[0].value}
        setValue={setValue}
      />
      <LoadingButton
        type="submit"
        text="Send Invite"
        isLoading={inviteLoading}
        icon={faPaperPlane}
        isResponsive={false}
      />
    </form>
  );
};

export default sendInviteForm;
