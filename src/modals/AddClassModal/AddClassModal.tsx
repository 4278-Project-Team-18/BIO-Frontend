import { NewClassInputName } from "./AddClassModal.definitions";
import styles from "./AddClassModal.module.css";
import FormInput from "../../components/FormInput/FormInput";
import { newClassSchema } from "../../resolvers/class.resolver";
import FormSelect from "../../components/FormSelect/FormSelect";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import type {
  AddClassModalProps,
  NewClassInput,
} from "./AddClassModal.definitions";
import type { Resolver } from "react-hook-form";

const AddClassModal = ({ closeModal }: AddClassModalProps) => {
  // form controller
  const {
    control,
    handleSubmit,
    formState: { errors },
    // setError,
  } = useForm<NewClassInput>({
    defaultValues: {
      [NewClassInputName.CLASS_NAME]: "",
      [NewClassInputName.TEACHER_ID]: "",
    },
    resolver: yupResolver(newClassSchema) as Resolver<NewClassInput>,
    mode: "onSubmit",
  });

  const onSubmitNewClass = async (inputData: NewClassInput) => {
    console.log(inputData);
  };

  return (
    <div className={styles["add-class-backdrop"]}>
      <form
        className={styles["add-class-container"]}
        onSubmit={handleSubmit(onSubmitNewClass)}
      >
        <div className={styles["add-class-top-section"]}>
          <div className={styles["add-class-title"]}>Add Class</div>
          <button
            className={styles["add-class-cancel-button"]}
            onClick={closeModal}
            type="button"
            aria-label="close-button"
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={styles["add-class-cancel-button-icon"]}
            />
          </button>
        </div>
        <div>
          <FormInput
            control={control}
            type="text"
            name={NewClassInputName.CLASS_NAME}
            label="Class Name"
            error={errors[NewClassInputName.CLASS_NAME]?.message}
            placeholder="Class Name"
          />
          <FormSelect
            control={control}
            name={NewClassInputName.TEACHER_ID}
            label="Teacher"
            error={errors[NewClassInputName.TEACHER_ID]?.message}
            options={[
              { value: "1", label: "Teacher 1" },
              { value: "2", label: "Teacher 2" },
              { value: "3", label: "Teacher 3" },
            ]}
          />
        </div>
      </form>
    </div>
  );
};

export default AddClassModal;
