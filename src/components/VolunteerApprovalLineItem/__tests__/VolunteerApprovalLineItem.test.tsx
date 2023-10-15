import VolunteerApprovalLineItem from "../VolunteerApprovalLineItem";
import { Role } from "../../../interfaces/User.interface";
import { render } from "@testing-library/react";
import type { Volunteer } from "../../../interfaces/User.interface";

describe("VolunteerApprovalLineItem Tests", () => {
  test("VolunteerApprovalLineItem should render correctly", () => {
    const mockVolunteer = {
      _id: "12345",
      firstName: "Test",
      lastName: "Test",
      email: "testemail@gmail.com",
      role: Role.VOLUNTEER,
    } as Volunteer;

    const component = render(
      <VolunteerApprovalLineItem volunteer={mockVolunteer} />,
    );
    expect(component).toBeTruthy();

    // Check if the name is rendered
    expect(component.getByText("Test Test")).toBeTruthy();

    // Check if the buttons are rendered
    expect(component.getByText("Approve")).toBeTruthy();
    expect(component.getByText("Deny")).toBeTruthy();
  });

  test("VolunteerApprovalLineItem snapshot should render correctly", () => {
    const mockVolunteer = {
      _id: "12345",
      firstName: "Test",
      lastName: "Test",
      email: "testemail@gmail.com",
      role: Role.VOLUNTEER,
    } as Volunteer;

    const component = render(
      <VolunteerApprovalLineItem volunteer={mockVolunteer} />,
    );
    expect(component).toMatchSnapshot();
  });
});
