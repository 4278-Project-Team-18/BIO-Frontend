import * as yup from "yup";

export const matchVolunteerSchema = yup.object().shape({
  volunteerId: yup.string().required(),
  studentIds: yup.array().of(yup.string()).required(),
  teacherId: yup.string().required(),
  classId: yup.string().required(),
});
