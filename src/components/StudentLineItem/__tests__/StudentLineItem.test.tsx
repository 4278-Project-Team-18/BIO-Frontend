import StudentLineItem from "../StudentLineItem";
import { createTestStudent } from "../../../data/testData";
import { render } from "@testing-library/react";
import { faker } from "@faker-js/faker";

describe("StudentLineItem Tests", () => {
  test("StudentLineItem should render correctly", () => {
    const testStudent = createTestStudent();

    const component = render(<StudentLineItem student={testStudent} />);

    // Check if the component is rendered
    expect(component).toBeTruthy();

    // Check if the label is correct
    expect(
      component.getByText(
        `${testStudent.firstName} ${testStudent.lastInitial}`,
      ),
    ).toBeTruthy();

    // Check if the upload button is correct
    if (
      !testStudent.volunteerResponseLetterLink ||
      testStudent.volunteerResponseLetterLink === ""
    ) {
      expect(component.getByText("Upload Letter")).toBeTruthy();
    } else {
      expect(component.getByText("Reupload")).toBeTruthy();
    }
  });

  test("StudentLineItem snapshot should render correctly", () => {
    faker.seed(1);
    const testStudent = createTestStudent();

    const component = render(<StudentLineItem student={testStudent} />);

    expect(component).toMatchSnapshot();
  });
});
