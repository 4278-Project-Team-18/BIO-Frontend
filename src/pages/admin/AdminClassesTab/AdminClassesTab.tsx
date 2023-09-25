import ClassStudentList from "../../../components/ClassStudentList/ClassStudentList";
import { createTestClass, createTestStudent } from "../../../data/testData";
import { AdminTabs, type Class } from "../../../interfaces/user.interface";
import { useNavigationContext } from "../../../context/Navigation.context";
import { useEffect } from "react";

const AdminClassesTab = () => {
  const { setCurrentTab } = useNavigationContext();

  // set the current tab on render
  useEffect(() => {
    setCurrentTab(AdminTabs.CLASSES);
  }, []);

  const classTestData = Array.from({ length: 3 }, () =>
    createTestClass(),
  ) as Class[];

  classTestData.forEach((classItem) => {
    classItem.students = Array.from({ length: 20 }, () => createTestStudent());
  });

  return (
    <div>
      {classTestData.map((classItem, index) => (
        <ClassStudentList classObject={classItem} key={index} />
      ))}
    </div>
  );
};

export default AdminClassesTab;
