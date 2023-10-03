import FullPageErrorDisplay from "../FullPageErrorDisplay";
import { render } from "@testing-library/react";

describe("FullPageErrorDisplay", () => {
  test("should render FullPageErrorDisplay correctly", () => {
    const mockProps = {
      errorText: "Uh oh! Something went wrong.",
      refetch: jest.fn(),
      refetchText: "Try again",
    };

    const component = render(<FullPageErrorDisplay {...mockProps} />);
    expect(component).toBeTruthy();

    // check error text
    const errorText = component.getByText(mockProps.errorText);
    expect(errorText).toBeTruthy();

    // check refetch button
    const refetchButton = component.getByText(mockProps.refetchText);
    expect(refetchButton).toBeTruthy();

    // check refetch button click
    refetchButton.click();
    expect(mockProps.refetch).toHaveBeenCalled();
  });

  test("should render FullPageErrorDisplay correctly without refetch button", () => {
    const mockProps = {
      errorText: "Uh oh! Something went wrong.",
    };

    const component = render(<FullPageErrorDisplay {...mockProps} />);
    expect(component).toBeTruthy();

    // check error text
    const errorText = component.getByText(mockProps.errorText);
    expect(errorText).toBeTruthy();

    // check refetch button
    const refetchButton = component.queryByText("Try again");
    expect(refetchButton).toBeFalsy();
  });

  test("should render FullPageErrorDisplay snapshot correctly", () => {
    const mockProps = {
      errorText: "Uh oh! Something went wrong.",
      refetch: jest.fn(),
      refetchText: "Try again",
    };

    const component = render(<FullPageErrorDisplay {...mockProps} />);
    expect(component).toMatchSnapshot();
  });
});
