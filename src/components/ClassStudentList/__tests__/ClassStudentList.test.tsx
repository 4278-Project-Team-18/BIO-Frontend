import { faker } from "@faker-js/faker";
import { createTestClass, createTestStudent } from "../../../data/testData";
import ClassStudentList from "../ClassStudentList";
import { render } from "@testing-library/react";

describe("ClassStudentList Tests", () => {
  test("ClassStudentList should render correctly for list less than 5", () => {
    // Create a mock class
    const testClass = createTestClass();
    testClass.students = [createTestStudent(), createTestStudent()];

    // Create mock props
    const mockProps = {
      classObject: testClass,
    };
    const component = render(<ClassStudentList {...mockProps} />);

    // Check if the component is rendered
    expect(component).toBeTruthy();

    // Check if the students are rendered
    expect(
      component.getByText(
        testClass.students[0].firstName +
          " " +
          testClass.students[0].lastInitial,
      ),
    ).toBeTruthy();
    expect(
      component.getByText(
        testClass.students[1].firstName +
          " " +
          testClass.students[1].lastInitial,
      ),
    ).toBeTruthy();

    // Show more button should not be rendered
    expect(component.queryByText("Show More")).toBeFalsy();

    // Check if the add button is rendered
    expect(component.getByText("Add student")).toBeTruthy();
  });

  test("ClassStudentList should render correctly for list more than 5", () => {
    // Create a mock class
    const testClass = createTestClass();
    testClass.students = [
      createTestStudent(),
      createTestStudent(),
      createTestStudent(),
      createTestStudent(),
      createTestStudent(),
      createTestStudent(),
      createTestStudent(),
    ];

    // Create mock props
    const mockProps = {
      classObject: testClass,
    };
    const component = render(<ClassStudentList {...mockProps} />);

    // Check if the component is rendered
    expect(component).toBeTruthy();

    // Check if the students are rendered
    expect(
      component.getByText(
        testClass.students[0].firstName +
          " " +
          testClass.students[0].lastInitial,
      ),
    ).toBeTruthy();
    expect(
      component.getByText(
        testClass.students[1].firstName +
          " " +
          testClass.students[1].lastInitial,
      ),
    ).toBeTruthy();
    expect(
      component.getByText(
        testClass.students[2].firstName +
          " " +
          testClass.students[2].lastInitial,
      ),
    ).toBeTruthy();
    expect(
      component.getByText(
        testClass.students[3].firstName +
          " " +
          testClass.students[3].lastInitial,
      ),
    ).toBeTruthy();
    expect(
      component.getByText(
        testClass.students[4].firstName +
          " " +
          testClass.students[4].lastInitial,
      ),
    ).toBeTruthy();

    // Show more button should be rendered
    expect(component.getByText("Show More")).toBeTruthy();

    // Check if the add button is rendered
    expect(component.getByText("Add student")).toBeTruthy();

    // Click the show more button
    component.getByText("Show More").click();

    // Check if the next student (6) are rendered
    expect(
      component.getByText(
        testClass.students[5].firstName +
          " " +
          testClass.students[5].lastInitial,
      ),
    ).toBeTruthy();

    // Check if the next student (7) are rendered
    expect(
      component.getByText(
        testClass.students[6].firstName +
          " " +
          testClass.students[6].lastInitial,
      ),
    ).toBeTruthy();
  });

  test("ClassStudentList snapshot should render correctly for list less than 5", () => {
    faker.seed(3);
    // Create a mock class
    const testClass = createTestClass();
    testClass.students = [createTestStudent(), createTestStudent()];

    // Create mock props
    const mockProps = {
      classObject: testClass,
    };
    const component = render(<ClassStudentList {...mockProps} />);

    expect(component).toMatchSnapshot();
  });

  test("ClassStudentList snapshot should render correctly for list more than 5", () => {
    faker.seed(3);

    // Create a mock class
    const testClass = createTestClass();
    testClass.students = [
      createTestStudent(),
      createTestStudent(),
      createTestStudent(),
      createTestStudent(),
      createTestStudent(),
      createTestStudent(),
    ];

    // Create mock props
    const mockProps = {
      classObject: testClass,
    };
    const component = render(<ClassStudentList {...mockProps} />);

    expect(component).toMatchSnapshot();
  });
});
