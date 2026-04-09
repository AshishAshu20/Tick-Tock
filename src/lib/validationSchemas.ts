import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
  rememberMe: Yup.boolean(),
});

export const entrySchema = Yup.object({
  projectName: Yup.string().trim().min(2, "Min 2 characters").max(100).required("Project name is required"),
  typeOfWork: Yup.string()
    .oneOf(["Bug fixes","Feature development","Code review","Testing","Documentation","Meeting","Other"])
    .required("Type of work is required"),
  taskDescription: Yup.string().trim().min(5, "Min 5 characters").max(500).required("Description is required"),
  hours: Yup.number().min(0.5, "Minimum 0.5 hrs").max(24, "Maximum 24 hrs").required("Hours required"),
  date: Yup.string().required("Date is required"),
});
