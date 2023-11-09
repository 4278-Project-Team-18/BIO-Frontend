import LoadingButton from "../LoadingButton";
import { render } from "@testing-library/react";

describe("LoadingButton Tests", () => {
  test("LoadingButton should render correctly", () => {
    const mockProps = {
      isLoading: true,
      isLoadingText: "Loading Test",
      text: "Test",
      onClick: jest.fn(),
    };

    const component = render(<LoadingButton {...mockProps} />);
    expect(component).toBeTruthy();

    // Check if the loading text is rendered
    expect(component.getByText(mockProps.isLoadingText)).toBeTruthy();
    component.getByText(mockProps.isLoadingText).click();

    // Won't call onClick if loading
    expect(mockProps.onClick).toHaveBeenCalledTimes(0);

    // Check if text is rendered
    mockProps.isLoading = false;
    const component2 = render(<LoadingButton {...mockProps} />);
    expect(component2.getByText(mockProps.text)).toBeTruthy();
  });

  test("LoadingButton snapshot should render correctly", () => {
    const mockProps = {
      isLoading: true,
      isLoadingText: "Loading Test",
      text: "Test",
      onClick: jest.fn(),
    };

    const component = render(<LoadingButton {...mockProps} />);
    expect(component).toMatchSnapshot();
  });
});
