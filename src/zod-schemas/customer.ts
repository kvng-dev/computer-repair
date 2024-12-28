import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schema";

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema) => schema.min(1, "First name is required"),
  lastName: (schema) => schema.min(1, "Last name is required"),
  address1: (schema) => schema.min(1, "Address is required"),
  city: (schema) => schema.min(10, "City is required"),
  state: (schema) => schema.min(2, "State is required"),
  email: (schema) => schema.email("Invalid email"),
  zip: (schema) =>
    schema.regex(
      /^\d{5}(-\d{4})?$/,
      "Invalid ZIP code. Format should be XXXXX or XXXXX-XXXX"
    ),
  phone: (schema) =>
    schema.regex(
      /^(\(\d{3}\) |\d{3}-)?\d{3}-\d{4}$/,
      "Invalid phone number. Format should be (XXX) XXX-XXXX or XXX-XXX-XXXX"
    ),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = typeof insertCustomerSchema._type;

export type selectCustomerSchemaType = typeof selectCustomerSchema._type;
