import styles from "./VolunteerLineItem.module.css";
import { listOfNames } from "../../util/string.util";
import LoadingButton from "../LoadingButton/LoadingButton";
import { LoadingButtonVariant } from "../LoadingButton/LoadingButton.definitions";
import { LineItemLabelVariant } from "../FileUploadedLabel/LineItemLabel.definitions";
import LineItemLabel from "../FileUploadedLabel/LineItemLabel";
import { faHandshake } from "@fortawesome/free-regular-svg-icons";
import { faCirclePlus, faReplyAll } from "@fortawesome/free-solid-svg-icons";
import type { Student } from "../../interfaces/User.interface";
import type { VolunteerLineItemProps } from "./VolunteerLineItem.definitions";

const VolunteerLineItem = ({
  volunteer,
  openMatchModal,
  openViewModal,
}: VolunteerLineItemProps) => (
  <div className={styles["line-item-container"]}>
    <div className={styles["line-item-container-left"]}>
      <div className={styles["line-item-name-icon"]}>
        {!volunteer.matchedStudents?.length ? (
          <div className={styles["line-item-unmatched-status-icon"]} />
        ) : (
          <div className={styles["line-item-matched-status-icon"]} />
        )}
      </div>
      <div className={styles["line-item-name"]}>
        {`${volunteer.firstName} ${volunteer.lastName}`}
        <span className={styles["volunteer-matched-student-list"]}>
          {volunteer.matchedStudents?.length
            ? `Matched with ${listOfNames(
                volunteer.matchedStudents.map((student: Student | string) =>
                  typeof student === "string"
                    ? student
                    : `${student.firstName} ${student.lastInitial}`,
                ),
              )}`
            : ""}
        </span>
      </div>
    </div>
    <div className={styles["line-item-action-buttons"]}>
      <LineItemLabel
        label={
          (volunteer.matchedStudents as Student[])?.some(
            (student: Student) => student.studentLetterLink !== undefined,
          )
            ? "View Responses"
            : "No Responses"
        }
        variant={
          (volunteer.matchedStudents as Student[])?.some(
            (student: Student) => student.studentLetterLink !== undefined,
          )
            ? LineItemLabelVariant.PURPLE
            : LineItemLabelVariant.GREY
        }
        onClick={
          (volunteer.matchedStudents as Student[])?.some(
            (student: Student) => student.studentLetterLink !== undefined,
          )
            ? () => openViewModal(volunteer)
            : undefined
        }
        icon={faReplyAll}
      />

      <div className={styles["line-item-match-button"]}>
        <LoadingButton
          isLoading={false}
          text={volunteer.matchedStudents?.length ? "Match more" : "Match"}
          onClick={() => openMatchModal(volunteer)}
          icon={volunteer.matchedStudents?.length ? faCirclePlus : faHandshake}
          variant={
            volunteer.matchedStudents?.length
              ? LoadingButtonVariant.DARKGREY
              : LoadingButtonVariant.BLUE
          }
          isResponsive={true}
        />
      </div>
    </div>
  </div>
);

export default VolunteerLineItem;
