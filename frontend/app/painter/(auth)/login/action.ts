import { axiosInstance } from "@/lib/axios-instance";
import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .trim()
});

type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
      status?: string;
    }
  | undefined;

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  formData.append("accountType", "PAINTER");
  const payload = Object.fromEntries(formData.entries());

  try {
    await axiosInstance.post("/auth/login", payload);

    return { message: "Registration successful!", status: "success" };
  } catch (error: any) {
    if (error.response?.data?.message) {
      return {
        message: error.response.data.message,
        status: "error"
      };
    }

    return {
      message: "An unexpected error occurred. Please try again.",
      status: "error"
    };
  }
}
