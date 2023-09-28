import LineItemLabel from "../LineItemLabel";
import { LineItemLabelVariant } from "../LineItemLabel.definitions";
import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";

describe("LineItemLabel Tests", () => {
  test("LineItemLabel should render correctly", () => {
    faker.seed(2);

    // render sucess variant
    const successComponent = render(
      <LineItemLabel
        label={"Success Label"}
        variant={LineItemLabelVariant.SUCCESS}
      />,
    );
    expect(successComponent).toBeTruthy();
    expect(successComponent.getByText("Success Label")).toBeTruthy();

    // render error variant
    const errorComponent = render(
      <LineItemLabel
        label={"Error Label"}
        variant={LineItemLabelVariant.ERROR}
      />,
    );
    expect(errorComponent).toBeTruthy();
    expect(errorComponent.getByText("Error Label")).toBeTruthy();
  });

  test("LineItemLabel snapshot should render correctly", () => {
    faker.seed(2);

    // render sucess variant
    const successComponent = render(
      <LineItemLabel
        label={"Success Label"}
        variant={LineItemLabelVariant.SUCCESS}
      />,
    );
    expect(successComponent).toMatchSnapshot();

    // render error variant
    const errorComponent = render(
      <LineItemLabel
        label={"Error Label"}
        variant={LineItemLabelVariant.ERROR}
      />,
    );
    expect(errorComponent).toMatchSnapshot();
  });
});
