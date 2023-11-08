import { createTestStudent, createTestVolunteer } from "../../../data/testData";
import VolunteerLineItem from "../VolunteerLineItem";
import { render, fireEvent } from "@testing-library/react";

describe("VolunteerLineItem", () => {
  test("VolunteerLineItem component renders correctly with no matched students", () => {
    const mockProps = {
      volunteer: {
        ...createTestVolunteer(),
      },
      openModal: jest.fn(),
      closeModal: jest.fn(),
    };

    const component = render(<VolunteerLineItem {...mockProps} />);
    expect(component).toBeTruthy();

    // Test that the component renders the correct data
    expect(
      component.getByText(
        mockProps.volunteer.firstName + " " + mockProps.volunteer.lastName,
      ),
    ).toBeTruthy();
    expect(component.getByText("Match")).toBeTruthy();

    // Click the match button
    fireEvent.click(component.getByText("Match"));
    expect(mockProps.openModal).toHaveBeenCalled();
  });

  test("VolunteerLineItem component renders correctly with matched students", () => {
    const mockProps = {
      volunteer: {
        ...createTestVolunteer(),
        matchedStudents: [
          createTestStudent(),
          createTestStudent(),
          createTestStudent(),
        ],
      },
      openModal: jest.fn(),
      closeModal: jest.fn(),
    };

    const component = render(<VolunteerLineItem {...mockProps} />);
    expect(component).toBeTruthy();

    // Test that the component renders the correct data
    expect(
      component.getByText(
        mockProps.volunteer.firstName + " " + mockProps.volunteer.lastName,
      ),
    ).toBeTruthy();
    expect(component.getByText("Add more")).toBeTruthy();

    // Click the match button
    fireEvent.click(component.getByText("Add more"));
    expect(mockProps.openModal).toHaveBeenCalled();
  });
});
