import LineItemDivider from "../LineItemDivider";
import { render } from "@testing-library/react";

describe("LineItemDivider Tests", () => {
  test("LineItemDivider should render correctly", () => {
    const component = render(<LineItemDivider />);
    expect(component).toBeTruthy();
  });

  test("LineItemDivider snapshot should render correctly", () => {
    const component = render(<LineItemDivider />);
    expect(component).toMatchSnapshot();
  });
});
