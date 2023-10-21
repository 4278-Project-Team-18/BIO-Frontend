import styles from "./Sidebar.module.css";
import { useNavigationContext } from "../context/Navigation.context";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faSchool,
  faUsers,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import type { TabOptions } from "../interfaces/User.interface";

const SideBar = () => {
  const { currentTab, setCurrentTab } = useNavigationContext();

  const { user } = useUser();

  const [sideBar, setSideBar] = useState<boolean>(false);
  const [currentWidth, setCurrentWidth] = useState<number>(window.innerWidth);

  // Titles for the sidebar, conditionally set by the user's role
  const sideBarTitles = ["Dashboard", "Classes", "Volunteers", "Applicants"];

  // Icon components for the sidebar
  const sideBarIcons = [faHouse, faSchool, faUsers, faUserPlus];

  // Sets the active route when a route is clicked
  const handleRouteChange = (route: TabOptions) => {
    setCurrentTab(route);
  };

  // Close the side bar if switch to mobile view
  useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    if (currentWidth < 800) {
      setSideBar(false);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  useEffect(() => {
    // Set the current tab to the active route
    setCurrentTab(currentTab);
  }, []);

  return (
    <div
      className={
        sideBar
          ? `${styles["sidebar-container"]} ${styles["sidebar-active"]}`
          : styles["sidebar-container"]
      }
    >
      <div className={styles["sidebar-header"]}>
        <button onClick={() => setSideBar(!sideBar)}>
          <i
            className={
              sideBar
                ? styles["arrow"] + " " + styles["left"]
                : styles["arrow"] + " " + styles["right"]
            }
          />
        </button>
      </div>
      <div
        className={`${styles["sidebar-open"]} ${
          sideBar
            ? styles["sidebar-open-visible"]
            : styles["sidebar-open-hidden"]
        }`}
      >
        <div className={styles["sidebar-routes"]}>
          <div>
            {sideBarTitles.map((title, index) => (
              <Link
                to={"/admin/" + title.toLowerCase()}
                className={styles["sidebar-route-link"]}
                key={index}
              >
                <div
                  className={
                    styles["sidebar-route"] +
                    " " +
                    (currentTab === title.toLowerCase()
                      ? styles["sidebar-route-active"]
                      : styles["sidebar-route-inactive"])
                  }
                  key={index}
                  onClick={() => {
                    handleRouteChange(title.toLowerCase() as TabOptions);
                    setSideBar(false);
                  }}
                >
                  <FontAwesomeIcon
                    className={styles["sidebar-icon"]}
                    icon={sideBarIcons[index]}
                  />
                  &nbsp;&nbsp;{title}
                </div>
              </Link>
            ))}
          </div>
          <div className={styles["profile-container"]}>
            <div className={styles["user-info-container"]}>
              <div className={styles["full-name"]}> {user?.fullName}</div>
              <div className={styles["email"]}>
                {user?.primaryEmailAddress?.emailAddress}
              </div>
            </div>
            <UserButton
              showName={false}
              afterSignOutUrl="/sign-in/"
              signInUrl="/sign-in/"
            />
          </div>
        </div>
      </div>
      <div
        className={`${styles["sidebar-closed"]} ${
          sideBar
            ? styles["sidebar-closed-hidden"]
            : styles["sidebar-closed-visible"]
        }`}
      >
        {sideBarTitles.map((title, index) => (
          <div
            className={styles["sidebar-closed-route"]}
            key={index}
            onClick={() => {
              handleRouteChange(title.toLowerCase() as TabOptions);
            }}
          >
            <Link to={"/admin/" + title.toLowerCase()} key={index}>
              <FontAwesomeIcon
                className={`${styles["sidebar-closed-icon"]} ${
                  currentTab === title.toLowerCase()
                    ? styles["sidebar-closed-icon-active"]
                    : styles["sidebar-closed-icon-inactive"]
                }`}
                icon={sideBarIcons[index]}
              />
            </Link>
          </div>
        ))}
        <div className={styles["user-button-container"]}>
          <UserButton afterSignOutUrl="/sign-in/" signInUrl="/sign-in/" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
