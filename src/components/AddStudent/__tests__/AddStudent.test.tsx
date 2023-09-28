import AddStudent from "../AddStudent";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";

const mockProps = {
  closeModal: jest.fn(),
  classId: "12345",
};

describe("AddStudent Tests", () => {
  test("AddStudent should render correctly", () => {
    const component = render(<AddStudent {...mockProps} />);

    expect(component).toBeTruthy();
    expect(component.getByText("Add Student")).toBeTruthy();

    act(() => {
      component.getByLabelText("close-button").click();
    });
    expect(mockProps.closeModal).toHaveBeenCalled();

    //   fireEvent.click(component.getByText("Add Student"));

    // expect(mockProps.closeModal).toHaveBeenCalled();
  });

  test("AddStudent snapshot should render correctly", () => {
    const component = render(<AddStudent {...mockProps} />);
    expect(component).toMatchSnapshot();
  });
});