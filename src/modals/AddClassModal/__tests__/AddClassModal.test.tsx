import AddClassModal from "../AddClassModal";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import type { Teacher } from "../../../interfaces/User.interface";

// Mocking the useCustomFetch module
jest.mock("../../../api/request.util", () => ({
  useCustomFetch: () => ({
    data: [
      {
        _id: "12345",
        firstName: "John",
        lastName: "Doe",
        email: "testemail@test.com",
        role: "teacher",
      } as Teacher,
    ] as Teacher[],
    loading: false,
    error: null,
    makeRequest: jest.fn(),
  }),
  RequestMethods: {
    POST: "POST",
    GET: "GET",
  },
}));

describe("AddClassModal Tests", () => {
  test("AddClassModal should render correctly", () => {
    const mockProps = {
      closeModal: jest.fn(),
    };

    const component = render(<AddClassModal {...mockProps} />);
    expect(component).toBeTruthy();

    // expect(component.getByText("Add class")).toBeTruthy();
    expect(component.getByText("Class Name")).toBeTruthy();

    // Check if the buttons are rendered
    expect(component.getAllByText("Add Class")).toBeTruthy();

    // check for teacher in the select
    expect(component.getByText("John Doe")).toBeTruthy();

    // click on the add class button
    act(() => {
      component.getAllByText("Add Class")[0].click();
    });
    expect(mockProps.closeModal).toHaveBeenCalled();

    // click on the close button
    act(() => {
      component.getByLabelText("close-button").click();
    });
    expect(mockProps.closeModal).toHaveBeenCalled();
  });

  test("AddClassModal snapshot should render correctly", () => {
    const mockProps = {
      closeModal: jest.fn(),
    };

    const component = render(<AddClassModal {...mockProps} />);
    expect(component).toMatchSnapshot();
  });
});
