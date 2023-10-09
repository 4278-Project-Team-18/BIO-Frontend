import FormSelect from "../FormSelect";
import { render, renderHook } from "@testing-library/react";
import { useForm } from "react-hook-form";
import type { NewClassInputName } from "../../../modals/AddClassModal/AddClassModal.definitions";

describe("FormSelect Tests", () => {
  test("FormSelect should render correctly", () => {
    // Create a mock control
    const { result } = renderHook(() => useForm());
    const control = result.current.control;

    // Create mock props
    const mockProps = {
      name: "name" as NewClassInputName,
      label: "Test Label",
      options: [
        {
          value: "test1",
          label: "test1",
        },
        {
          value: "test2",
          label: "test2",
        },
      ],
      control: control,
      error: "Test Error",
      setValue: jest.fn(),
    };

    const component = render(<FormSelect {...mockProps} />);

    // Check if the component is rendered
    expect(component).toBeTruthy();

    // Check if the label is correct
    expect(component.getByText(mockProps.label)).toBeTruthy();

    // Check if the options are correct
    expect(component.getByText(mockProps.options[0].label)).toBeTruthy();
    expect(component.getByText(mockProps.options[1].label)).toBeTruthy();
  });

  test("FormSelect snapshot should render correctly", () => {
    // Create a mock control
    const { result } = renderHook(() => useForm());
    const control = result.current.control;

    // Create mock props
    const mockProps = {
      name: "name" as NewClassInputName,
      label: "Test Label",
      options: [
        {
          value: "test1",
          label: "test1",
        },
        {
          value: "test2",
          label: "test2",
        },
      ],
      control: control,
      error: "Test Error",
      setValue: jest.fn(),
    };

    const component = render(<FormSelect {...mockProps} />);

    expect(component).toMatchSnapshot();
  });
});
