import styles from "./AdminTeachersTab.module.css";
import { useNavigationContext } from "../../../context/Navigation.context";
import { AdminTabs, ApprovalStatus } from "../../../interfaces/User.interface";
import { useCustomFetch } from "../../../api/request.util";
import FullPageLoadingIndicator from "../../../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import FullPageErrorDisplay from "../../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import { useTeachersContext } from "../../../context/Teachers.context";
import TeacherApprovalLineItem from "../../../components/TeacherApprovalLineItem/TeacherApprovalLineItem";
import Accordion from "../../../components/Accordion/Accordion";
import TeacherLineItem from "../../../components/TeacherLineItem/TeacherLineItem";
import { useEffect } from "react";
import type { Teacher } from "../../../interfaces/User.interface";

const AdminTeachersTab = () => {
  const { setCurrentTab } = useNavigationContext();
  const { currentTeachers, setCurrentTeachers } = useTeachersContext();

  const { data, loading, error, makeRequest } =
    useCustomFetch<Teacher[]>(`teacher/allTeachers`);

  // set the current tab on render
  useEffect(() => {
    setCurrentTab(AdminTabs.TEACHERS);
  }, []);

  useEffect(() => {
    setCurrentTeachers(data || []);
  }, [data]);

  if (loading) {
    return <FullPageLoadingIndicator />;
  }

  if (error) {
    return (
      <FullPageErrorDisplay
        errorText="Uh oh! Something went wrong."
        refetch={makeRequest}
      />
    );
  }

  const teachers = currentTeachers?.filter(
    (teacher) => teacher.approvalStatus === ApprovalStatus.APPROVED,
  );

  const applicants = currentTeachers?.filter(
    (teacher) => teacher.approvalStatus === ApprovalStatus.PENDING,
  );

  console.log(applicants);
  return (
    <div>
      <div className={styles["admin-teachers-header"]}>
        <div className={styles["admin-teachers-title"]}>{"All Teachers"}</div>
      </div>
      <Accordion title="Teachers" noDataTitle="No current teachers!">
        {teachers?.map((teacher, index) => (
          <TeacherLineItem key={index} teacher={teacher} />
        ))}
      </Accordion>
      <Accordion
        title="Teacher Applicants"
        noDataTitle="No teacher applicants!"
      >
        {applicants?.map((teacher, index) => (
          <TeacherApprovalLineItem key={index} teacher={teacher} />
        ))}
      </Accordion>
    </div>
  );
};

export default AdminTeachersTab;
