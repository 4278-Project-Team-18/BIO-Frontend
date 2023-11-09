import ActionLineItem from "../ActionLineItem";
import { render, fireEvent } from "@testing-library/react";

describe("ActionLineItem Tests", () => {
  test("ActionLineItem should render correctly", () => {
    const mockProps = {
      actionButtonTitle: "actionTitle",
      actionButtonOnClick: jest.fn(),
      showMoreButtonOnClick: jest.fn(),
      isAccordionExpanded: false,
      hideShowMoreButton: false,
      hideActionButton: false,
    };

    const component = render(<ActionLineItem {...mockProps} />);
    expect(component).toBeTruthy();

    // check if title is rendered
    const title = component.getByText(mockProps.actionButtonTitle);
    expect(title).toBeTruthy();

    // check if action button is rendered
    const actionButton = component.getByRole("button", {
      name: mockProps.actionButtonTitle,
    });
    expect(actionButton).toBeTruthy();

    // check if show more button is rendered
    const showMoreButton = component.getByText("Show More +");
    expect(showMoreButton).toBeTruthy();

    // click on show more button
    fireEvent.click(component.getByText("Show More +"));
    expect(mockProps.showMoreButtonOnClick).toHaveBeenCalledTimes(1);

    // click on action button
    fireEvent.click(component.getByText(mockProps.actionButtonTitle));
    expect(mockProps.actionButtonOnClick).toHaveBeenCalledTimes(1);
  });

  test("ActionLineItem should render hidden correctly", () => {
    const mockProps = {
      actionButtonTitle: "actionTitle",
      actionButtonOnClick: jest.fn(),
      showMoreButtonOnClick: jest.fn(),
      isAccordionExpanded: false,
      hideShowMoreButton: true,
      hideActionButton: true,
    };

    // check if component is not rendered
    const component = render(<ActionLineItem {...mockProps} />);
    expect(component.container.firstChild).toBeNull();
  });
});
