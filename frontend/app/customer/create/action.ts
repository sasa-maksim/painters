"use server";

import { axiosInstance } from "@/app/lib/axios-instance";
import { isAxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

const RequestFormSchema = z.object({
  startTime: z.string().nonempty("Start time is required").trim(),
  endTime: z.string().nonempty("End time is required").trim()
});

type FormState =
  | {
      errors?: {
        startTime?: string[];
        endTime?: string[];
      };
      message?: string;
      status?: string;
    }
  | undefined;

export async function bookSlot(_: FormState, formData: FormData) {
  const startTime = formData.get("startTime");
  const endTime = formData.get("endTime");
  const cks = await cookies();
  const token = cks.get("session");

  const validatedFields = RequestFormSchema.safeParse({
    startTime,
    endTime
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await axiosInstance.post(
      "/booking-requests",
      { startTime, endTime },
      {
        headers: { Authorization: `Bearer ${token?.value}` }
      }
    );

    revalidatePath("/customer");

    return { message: "Request added successful!", status: "success" };
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response?.data?.message) {
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
