import FormInput from "../FormInput";
import { render, renderHook } from "@testing-library/react";
import { useForm } from "react-hook-form";

describe("FormInput Tests", () => {
  test("FormInput should render correctly", () => {
    // Create a mock control
    const { result } = renderHook(() => useForm());
    const control = result.current.control;

    // Create mock props
    const mockProps = {
      name: "test",
      type: "text",
      label: "Test Label",
      placeholder: "Test Placeholder",
      defaultValue: "Test Value",
      optText: "Test OptText",
      control: control,
      error: "Test Error",
    };

    const component = render(<FormInput {...mockProps} />);

    // Check if the component is rendered
    expect(component).toBeTruthy();

    // Check if the label is correct
    expect(component.getByText(mockProps.label)).toBeTruthy();

    // Check if the placeholder is correct
    expect(component.getByPlaceholderText(mockProps.placeholder)).toBeTruthy();

    // Check if the value is correct
    expect(component.getByDisplayValue(mockProps.defaultValue)).toBeTruthy();
  });

  test("FormInput snapshot should render correctly", () => {
    // Create a mock control
    const { result } = renderHook(() => useForm());
    const control = result.current.control;

    // Create mock props
    const mockProps = {
      name: "test",
      type: "text",
      label: "Test Label",
      placeholder: "Test Placeholder",
      defaultValue: "Test Value",
      optText: "Test OptText",
      control: control,
      error: "Test Error",
    };

    const component = render(<FormInput {...mockProps} />);

    expect(component).toMatchSnapshot();
  });
});
