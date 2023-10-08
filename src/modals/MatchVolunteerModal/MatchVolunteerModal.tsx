import styles from "./MatchVolunteerModal.module.css";
import {
  MatchVolunteerInputName,
  type MatchVolunteerInput,
  type MatchVolunteerModalProps,
} from "./MatchVolunteerModal.defintions";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
//import { useVolunteersContext } from "../../context/Volunteers.context";
import { matchVolunteerSchema } from "../../resolvers/match.resolver";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import FormSelect from "../../components/FormSelect/FormSelect";
// import { useVolunteersContext } from "../../context/Volunteers.context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import type { FormSelectOption } from "../../components/FormSelect/FormSelect.definition";
import type { Resolver } from "react-hook-form";
import type {
  Class,
  Student,
  Teacher,
  Volunteer,
} from "../../interfaces/User.interface";

const MatchVolunteerModal = ({
  closeModal,
  volunteerId,
}: MatchVolunteerModalProps) => {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  // request to get all teachers
  const {
    data: teacherData,
    loading: teacherLoading,
    error: teacherError,
  } = useCustomFetch<Teacher[]>(`teacher/allTeachers`);

  // request to get all classes
  const {
    data: classData,
    loading: classLoading,
    error: classError,
  } = useCustomFetch<Class[]>(`class/allClasses`);

  // request to patch student to volunteer
  const {
    data: matchData,
    loading: matchLoading,
    error: matchError,
    makeRequest: makeMatchRequest,
  } = useCustomFetch<Volunteer>(
    `/matchVolunteerToStudent`,
    RequestMethods.PATCH,
  );

  // const { matchVolunteer } = useVolunteersContext();

  // form controller
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    // setError,
  } = useForm<MatchVolunteerInput>({
    defaultValues: {
      [MatchVolunteerInputName.VOLUNTEER_ID]: volunteerId,
      [MatchVolunteerInputName.STUDENT_IDS]: [""],
      [MatchVolunteerInputName.TEACHER_ID]: "",
      [MatchVolunteerInputName.CLASS_ID]: "",
    },
    resolver: yupResolver(
      matchVolunteerSchema,
    ) as Resolver<MatchVolunteerInput>,
    mode: "onSubmit",
  });

  // send the request to match the volunteer
  const onSubmitMatchVolunteer = async (inputData: MatchVolunteerInput) => {
    const matchVolunteerRequestData = {
      volunteerId: inputData.volunteerId,
      studentIds: inputData.studentIds,
    };
    await makeMatchRequest(matchVolunteerRequestData);
  };

  useEffect(() => {
    if (matchData) {
      console.log(matchData);
      //matchVolunteer();
      closeModal();
    }
  }, [matchData]);

  // if the requet is loading, show a message
  if (teacherLoading || classLoading) {
    return (
      <div className={styles["match-volunteer-backdrop"]}>
        <div>Loading...</div>
      </div>
    );
  }

  // if the request failed, show an error message
  if (teacherError || !teacherData || classError || !classData || matchError) {
    return (
      <div className={styles["match-volunteer-backdrop"]}>
        <div>Something went wrong...</div>
      </div>
    );
  }

  // map the teachers to options for the form options
  //   const teacherOptions = teacherData
  //     .filter(
  //       (teacher) =>
  //         teacher.approvalStatus === "APPROVED" && teacher.classes?.length,
  //     )
  //     .map(
  //       (teacher) =>
  //         ({
  //           value: teacher._id,
  //           label: `${teacher.firstName} ${teacher.lastName}`,
  //         }) as FormSelectOption,
  //     );
  const teacherOptions = teacherData?.map(
    (teacher) =>
      ({
        value: teacher._id,
        label: `${teacher.firstName} ${teacher.lastName}`,
      }) as FormSelectOption,
  );

  const handleTeacherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const teacherId = e.target.value;
    const teacher = teacherData?.find((teacher) => teacher._id === teacherId);
    setSelectedTeacher(teacher || null);
    setSelectedClass(null);
    setSelectedStudents([]);
    setValue(MatchVolunteerInputName.CLASS_ID, "");
    setValue(MatchVolunteerInputName.STUDENT_IDS, [""]);
  };

  // map the classes to options for the form options for a given teacher
  const classOptions = selectedTeacher?.classes?.map((classId) => {
    const classItem = classData?.find((classItem) => classItem._id === classId);
    return {
      value: classItem?._id,
      label: `${classItem?.name}`,
    } as FormSelectOption;
  });

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const classId = e.target.value;
    const classItem = classData?.find((classItem) => classItem._id === classId);
    setSelectedClass(classItem || null);
    setSelectedStudents([]);
    setValue(MatchVolunteerInputName.STUDENT_IDS, [""]);
  };

  // map the students to options for the form options for a given class
  // const studentOptions = selectedClass?.students
  //   ?.filter((student) => student.matchedVolunteer === null)
  //   .map(
  //     (student: Student) =>
  //       ({
  //         value: student._id,
  //         label: `${student.firstName} ${student.lastInitial}`,
  //       }) as FormSelectOption,
  //   );
  const studentOptions = selectedClass?.students?.map(
    (student: Student) =>
      ({
        value: student._id,
        label: `${student.firstName} ${student.lastInitial}`,
      }) as FormSelectOption,
  );

  const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const studentId = e.target.value;
    setSelectedStudents([studentId]);
    setValue(MatchVolunteerInputName.STUDENT_IDS, selectedStudents);
    console.log(selectedStudents);
  };

  return (
    <div className={styles["match-volunteer-backdrop"]}>
      <form
        className={styles["match-volunteer-container"]}
        onSubmit={handleSubmit(onSubmitMatchVolunteer)}
      >
        <div className={styles["match-volunteer-top-section"]}>
          <div className={styles["match-volunteer-title"]}>Match Volunteer</div>
          <button
            className={styles["match-volunteer-cancel-button"]}
            onClick={closeModal}
            type="button"
            aria-label="close-button"
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={styles["match-volunteer-cancel-button-icon"]}
            />
          </button>
        </div>
        <div>
          <FormSelect
            control={control}
            name={MatchVolunteerInputName.TEACHER_ID}
            label="Teacher"
            error={errors[MatchVolunteerInputName.TEACHER_ID]?.message}
            options={teacherOptions}
            placeholder="Please select a teacher..."
            setValue={setValue}
            onChange={handleTeacherChange}
          />
          {selectedTeacher && (
            <FormSelect
              control={control}
              name={MatchVolunteerInputName.CLASS_ID}
              label="Class"
              error={errors[MatchVolunteerInputName.CLASS_ID]?.message}
              options={classOptions || []}
              placeholder="Please select a class..."
              setValue={setValue}
              onChange={handleClassChange}
              defaultValue={selectedTeacher ? "" : undefined}
            />
          )}
          {selectedTeacher && selectedClass && (
            <FormSelect
              control={control}
              name={MatchVolunteerInputName.STUDENT_IDS}
              label="Students"
              error={errors[MatchVolunteerInputName.STUDENT_IDS]?.message}
              options={studentOptions || []}
              placeholder="Please select a student..."
              setValue={setValue}
              onChange={handleStudentChange}
              defaultValue={selectedClass ? "" : undefined}
            />
          )}

          <div className={styles["match-volunteer-submit-container"]}>
            <div className={styles["match-volunteer-submit-inner-container"]}>
              <LoadingButton
                text="Match Volunteer"
                type="submit"
                icon={faPlusCircle}
                isLoading={matchLoading}
                isLoadingText="Matching Volunteer..."
                onClick={() => {
                  console.log(selectedStudents);
                  console.log(selectedTeacher);
                  console.log(selectedClass);
                  console.log(MatchVolunteerInputName.VOLUNTEER_ID);
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MatchVolunteerModal;
