import { Outlet } from "react-router";

const App = () => {
  console.log("App");
  return (
    <div className="app-main-container">
      <div className="app-main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
