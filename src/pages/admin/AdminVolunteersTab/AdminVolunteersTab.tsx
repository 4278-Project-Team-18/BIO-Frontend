import Accordion from "./Components/Accordion/Accordion";

const people = [
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

const ApproveDeny = () => (
  <div>
    <button>Approve</button>
    <button>Deny</button>
  </div>
);

const AdminVolunteersTab = () => {
  console.log("AdminVolunteersTab");
  return (
    <div>
      <h1>Admin Volunteers</h1>
      <Accordion title="Volunteer Applicants" people={people}>
        <ApproveDeny />
      </Accordion>
    </div>
  );
};

export default AdminVolunteersTab;
