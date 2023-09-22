import { createTestClass } from "../../../data/testData";
import type { Class } from "../../../interfaces/user.interface";

const AdminClassesTab = () => {
  console.log("Admin Dashboard");

  const classTestData = Array.from({ length: 10 }, () =>
    createTestClass(),
  ) as Class[];
  return (
    <div>
      {classTestData.map((classItem, index) => (
        <div key={index}>
          <h1>{classItem.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default AdminClassesTab;
