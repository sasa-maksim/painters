"use client";

import { useActionState, useEffect } from "react";
import { LoaderIcon, XCircleIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PasswordField from "@/components/form/password-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AccountType } from "@/app/types";
import { login } from "@/app/actions/login";

const LoginForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [state, action, pending] = useActionState(login, undefined);
  const accountType = pathname.startsWith("/customer")
    ? AccountType.CUSTOMER
    : AccountType.PAINTER;

  useEffect(() => {
    if (state?.status === "success") {
      router.push(`/${accountType.toLowerCase()}`);
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
          <input
            type="text"
            name="accountType"
            defaultValue={accountType}
            hidden
          />
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

export default LoginForm;
