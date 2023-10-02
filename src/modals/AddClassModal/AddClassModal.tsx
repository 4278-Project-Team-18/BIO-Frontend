import { NewClassInputName } from "./AddClassModal.definitions";
import styles from "./AddClassModal.module.css";
import FormInput from "../../components/FormInput/FormInput";
import { newClassSchema } from "../../resolvers/class.resolver";
import FormSelect from "../../components/FormSelect/FormSelect";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { useClassesContext } from "../../context/Classes.context";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import type { FormSelectOption } from "../../components/FormSelect/FormSelect.definition";
import type { Class, Teacher } from "../../interfaces/User.interface";
import type {
  AddClassModalProps,
  NewClassInput,
} from "./AddClassModal.definitions";
import type { Resolver } from "react-hook-form";

const AddClassModal = ({ closeModal }: AddClassModalProps) => {
  // request to get all teachers
  const {
    data: teacherData,
    loading: teacherLoading,
    error: teacherError,
  } = useCustomFetch<Teacher[]>(`teacher/allTeachers`);

  const {
    data: classData,
    loading: classLoading,
    // error: classError,
    makeRequest: makeClassRequest,
  } = useCustomFetch<Class>(`class`, RequestMethods.POST);

  const { addClass } = useClassesContext();

  // form controller
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    // setError,
  } = useForm<NewClassInput>({
    defaultValues: {
      [NewClassInputName.CLASS_NAME]: "",
      [NewClassInputName.TEACHER_ID]: "",
    },
    resolver: yupResolver(newClassSchema) as Resolver<NewClassInput>,
    mode: "onSubmit",
  });

  // send the request to add the class
  const onSubmitNewClass = async (inputData: NewClassInput) => {
    await makeClassRequest(inputData);
  };

  // set the default value of the teacher select to the first teacher
  useEffect(() => {
    if (teacherData && teacherData.length > 0) {
      setValue(NewClassInputName.TEACHER_ID, teacherData[0]._id);
    }
  }, [teacherData]);

  useEffect(() => {
    if (classData) {
      addClass(classData);
      closeModal();
    }
  }, [classData]);

  // if the request is loading, show a loading message
  if (teacherLoading) {
    return (
      <div className={styles["add-class-backdrop"]}>
        <div>Loading...</div>;
      </div>
    );
  }

  // if the request failed, show an error message
  if (teacherError || !teacherData) {
    return (
      <div className={styles["add-class-backdrop"]}>
        <div>Something went wrong...</div>
      </div>
    );
  }

  // map the teacher data to the form options
  const formOptions = teacherData.map(
    (teacher: Teacher) =>
      ({
        value: teacher._id,
        label: `${teacher.firstName} ${teacher.lastName}`,
      }) as FormSelectOption,
  );

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
            options={formOptions}
            defaultValue={formOptions[0].value}
            setValue={setValue}
          />

          <div className={styles["add-class-submit-container"]}>
            <div className={styles["add-class-submit-inner-container"]}>
              <LoadingButton
                text="Add Class"
                type="submit"
                icon={faPlusCircle}
                isLoading={classLoading}
                isLoadingText="Adding Class..."
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddClassModal;
