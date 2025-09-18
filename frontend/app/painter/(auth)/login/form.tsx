"use client";

import { useActionState, useEffect } from "react";
import PasswordField from "@/components/form/password-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "./action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoaderIcon, XCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const PainterLoginForm = () => {
  const router = useRouter();
  const [state, action, pending] = useActionState(login, undefined);

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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
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
          {pending && <LoaderIcon />} Sign in
        </Button>
      </form>
    </>
  );
};

export default PainterLoginForm;
