import style from "./AdminClassesTab.module.css";
import ClassStudentList from "../../../components/ClassStudentList/ClassStudentList";
import { AdminTabs, type Class } from "../../../interfaces/User.interface";
import { useNavigationContext } from "../../../context/Navigation.context";
import { useCustomFetch } from "../../../api/request.util";
import { useClassesContext } from "../../../context/Classes.context";
import AddClassModal from "../../../modals/AddClassModal/AddClassModal";
import { useEffect, useState } from "react";

const AdminClassesTab = () => {
  const { setCurrentTab } = useNavigationContext();
  const { currentClasses, setCurrentClasses } = useClassesContext();

  const {
    data: classData,
    loading: classLoading,
    error: classError,
  } = useCustomFetch<Class[]>(`class/allClasses`);

  const [classModalOpen, setClassModalOpen] = useState<boolean>(true);

  const handleCloseModal = () => {
    setClassModalOpen(false);
  };

  // const handleOpenModal = () => {
  //   setClassModalOpen(true);
  // };

  // set the current tab on render
  useEffect(() => {
    setCurrentTab(AdminTabs.CLASSES);
  }, []);

  useEffect(() => {
    setCurrentClasses(classData || []);
  }, [classData]);

  if (classLoading) {
    return <div>Loading...</div>;
  }

  if (classError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div>
      <div>
        <div className={style["admin-classes-title"]}>{`All Classes (${
          currentClasses?.length || 0
        })`}</div>
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
