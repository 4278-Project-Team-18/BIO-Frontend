import Accordion from "./Components/Accordion/Accordion";
import VolunteerApprovalLineItem from "./Components/LineItem/VolunteerApprovalLineItem";

const volunteers = [
  "Volunteer 1",
  "Volunteer 2",
  "Volunteer 3",
  "Volunteer 4",
  "Volunteer 5",
  "Volunteer 6",
  "Volunteer 7",
  "Volunteer 8",
  "Volunteer 9",
];

const AdminVolunteersTab = () => {
  console.log("AdminVolunteersTab");
  return (
    <div>
      <h1>Admin Volunteers</h1>
      <Accordion title="Volunteer Applicants">
        {volunteers.map((volunteer, index) => (
          <VolunteerApprovalLineItem key={index} volunteer={volunteer} />
        ))}
      </Accordion>
    </div>
  );
};

export default AdminVolunteersTab;
