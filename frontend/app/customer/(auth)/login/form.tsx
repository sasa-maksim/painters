"use client";

import PasswordField from "@/components/form/password-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { login } from "./action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoaderIcon, XCircleIcon } from "lucide-react";

const CustomerLoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, action, pending] = useActionState(login, undefined);

  useEffect(() => {
    if (state?.status === "success") {
      router.push("/customer");
    }
  }, [state]);

  return (
    <>
      {searchParams.get("success") === "true" && (
        <Alert
          variant="default"
          className="mb-6 border border-blue-200 bg-blue-100"
        >
          <AlertTitle className="text-blue-800 text-start leading-normal">
            Account created successfully! Login to continue
          </AlertTitle>
        </Alert>
      )}
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
              name="email"
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

export default CustomerLoginForm;
