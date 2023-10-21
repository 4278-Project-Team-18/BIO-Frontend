import { NewEditStudentInputName } from "./AddEditStudent.definitions";
import styles from "./AddEditStudent.module.css";
import { newStudentSchema } from "../../resolvers/student.resolver";
import FormInput from "../FormInput/FormInput";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { useClassesContext } from "../../context/Classes.context";
import LoadingButton from "../LoadingButton/LoadingButton";
import { FormInputSizeVariant } from "../FormInput/FormInput.definitions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { faPlusCircle, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import type {
  AddEditStudentProps,
  NewEditStudentInput,
} from "./AddEditStudent.definitions";
import type { Resolver } from "react-hook-form";
import type { Student } from "../../interfaces/User.interface";

const AddEditStudent = ({
  closeModal,
  classId,
  student,
}: AddEditStudentProps) => {
  // form controller
  const {
    control,
    handleSubmit,
    formState: { errors },
    // setError,
  } = useForm<NewEditStudentInput>({
    defaultValues: {
      [NewEditStudentInputName.FIRST_NAME]: student?.firstName || "",
      [NewEditStudentInputName.LAST_INITIAL]: student?.lastInitial || "",
      [NewEditStudentInputName.READING_LEVEL]: student?.readingLevel || "",
    },
    resolver: yupResolver(newStudentSchema) as Resolver<NewEditStudentInput>,
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

  const {
    data: editStudentResponseData,
    loading: editStudentLoading,
    error: editStudentError,
    makeRequest: editStudent,
  } = useCustomFetch<Student>(`/student/${student?._id}`, RequestMethods.PATCH);

  // get the addStudentToClass function from the context
  const { addStudentToClass, editStudentInClass } = useClassesContext();

  // send the request to add the student to the class
  const onSubmitNewStudent = async (inputData: NewEditStudentInput) => {
    await addStudent(inputData);
  };

  const onSubmitEditStudent = async (inputData: NewEditStudentInput) => {
    await editStudent(inputData);
  };

  // add the student to the class if the request was successful
  useEffect(() => {
    if (addStudentResponseData && !addStudentError) {
      addStudentToClass(addStudentResponseData, classId);
      closeModal();
    }
  }, [addStudentResponseData]);

  // edit the student in the class if the request was successful
  useEffect(() => {
    if (editStudentResponseData && !editStudentError) {
      editStudentInClass(editStudentResponseData, classId);
      closeModal();
    }
  }, [editStudentResponseData]);

  if (addStudentError || editStudentError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <form
      className={styles["add-student-container"]}
      onSubmit={
        student
          ? handleSubmit(onSubmitEditStudent)
          : handleSubmit(onSubmitNewStudent)
      }
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
        name={NewEditStudentInputName.FIRST_NAME}
        type="text"
        control={control}
        placeholder="First name"
        error={errors[NewEditStudentInputName.FIRST_NAME]?.message}
        defaultValue={student?.firstName}
        sizeVariant={FormInputSizeVariant.compact}
        extraStyles={{ marginTop: "10px" }}
      />
      <FormInput
        name={NewEditStudentInputName.LAST_INITIAL}
        type="text"
        control={control}
        placeholder="Last initial"
        error={errors[NewEditStudentInputName.LAST_INITIAL]?.message}
        defaultValue={student?.lastInitial}
        sizeVariant={FormInputSizeVariant.compact}
        extraStyles={{ marginTop: "10px" }}
      />
      <FormInput
        name={NewEditStudentInputName.READING_LEVEL}
        type="text"
        control={control}
        placeholder="Reading Level"
        error={errors[NewEditStudentInputName.READING_LEVEL]?.message}
        defaultValue={student?.readingLevel}
        sizeVariant={FormInputSizeVariant.compact}
        extraStyles={{ marginTop: "10px" }}
      />
      <div className={styles["add-student-loading-button-container"]}>
        <LoadingButton
          text={student ? "Edit Student" : "Add Student"}
          type="submit"
          icon={student ? faCheckCircle : faPlusCircle}
          isLoading={addStudentLoading || editStudentLoading}
          isLoadingText={student ? "Editing student..." : "Adding student..."}
          isResponsive={false}
          styles={{
            marginBottom: "5px",
          }}
        />
      </div>
    </form>
  );
};

export default AddEditStudent;
