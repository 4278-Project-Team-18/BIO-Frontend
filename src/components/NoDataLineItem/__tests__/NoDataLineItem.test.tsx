import NoDataLineItem from "../NoDataLineItem";
import { render } from "@testing-library/react";

describe("NoDataLineItem Tests", () => {
  test("NoDataLineItem should render correctly", () => {
    const component = render(<NoDataLineItem title={"Test Title"} />);
    expect(component).toBeTruthy();

    // Check if the title is rendered
    expect(component.getByText("Test Title")).toBeTruthy();

    // check for two LineItemDividers
    expect(component.getAllByTestId("line-item-divider").length).toBe(2);
  });

  test("NoDataLineItem snapshot should render correctly", () => {
    const component = render(<NoDataLineItem title={"Test Title"} />);
    expect(component).toMatchSnapshot();
  });
});
