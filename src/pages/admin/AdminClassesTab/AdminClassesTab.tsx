import ClassStudentList from "../../../components/ClassStudentList/ClassStudentList";
import { createTestClass, createTestStudent } from "../../../data/testData";
import type { Class } from "../../../interfaces/user.interface";

const AdminClassesTab = () => {
  console.log("Admin Dashboard");

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
