import Accordion from "./Components/Accordion/Accordion";

const AdminVolunteersTab = () => {
  console.log("AdminVolunteersTab");

  return (
    <div>
      <h1>Admin Volunteers</h1>
      <Accordion
        title="Volunteers"
        volunteers={[
          "Volunteer 1",
          "Volunteer 2",
          "Volunteer 3",
          "Volunteer 4",
          "Volunteer 5",
          "Volunteer 6",
          "Volunteer 7",
          "Volunteer 8",
          "Volunteer 9",
          "Volunteer 10",
          "Volunteer 11",
        ]}
      />
    </div>
  );
};

export default AdminVolunteersTab;
