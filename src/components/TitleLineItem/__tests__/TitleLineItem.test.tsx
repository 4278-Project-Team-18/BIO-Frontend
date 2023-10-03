import TitleLineItem from "../TitleLineItem";
import { TitleLineItemVariant } from "../TitleLineItem.definitions";
import { render } from "@testing-library/react";

describe("TitleLineItem Tests", () => {
  test("TitleLineItem should render correctly", () => {
    const component = render(<TitleLineItem title={"Test Title"} />);
    expect(component).toBeTruthy();

    // Check if the title is rendered
    expect(component.getByText("Test Title")).toBeTruthy();

    // get rid of component
    component.unmount();

    // create new component with header variant prop
    const component2 = render(
      <TitleLineItem
        title={"Test Title"}
        variant={TitleLineItemVariant.TABLE_HEADER}
      />,
    );
    expect(component2).toBeTruthy();

    // Check if the title is rendered
    expect(component2.getByText("Test Title")).toBeTruthy();

    //check for the classes to end with -header
    expect(component2.getByText("Test Title").className).toMatch(/-header$/);

    // get rid of component
    component2.unmount();

    // create new component with header variant prop
    const component3 = render(
      <TitleLineItem
        title={"Test Title"}
        variant={TitleLineItemVariant.TABLE_TITLE}
      />,
    );
    expect(component3).toBeTruthy();

    // Check if the title is rendered
    expect(component3.getByText("Test Title")).toBeTruthy();

    //check for the classes to end with -title
    expect(component3.getByText("Test Title").className).toMatch(/-title$/);
  });

  test("TitleLineItem snapshot should render correctly", () => {
    const component = render(<TitleLineItem title={"Test Title"} />);
    expect(component).toMatchSnapshot();
  });
});
