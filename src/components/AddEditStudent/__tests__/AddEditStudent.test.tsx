import AddEditStudent from "../AddEditStudent";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";

const mockProps = {
  closeModal: jest.fn(),
  classId: "12345",
};

// mock clerk use auth and getToken to return null
jest.mock("@clerk/clerk-react", () => ({
  useAuth: () => ({ getToken: () => "" }),
}));

describe("AddStudent Tests", () => {
  test("AddStudent should render correctly", () => {
    const component = render(<AddEditStudent {...mockProps} />);

    expect(component).toBeTruthy();
    expect(component.getByText("Add Student")).toBeTruthy();

    act(() => {
      component.getByLabelText("close-button").click();
    });
    expect(mockProps.closeModal).toHaveBeenCalled();
  });

  test("AddStudent snapshot should render correctly", () => {
    const component = render(<AddEditStudent {...mockProps} />);
    expect(component).toMatchSnapshot();
  });
});
