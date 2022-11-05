import * as yup from "yup";

const validationsForm = {
  projectName: yup.string().required("This field is required"),
  projectShortDesc: yup
    .string()
    .required("This field is required")
    .min(5, "Must be at least 5 characters")
    .max(40, "Must be 40 characters or less"),
  uni: yup.string().required("University is required"),
  location: yup.string().required("Location is required"),
  position: yup
    .string()
    .required("Position is required")
    .min(5, "Must be at least 5 characters")
    .max(30, "Must be 30 characters or less"),
  skill: yup
    .string()
    .required("Skill is required")
    .min(5, "Must be at least 5 characters")
    .max(20, "Must be 20 characters or less"),
  desc: yup.string().min(10, "Must be exactly 10 digits").required("Required"),
};

export default validationsForm;
