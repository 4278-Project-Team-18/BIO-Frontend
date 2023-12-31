import { NewClassInputName } from "./AddClassModal.definitions";
import styles from "./AddClassModal.module.css";
import FormInput from "../../components/FormInput/FormInput";
import { newClassSchema } from "../../resolvers/class.resolver";
import FormSelect from "../../components/FormSelect/FormSelect";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { useClassesContext } from "../../context/Classes.context";
import LoadingButton from "../../components/LoadingButton/LoadingButton";

import FullPageErrorDisplay from "../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { MoonLoader } from "react-spinners";
import type { FormSelectOption } from "../../components/FormSelect/FormSelect.definition";
import type { Class, Teacher } from "../../interfaces/User.interface";
import type {
  AddClassModalProps,
  NewClassInput,
} from "./AddClassModal.definitions";
import type { Resolver } from "react-hook-form";

const AddClassModal = ({ closeModal, teacher }: AddClassModalProps) => {
  // make request to get the teacher data, unless a teacher is provided then do not make request
  const {
    data: teacherData,
    loading: teacherLoading,
    error: teacherError,
    makeRequest: makeTeacherRequest,
  } = !teacher
    ? useCustomFetch<Teacher[]>(`/teacher/`)
    : {
        data: [teacher],
        loading: false,
        error: null,
        makeRequest: () => {},
      };

  const {
    data: classData,
    loading: classLoading,
    error: classError,
    makeRequest: makeClassRequest,
  } = useCustomFetch<Class>(`/class/`, RequestMethods.POST);

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
      [NewClassInputName.TEACHER_ID]: teacher?._id || "",
    },
    resolver: yupResolver(newClassSchema) as Resolver<NewClassInput>,
    mode: "onSubmit",
  });

  // send the request to add the class
  const onSubmitNewClass = async (inputData: NewClassInput) => {
    await makeClassRequest(inputData);
  };

  // if there is no teacher param, then don't make the request
  useEffect(() => {
    if (!teacher && !teacherData) {
      makeTeacherRequest();
    }
  }, [teacher]);

  // set the default value of the teacher select to the first teacher
  useEffect(() => {
    if (teacherData && teacherData.length > 0) {
      setValue(NewClassInputName.TEACHER_ID, teacherData[0]._id);
    }
  }, [teacherData]);

  useEffect(() => {
    if (classData && !classError) {
      addClass(classData);
      closeModal();
    }
  }, [classData]);

  // if the request is loading, show a loading message
  if (teacherLoading || !teacherData) {
    return (
      <div className={styles["add-class-backdrop"]}>
        <div className={styles["add-class-loading-container"]}>
          <MoonLoader color="#209bb6" />
        </div>
      </div>
    );
  }

  // if the request failed, show an error message
  if (teacherError) {
    return (
      <div className={styles["add-class-backdrop"]}>
        <div className={styles["add-class-loading-container"]}>
          <FullPageErrorDisplay refetch={makeTeacherRequest} />
        </div>
      </div>
    );
  }

  // map the teacher data to the form options
  const formOptions = teacher
    ? [
        {
          value: teacher._id,
          label: `${teacher.firstName} ${teacher.lastName}`,
        } as FormSelectOption,
      ]
    : teacherData.map(
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
