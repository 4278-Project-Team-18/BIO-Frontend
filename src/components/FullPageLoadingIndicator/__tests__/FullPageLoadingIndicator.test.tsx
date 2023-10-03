import FullPageLoadingIndicator from "../FullPageLoadingIndicator";
import { render } from "@testing-library/react";

describe("FullPageLoadingIndicator", () => {
  test("should render FullPageLoadingIndicator correctly", () => {
    const component = render(<FullPageLoadingIndicator />);
    expect(component).toBeTruthy();
  });
  test("should render FullPageLoadingIndicator snapshot correctly", () => {
    const component = render(<FullPageLoadingIndicator />);
    expect(component).toMatchSnapshot();
  });
});
