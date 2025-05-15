import { z } from "zod";

export const addFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name must not exceed 30 characters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name must not exceed 30 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),

 mobile: z
  .string()
  .trim()
  .regex(/^[0-9]+$/, "Must contain only numbers (0-9)") // Blocks text early
  .length(10, "Mobile number must be exactly 10 digits")
  .min(1, "Mobile number is required"), // Fallback (unlikely to trigger)

  type: z
    .enum(["regular", "new"], {
      errorMap: () => ({ message: "Type must be either 'regular' or 'new'" }),
    }),

  town: z
    .string()
    .min(1, "Town is required")
    .min(2, "Town must be at least 2 characters")
    .max(30, "Town must not exceed 30 characters"),

  city: z
    .string()
    .min(1, "City is required")
    .min(2, "City must be at least 2 characters")
    .max(30, "City must not exceed 30 characters"),

  state: z
    .string()
    .min(1, "State is required")
    .min(2, "State must be at least 2 characters")
    .max(30, "State must not exceed 30 characters"),

  country: z
    .string()
    .min(1, "Country is required")
    .min(2, "Country must be at least 2 characters")
    .max(30, "Country must not exceed 30 characters"),

  pincode: z
    .string()
    .min(1, "Pincode is required")
    .regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),

  address: z
    .string()
    .min(1, "Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must not exceed 100 characters"),

  salary: z
    .enum(["0 to 25 k", "25 to 50 k", "50 to 75 k", "75 to 100 k"], {
      errorMap: () => ({
        message:
          "Salary must be one of: '0 to 25 k', '25 to 50 k', '50 to 75 k', '75 to 100 k'",
      }),
    }),
});
