import { NewStudentInputName } from "./AddStudent.definitions";
import styles from "./AddStudent.module.css";
import { newStudentSchema } from "../../resolvers/student.resolver";
import FormInput from "../FormInput/FormInput";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { useClassesContext } from "../../context/Classes.context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { faPlusCircle, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import type {
  AddStudentProps,
  NewStudentInput,
} from "./AddStudent.definitions";
import type { Resolver } from "react-hook-form";
import type { Student } from "../../interfaces/User.interface";

const AddStudent = ({ closeModal, classId }: AddStudentProps) => {
  // form controller
  const {
    control,
    handleSubmit,
    formState: { errors },
    // setError,
  } = useForm<NewStudentInput>({
    defaultValues: {
      [NewStudentInputName.FIRST_NAME]: "",
      [NewStudentInputName.LAST_INITIAL]: "",
      [NewStudentInputName.READING_LEVEL]: "",
    },
    resolver: yupResolver(newStudentSchema) as Resolver<NewStudentInput>,
    mode: "onSubmit",
  });

  // request to add the student to the class
  const {
    data: addStudentResponseData,
    loading: addStudentLoading,
    error: addStudentError,
    makeRequest: addStudent,
  } = useCustomFetch<Student>(
    `class/${classId}/addStudent`,
    RequestMethods.POST,
  );

  // get the addStudentToClass function from the context
  const { addStudentToClass } = useClassesContext();

  // send the request to add the student to the class
  const onSubmitNewStudent = async (inputData: NewStudentInput) => {
    await addStudent(inputData);
  };

  // add the student to the class if the request was successful
  useEffect(() => {
    if (addStudentResponseData) {
      console.log(addStudentResponseData);
      addStudentToClass(addStudentResponseData, classId);
      closeModal();
    }
  }, [addStudentResponseData]);

  if (addStudentLoading) {
    return <div>Loading...</div>;
  }

  if (addStudentError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <form
      className={styles["add-student-container"]}
      onSubmit={handleSubmit(onSubmitNewStudent)}
    >
      <button
        className={styles["add-student-cancel-button"]}
        onClick={closeModal}
        type="button"
        aria-label="close-button"
      >
        <FontAwesomeIcon
          icon={faCircleXmark}
          className={styles["add-student-cancel-button-icon"]}
        />
      </button>
      <FormInput
        name={NewStudentInputName.FIRST_NAME}
        type="text"
        label="First name"
        control={control}
        placeholder="First name"
        error={errors[NewStudentInputName.FIRST_NAME]?.message}
      />
      <FormInput
        name={NewStudentInputName.LAST_INITIAL}
        type="text"
        label="Last initial"
        control={control}
        placeholder="Last initial"
        error={errors[NewStudentInputName.LAST_INITIAL]?.message}
      />
      <FormInput
        name={NewStudentInputName.READING_LEVEL}
        type="text"
        label="Reading Level"
        control={control}
        placeholder="Reading Level"
        error={errors[NewStudentInputName.READING_LEVEL]?.message}
      />

      <button className={styles["add-student-submit-button"]} type="submit">
        <div className={styles["add-student-submit-button-title"]}>
          {"Add Student"}
        </div>
        <FontAwesomeIcon
          icon={faPlusCircle}
          className={styles["add-student-submit-button-icon"]}
        />
      </button>
    </form>
  );
};

export default AddStudent;
