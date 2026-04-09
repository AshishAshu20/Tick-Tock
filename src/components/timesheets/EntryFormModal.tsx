import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { entrySchema } from "@/lib/validationSchemas";
import type { EntryFormValues } from "@/types";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Info, Lock } from "lucide-react";

const TYPE_OPTIONS = [
  "Bug fixes",
  "Feature development",
  "Code review",
  "Testing",
  "Documentation",
  "Meeting",
  "Other",
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => Promise<void | boolean>;
  initialValues?: EntryFormValues;
  defaultDate?: string;
  mode?: "add" | "edit";
}

const DEFAULTS: EntryFormValues = {
  projectName: "",
  typeOfWork: "",
  taskDescription: "",
  hours: 8,
  date: new Date().toISOString().split("T")[0],
};

const fmtLockedDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

const EntryFormModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  defaultDate,
  mode = "add",
}) => {
  const initial: EntryFormValues = initialValues || {
    ...DEFAULTS,
    date: defaultDate || DEFAULTS.date,
  };

  const dateLocked = mode === "add" && !!defaultDate;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "add" ? "Add New Entry" : "Edit Entry"}
    >
      <Formik
        initialValues={initial}
        validationSchema={entrySchema}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          await onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, values, setFieldValue, isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            {dateLocked && (
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg">
                <Lock size={12} className="text-blue-400 shrink-0" />
                <span className="text-sm text-blue-700 font-medium flex-1">
                  {fmtLockedDate(defaultDate!)}
                </span>
                <span className="text-xs text-blue-400">date locked</span>
              </div>
            )}

            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                Select Project <span className="text-red-500">*</span>
                <Info size={12} className="text-gray-400" />
              </label>
              <Field
                name="projectName"
                placeholder="Project Name"
                className={`input-base ${errors.projectName && touched.projectName ? "input-error" : ""}`}
                />
              <ErrorMessage name="projectName" component="p" className="mt-1 text-xs text-red-500" />
            </div>

            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                Type of Work <span className="text-red-500">*</span>
                <Info size={12} className="text-gray-400" />
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="typeOfWork"
                  className={`input-base appearance-none pr-8 ${errors.typeOfWork && touched.typeOfWork ? "input-error" : ""}`}
                >
                  <option value="">Select type…</option>
                  {TYPE_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </Field>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</div>
              </div>
              <ErrorMessage name="typeOfWork" component="p" className="mt-1 text-xs text-red-500" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Task description <span className="text-red-500">*</span>
              </label>
              <Field
                as="textarea"
                name="taskDescription"
                rows={4}
                placeholder="Write text here ..."
                className={`input-base resize-none ${errors.taskDescription && touched.taskDescription ? "input-error" : ""}`}/>
              <p className="text-xs text-gray-400 mt-0.5">A note for extra info</p>
              <ErrorMessage name="taskDescription" component="p" className="mt-0.5 text-xs text-red-500" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Hours <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setFieldValue("hours", Math.max(0.5, values.hours - 0.5))}
                  className="w-10 h-10 flex items-center justify-center rounded-l-lg border border-gray-300 text-gray-600 bg-gray-100 font-bold text-base hover:bg-gray-200 transition-colors"
                >−</button>
                <div className="w-12 h-10 text-center flex items-center justify-center text-sm font-semibold text-gray-800 border-t border-b border-gray-300">
                  {values.hours}
                </div>
                <button
                  type="button"
                  onClick={() => setFieldValue("hours", Math.min(24, values.hours + 0.5))}
                  className="w-10 h-10 flex items-center justify-center rounded-r-lg border border-gray-300 text-gray-600 bg-gray-100 font-bold text-base hover:bg-gray-200 transition-colors"
                >+</button>
              </div>
              <ErrorMessage name="hours" component="p" className="mt-1 text-xs text-red-500" />
            </div>

            {!dateLocked && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Date <span className="text-red-500">*</span>
                </label>
                <Field
                  type="date"
                  name="date"
                  className={`input-base ${errors.date && touched.date ? "input-error" : ""}`}/>
                <ErrorMessage name="date" component="p" className="mt-1 text-xs text-red-500" />
              </div>
            )}

            <div className="flex items-center gap-3 pt-1 border-t border-dashed border-blue-200 mt-1">
              <Button type="submit" loading={isSubmitting} className="flex-1 mt-3">
                {mode === "add" ? "Add entry" : "Save changes"}
              </Button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 text-sm text-gray-500 hover:text-gray-700 px-3 py-2 transition-colors"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EntryFormModal;
