import { useNavigationContext } from "../../../context/Navigation.context";
import { AdminTabs, ApprovalStatus } from "../../../interfaces/User.interface";
import { useCustomFetch } from "../../../api/request.util";
import FullPageLoadingIndicator from "../../../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import FullPageErrorDisplay from "../../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import { useTeachersContext } from "../../../context/Teachers.context";
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

  const applicants = currentTeachers?.filter(
    (teacher) => teacher.approvalStatus === ApprovalStatus.PENDING,
  );

  console.log(applicants);
  return (
    <div>
      <h1>Admin Teachers</h1>
    </div>
  );
};

export default AdminTeachersTab;
