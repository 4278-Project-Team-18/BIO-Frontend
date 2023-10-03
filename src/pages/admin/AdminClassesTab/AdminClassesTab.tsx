import styles from "./AdminClassesTab.module.css";
import ClassStudentList from "../../../components/ClassStudentList/ClassStudentList";
import { AdminTabs, type Class } from "../../../interfaces/User.interface";
import { useNavigationContext } from "../../../context/Navigation.context";
import { useCustomFetch } from "../../../api/request.util";
import { useClassesContext } from "../../../context/Classes.context";
import AddClassModal from "../../../modals/AddClassModal/AddClassModal";
import FullPageLoadingIndicator from "../../../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import FullPageErrorDisplay from "../../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import { useEffect, useState } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminClassesTab = () => {
  const { setCurrentTab } = useNavigationContext();
  const { currentClasses, setCurrentClasses } = useClassesContext();

  const {
    data: classData,
    loading: classLoading,
    error: classError,
    makeRequest: makeClassRequest,
  } = useCustomFetch<Class[]>(`class/allClasses`);

  const [classModalOpen, setClassModalOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    setClassModalOpen(false);
  };

  const handleOpenModal = () => {
    setClassModalOpen(true);
  };

  // set the current tab on render
  useEffect(() => {
    setCurrentTab(AdminTabs.CLASSES);
  }, []);

  useEffect(() => {
    setCurrentClasses(classData || []);
  }, [classData]);

  if (classLoading) {
    return <FullPageLoadingIndicator />;
  }

  if (classError) {
    return (
      <FullPageErrorDisplay
        errorText="Uh oh! Something went wrong."
        refetch={makeClassRequest}
      />
    );
  }

  return (
    <div>
      <div>
        <div className={styles["admin-classes-header"]}>
          <div className={styles["admin-classes-title"]}>{`All Classes (${
            currentClasses?.length || 0
          })`}</div>
          <button
            className={styles["add-class-button"]}
            onClick={handleOpenModal}
          >
            <div className={styles["add-class-button-label"]}>
              {"Add Class"}
            </div>
            <FontAwesomeIcon
              icon={faPlusCircle}
              className={styles["add-class-submit-button-icon"]}
            />
          </button>
        </div>
        <div>
          {classModalOpen && <AddClassModal closeModal={handleCloseModal} />}
        </div>
      </div>
      {currentClasses?.map((classItem) => (
        <ClassStudentList classObject={classItem} key={classItem._id} />
      ))}
    </div>
  );
};

export default AdminClassesTab;
