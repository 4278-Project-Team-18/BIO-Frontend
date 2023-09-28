import style from "./AdminClassesTab.module.css";
import ClassStudentList from "../../../components/ClassStudentList/ClassStudentList";
import { AdminTabs, type Class } from "../../../interfaces/User.interface";
import { useNavigationContext } from "../../../context/Navigation.context";
import { useCustomFetch } from "../../../api/request.util";
import { useClassesContext } from "../../../context/Classes.context";
import { useEffect } from "react";

const AdminClassesTab = () => {
  const { setCurrentTab } = useNavigationContext();
  const { currentClasses, setCurrentClasses } = useClassesContext();

  const { data, loading, error } = useCustomFetch<Class[]>(`class/allClasses`);

  // set the current tab on render
  useEffect(() => {
    setCurrentTab(AdminTabs.CLASSES);
  }, []);

  useEffect(() => {
    setCurrentClasses(data || []);
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div>
      <div className={style["admin-classes-title"]}>{`All Classes (${
        currentClasses?.length || 0
      })`}</div>
      {currentClasses?.map((classItem) => (
        <ClassStudentList classObject={classItem} key={classItem._id} />
      ))}
    </div>
  );
};

export default AdminClassesTab;
