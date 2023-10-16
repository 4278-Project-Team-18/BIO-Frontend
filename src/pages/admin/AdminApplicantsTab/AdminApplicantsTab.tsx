import styles from "./AdminApplicantsTab.module.css";
import { useCustomFetch } from "../../../api/request.util";
import Accordion from "../../../components/Accordion/Accordion";
import FullPageErrorDisplay from "../../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import FullPageLoadingIndicator from "../../../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import InviteLineItem from "../../../components/InviteLineItem/InviteLineItem";
import VolunteerApprovalLineItem from "../../../components/VolunteerApprovalLineItem/VolunteerApprovalLineItem";
import SendInviteForm from "../../../components/SendInviteForm/SendInviteForm";
import { useInvitesContext } from "../../../context/Invites.context";
import TeacherApprovalLineItem from "../../../components/TeacherApprovalLineItem/TeacherApprovalLineItem";
import { AdminTabs, ApprovalStatus } from "../../../interfaces/User.interface";
import { useTeachersContext } from "../../../context/Teachers.context";
import { useVolunteersContext } from "../../../context/Volunteers.context";
import { useNavigationContext } from "../../../context/Navigation.context";
import { useEffect } from "react";
import type { Volunteer, Teacher } from "../../../interfaces/User.interface";
import type { Invite } from "../../../interfaces/Invites.interface";

const AdminApplicantsTab = () => {
  const { setCurrentTab } = useNavigationContext();
  const { currentInvites, setCurrentInvites } = useInvitesContext();
  const { currentTeachers, setCurrentTeachers } = useTeachersContext();
  const { currentVolunteers, setCurrentVolunteers } = useVolunteersContext();

  // Teacher Data
  const {
    data: teacherData,
    loading: teacherLoading,
    error: teacherError,
    makeRequest: makeTeacherRequest,
  } = useCustomFetch<Teacher[]>(`teacher/allTeachers`);

  // set the current tab on render
  useEffect(() => {
    setCurrentTab(AdminTabs.APPLICANTS);
  }, []);

  useEffect(() => {
    setCurrentTeachers(teacherData || []);
  }, [teacherData]);
  if (teacherLoading) {
    return <FullPageLoadingIndicator />;
  }

  if (teacherError) {
    return (
      <FullPageErrorDisplay
        errorText="Uh oh! Something went wrong."
        refetch={makeTeacherRequest}
      />
    );
  }

  // Volunteer Data
  const {
    data: volunteerData,
    loading: volunteerLoading,
    error: volunteerError,
    makeRequest: makeVolunteerRequest,
  } = useCustomFetch<Volunteer[]>(`volunteer/allVolunteers`);

  useEffect(() => {
    setCurrentVolunteers(volunteerData || []);
  }, [volunteerData]);

  if (volunteerLoading) {
    return <FullPageLoadingIndicator />;
  }

  if (volunteerError) {
    return (
      <FullPageErrorDisplay
        errorText="Uh oh! Something went wrong."
        refetch={makeVolunteerRequest}
      />
    );
  }

  // Invites Data
  const {
    data: invitesData,
    loading: invitesLoading,
    error: invitesError,
    makeRequest: makeInvitesRequest,
  } = useCustomFetch<Invite[]>(`invite/`);

  useEffect(() => {
    setCurrentInvites(invitesData);
  }, [invitesData]);

  if (invitesLoading) {
    return <FullPageLoadingIndicator />;
  }

  if (invitesError) {
    return (
      <FullPageErrorDisplay
        errorText="Uh oh! Something went wrong."
        refetch={makeInvitesRequest}
      />
    );
  }

  const teacherApplicants = currentTeachers?.filter(
    (teacher) => teacher.approvalStatus === ApprovalStatus.PENDING,
  );

  const volunteerApplicants = currentVolunteers?.filter(
    (volunteer) => volunteer.approvalStatus === ApprovalStatus.PENDING,
  );

  return (
    <div>
      <div className={styles["admin-applicants-header"]}>
        <div className={styles["admin-applicants-title"]}>{`Applicants`}</div>
      </div>
      <SendInviteForm />
      <Accordion title="Sent Invites" noDataTitle="No Invites Sent!">
        {currentInvites?.map((invite) => (
          <InviteLineItem key={invite._id} invite={invite} />
        ))}
      </Accordion>
      <Accordion
        title="Volunteer Applicants"
        noDataTitle="No Volunteer Applicants!"
      >
        {volunteerApplicants?.map((volunteer, index) => (
          <VolunteerApprovalLineItem key={index} volunteer={volunteer} />
        ))}
      </Accordion>
      <Accordion
        title="Teacher Applicants"
        noDataTitle="No Teacher Applicants!"
      >
        {teacherApplicants?.map((teacher, index) => (
          <TeacherApprovalLineItem key={index} teacher={teacher} />
        ))}
      </Accordion>
    </div>
  );
};

export default AdminApplicantsTab;
