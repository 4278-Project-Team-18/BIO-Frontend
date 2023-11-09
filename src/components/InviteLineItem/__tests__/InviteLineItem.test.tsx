import { InviteStatus } from "../../../interfaces/Invites.interface";
import { Role } from "../../../interfaces/User.interface";
import InviteLineItem from "../InviteLineItem";
import { render } from "@testing-library/react";

describe("InviteLineItem Tests", () => {
  test("InviteLineItem for sent should render correctly", () => {
    const mockProps = {
      invite: {
        _id: "123",
        email: "test@test.com",
        status: InviteStatus.SENT,
        role: Role.TEACHER,
        date: "2021-01-01",
        sender: "test",
      },
    };

    const component = render(<InviteLineItem {...mockProps} />);
    expect(component).toBeTruthy();

    // check if email is rendered
    const email = component.getByText(mockProps.invite.email);
    expect(email).toBeTruthy();

    // check if role is rendered
    const role = component.getByText("Teacher");
    expect(role).toBeTruthy();

    // check if status is rendered
    const status = component.getByText("Sent");
    expect(status).toBeTruthy();
  });

  test("InviteLineItem for opened should render correctly", () => {
    const mockProps = {
      invite: {
        _id: "123",
        email: "test@test.com",
        status: InviteStatus.OPENED,
        role: Role.TEACHER,
        date: "2021-01-01",
        sender: "test",
      },
    };

    const component = render(<InviteLineItem {...mockProps} />);
    expect(component).toBeTruthy();

    // check if email is rendered
    const email = component.getByText(mockProps.invite.email);
    expect(email).toBeTruthy();

    // check if role is rendered
    const role = component.getByText("Teacher");
    expect(role).toBeTruthy();

    // check if status is rendered
    const status = component.getByText("Opened");
    expect(status).toBeTruthy();
  });

  test("InviteLineItem for completed should render correctly", () => {
    const mockProps = {
      invite: {
        _id: "123",
        email: "test@test.com",
        status: InviteStatus.COMPLETED,
        role: Role.TEACHER,
        date: "2021-01-01",
        sender: "test",
      },
    };

    const component = render(<InviteLineItem {...mockProps} />);
    expect(component).toBeTruthy();

    // check if email is rendered
    const email = component.getByText(mockProps.invite.email);
    expect(email).toBeTruthy();

    // check if role is rendered
    const role = component.getByText("Teacher");
    expect(role).toBeTruthy();

    // check if status is rendered
    const status = component.getByText("Completed");
    expect(status).toBeTruthy();
  });

  test("InviteLineItem for approved should render correctly", () => {
    const mockProps = {
      invite: {
        _id: "123",
        email: "test@test.com",
        status: InviteStatus.APPROVED,
        role: Role.TEACHER,
        date: "2021-01-01",
        sender: "test",
      },
    };

    const component = render(<InviteLineItem {...mockProps} />);
    expect(component).toBeTruthy();

    // check if email is rendered
    const email = component.getByText(mockProps.invite.email);
    expect(email).toBeTruthy();

    // check if role is rendered
    const role = component.getByText("Teacher");
    expect(role).toBeTruthy();

    // check if status is rendered
    const status = component.getByText("Approved");
    expect(status).toBeTruthy();
  });

  test("InviteLineItem for rejected should render correctly", () => {
    const mockProps = {
      invite: {
        _id: "123",
        email: "test@test.com",
        status: InviteStatus.REJECTED,
        role: Role.TEACHER,
        date: "2021-01-01",
        sender: "test",
      },
    };

    const component = render(<InviteLineItem {...mockProps} />);
    expect(component).toBeTruthy();

    // check if email is rendered
    const email = component.getByText(mockProps.invite.email);
    expect(email).toBeTruthy();

    // check if role is rendered
    const role = component.getByText("Teacher");
    expect(role).toBeTruthy();

    // check if status is rendered
    const status = component.getByText("Rejected");
    expect(status).toBeTruthy();
  });
});
