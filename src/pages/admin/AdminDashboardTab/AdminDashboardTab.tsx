import styles from "./AdminDashboardTab.module.css";
import { useNavigationContext } from "../../../context/Navigation.context";
import { AdminTabs, ApprovalStatus } from "../../../interfaces/User.interface";
import Accordion from "../../../components/Accordion/Accordion";
import { useCustomFetch } from "../../../api/request.util";
import FullPageLoadingIndicator from "../../../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import FullPageErrorDisplay from "../../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import { useTeachersContext } from "../../../context/Teachers.context";
import ToDoLineItem from "../../../components/ToDoLineItem/ToDoLineItem";
import { useClassesContext } from "../../../context/Classes.context";
import { useInvitesContext } from "../../../context/Invites.context";
import { useVolunteersContext } from "../../../context/Volunteers.context";
import { useEffect } from "react";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import type { Invite } from "../../../interfaces/Invites.interface";
import type {
  Class,
  Student,
  Teacher,
  Volunteer,
} from "../../../interfaces/User.interface";

const AdminDashboardTab = () => {
  const { setCurrentTab } = useNavigationContext();
  const { setCurrentInvites } = useInvitesContext();
  const { currentTeachers, setCurrentTeachers } = useTeachersContext();
  const { currentVolunteers, setCurrentVolunteers } = useVolunteersContext();
  const { currentClasses, setCurrentClasses } = useClassesContext();

  // on page render
  useEffect(() => {
    // set the current tab on render
    setCurrentTab(AdminTabs.DASHBOARD);
  }, []);

  // Teacher Data
  const {
    data: teacherData,
    loading: teacherLoading,
    error: teacherError,
    makeRequest: makeTeacherRequest,
  } = useCustomFetch<Teacher[]>(`/teacher/`);

  useEffect(() => {
    setCurrentTeachers(teacherData || []);
  }, [teacherData]);

  // Volunteer Data
  const {
    data: volunteerData,
    loading: volunteerLoading,
    error: volunteerError,
    makeRequest: makeVolunteerRequest,
  } = useCustomFetch<Volunteer[]>(`/volunteer/`);

  useEffect(() => {
    setCurrentVolunteers(volunteerData || []);
  }, [volunteerData]);

  // Invites Data
  const {
    data: invitesData,
    loading: invitesLoading,
    error: invitesError,
    makeRequest: makeInvitesRequest,
  } = useCustomFetch<Invite[]>(`/invite/`);

  useEffect(() => {
    setCurrentInvites(invitesData);
  }, [invitesData]);

  // Classes Data
  const {
    data: classesData,
    loading: classesLoading,
    error: classesError,
    makeRequest: makeClassesRequest,
  } = useCustomFetch<Class[]>(`/class/`);

  useEffect(() => {
    setCurrentClasses(classesData || []);
  }, [classesData]);

  if (teacherLoading || volunteerLoading || invitesLoading || classesLoading) {
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

  if (volunteerError) {
    return (
      <FullPageErrorDisplay
        errorText="Uh oh! Something went wrong."
        refetch={makeVolunteerRequest}
      />
    );
  }

  if (invitesError) {
    return (
      <FullPageErrorDisplay
        errorText="Uh oh! Something went wrong."
        refetch={makeInvitesRequest}
      />
    );
  }

  if (classesError) {
    return (
      <FullPageErrorDisplay
        errorText="Uh oh! Something went wrong."
        refetch={makeClassesRequest}
      />
    );
  }

  const teacherApplicants = currentTeachers?.filter(
    (teacher) => teacher.approvalStatus === ApprovalStatus.PENDING,
  );

  console.log(currentTeachers);
  console.log(teacherApplicants);

  const volunteerApplicants = currentVolunteers?.filter(
    (volunteer) => volunteer.approvalStatus === ApprovalStatus.PENDING,
  );

  const unmatchedStudents = currentClasses?.map(
    (classItem) =>
      classItem?.students?.filter((student) => !student.matchedVolunteer),
  );

  const unuploadedStudentLetters = currentClasses?.reduce(
    (acc, classItem) =>
      acc.concat(
        classItem?.students?.filter((student) => !student?.studentLetterLink) ||
          [],
      ),
    [] as Student[],
  );

  const unuploadedVolunteerLetters = currentClasses?.reduce(
    (acc, classItem) =>
      acc.concat(
        classItem?.students?.filter(
          (student) => !student?.volunteerResponseLetterLink,
        ) || [],
      ),
    [] as Student[],
  );

  return (
    <div>
      <div className={styles["admin-dashboard-header"]}>
        <div className={styles["admin-dashboard-title"]}>{`Dashboard`}</div>
      </div>
      <Accordion title="Items To-Do" noDataTitle="No Items To-Do!">
        <ToDoLineItem
          toDoItem={
            "There are " +
            teacherApplicants?.length +
            " teacher applicants left to review."
          }
          link={AdminTabs.APPLICANTS}
          icon={teacherApplicants?.length ? faSquare : faSquareCheck}
        />
        <ToDoLineItem
          toDoItem={
            "There are " +
            volunteerApplicants?.length +
            " volunteer applicants left to review."
          }
          link={AdminTabs.APPLICANTS}
          icon={volunteerApplicants?.length ? faSquare : faSquareCheck}
        />
        <ToDoLineItem
          toDoItem={
            "There are " +
            unmatchedStudents?.length +
            " students left to match."
          }
          link={AdminTabs.VOLUNTEERS}
          icon={unmatchedStudents?.length ? faSquare : faSquareCheck}
        />
        <ToDoLineItem
          toDoItem={
            "There are " +
            unuploadedStudentLetters?.length +
            " student letters left to upload."
          }
          link={AdminTabs.CLASSES}
          icon={unuploadedStudentLetters?.length ? faSquare : faSquareCheck}
        />
        <ToDoLineItem
          toDoItem={
            "There are " +
            unuploadedVolunteerLetters?.length +
            " volunteer letters left to upload."
          }
          link={AdminTabs.VOLUNTEERS}
          icon={unuploadedVolunteerLetters?.length ? faSquare : faSquareCheck}
        />
      </Accordion>
    </div>
  );
};

export default AdminDashboardTab;
