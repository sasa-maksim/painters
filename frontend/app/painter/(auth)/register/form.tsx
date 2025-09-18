"use client";

import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import PasswordField from "@/components/form/password-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { dataSender } from "@/utils/data-sender";
import { LoaderIcon, XCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useActionState, useEffect } from "react";
import { register } from "./action";

const PainterRegisterForm = () => {
  const router = useRouter();
  const [state, action, pending] = useActionState(register, undefined);

  useEffect(() => {
    if (state?.status === "success") {
      setTimeout(() => {
        router.push("/painter");
      }, 1000);
    }
  }, [state]);

  return (
    <>
      {state?.message && state?.status === "error" && (
        <Alert variant="destructive" className="mb-6">
          <XCircleIcon />
          <AlertTitle>Login Failed!</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <form action={action}>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col items-start space-y-2 font-mono">
            <Label htmlFor="first_name">First name</Label>
            <Input
              id="first_name"
              name="firstName"
              type="text"
              placeholder="John"
              required
            />
            {state?.errors?.firstName && (
              <small className="text-red-500 text-start">
                {state.errors.firstName}
              </small>
            )}
          </div>
          <div className="flex flex-col items-start space-y-2 font-mono">
            <Label htmlFor="last_name">Last name</Label>
            <Input
              id="last_name"
              name="lastName"
              type="text"
              placeholder="John"
              required
            />
            {state?.errors?.lastName && (
              <small className="text-red-500 text-start">
                {state.errors.lastName}
              </small>
            )}
          </div>
          <div className="flex flex-col items-start space-y-2 font-mono">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
            />
            {state?.errors?.email && (
              <small className="text-red-500 text-start">
                {state.errors.email}
              </small>
            )}
          </div>
          <PasswordField errors={state?.errors?.password || []} />
        </div>
        <Button className="w-full mt-6" disabled={pending}>
          {pending && <LoaderIcon />} Sign up
        </Button>
      </form>
    </>
  );
};

export default PainterRegisterForm;
