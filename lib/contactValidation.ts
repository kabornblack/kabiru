/** Client-side validation shared by the Contact form and the exit-intent form. */

export type ContactField = "name" | "email" | "subject" | "message";
export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Checks `fields` (all required) and returns one message per invalid field. */
export const validateContact = (
  data: FormData,
  fields: readonly ContactField[],
): ContactErrors => {
  const value = (field: ContactField) => String(data.get(field) || "").trim();
  const errors: ContactErrors = {};

  if (fields.includes("name") && !value("name")) {
    errors.name = "Please enter your name.";
  }
  if (fields.includes("email")) {
    if (!value("email")) errors.email = "Please enter your email address.";
    else if (!EMAIL_PATTERN.test(value("email")))
      errors.email = "Please enter a valid email address.";
  }
  if (fields.includes("subject") && !value("subject")) {
    errors.subject = "Please add a subject.";
  }
  if (fields.includes("message") && !value("message")) {
    errors.message = "Please write a message.";
  }

  return errors;
};
