import { createTestTeacher } from "../../../data/testData";
import TeacherLineItem from "../TeacherLineItem";
import { render } from "@testing-library/react";

describe("TeacherLineItem", () => {
  test("TeacherLineItem should render correctly", () => {
    const mockProps = {
      teacher: {
        ...createTestTeacher(),
      },
    };

    const component = render(<TeacherLineItem {...mockProps} />);
    expect(component).toBeTruthy();

    // Check if data is correct
    const teacherName = component.getByText(
      `${mockProps.teacher.firstName} ${mockProps.teacher.lastName}`,
    );
    expect(teacherName).toBeTruthy();
  });
});
