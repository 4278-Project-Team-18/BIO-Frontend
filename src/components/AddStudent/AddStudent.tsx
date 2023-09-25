import { NewStudentInputName } from "./AddStudent.definitions";
import styles from "./AddStudent.module.css";
import { newStudentSchema } from "../../resolvers/student.resolver";
import FormInput from "../FormInput/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { faPlusCircle, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type {
  AddStudentProps,
  NewStudentInput,
} from "./AddStudent.definitions";
import type { Resolver } from "react-hook-form";

const AddStudent = ({ closeModal }: AddStudentProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    // setError,
  } = useForm<NewStudentInput>({
    defaultValues: {
      [NewStudentInputName.FIRST_NAME]: "",
      [NewStudentInputName.LAST_INITIAL]: "",
    },
    resolver: yupResolver(newStudentSchema) as Resolver<NewStudentInput>,
    mode: "onSubmit",
  });

  const onSubmitNewStudent = (data: NewStudentInput) => {
    console.log("data", data);
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <form
      className={styles["add-student-container"]}
      onSubmit={handleSubmit(onSubmitNewStudent)}
    >
      <button
        className={styles["add-student-cancel-button"]}
        onClick={handleCloseModal}
        type="button"
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

      <button className={styles["add-student-submit-button"]}>
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
