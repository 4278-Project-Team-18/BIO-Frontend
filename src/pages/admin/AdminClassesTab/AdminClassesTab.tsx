import { createTestClass, createTestStudent } from "../../../data/testData";
import { AdminTabs, type Class } from "../../../interfaces/User.interface";
import { useNavigationContext } from "../../../context/Navigation.context";
import Accordion from "../../../components/Accordion/Accordion";
import StudentLineItem from "../../../components/StudentLineItem/StudentLineItem";
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
    classItem.students = Array.from({ length: 10 }, () => createTestStudent());
  });

  return (
    <div>
      {classTestData.map((classItem, index) => (
        <Accordion key={index} title={classItem.name}>
          {classItem.students?.map((student, index) => (
            <StudentLineItem key={index} student={student} />
          ))}
        </Accordion>
      ))}
    </div>
  );
};

export default AdminClassesTab;
