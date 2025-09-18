"use client";

import { useRouter } from "next/navigation";
import { forwardRef, useActionState, useEffect } from "react";
import { LoaderIcon, XCircleIcon } from "lucide-react";
import { bookSlot } from "@/app/customer/create/action";
import { Button } from "../ui/button";
import TimeSelectorField from "../form/time-selector-field";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface RequestFormProps {
  initialStartTime?: string;
  initialEndTime?: string;
  onModalClose?: () => void;
}

const RequestForm = forwardRef<HTMLFormElement, RequestFormProps>(function (
  { initialStartTime, initialEndTime, onModalClose }: RequestFormProps,
  ref
) {
  const router = useRouter();
  const [state, action, pending] = useActionState(bookSlot, undefined);

  useEffect(() => {
    if (state?.status === "success") {
      if (onModalClose) {
        onModalClose();
      } else {
        setTimeout(() => {
          router.push("/customer?created=true");
        }, 2000);
      }
    }
  }, [state]);

  return (
    <>
      {state?.message && state?.status === "success" && (
        <Alert
          variant="default"
          className="mb-6 border border-blue-200 bg-blue-100"
        >
          <AlertTitle className="text-blue-800 text-start leading-normal">
            {state.message}
          </AlertTitle>
        </Alert>
      )}
      {state?.message && state?.status === "error" && (
        <Alert variant="destructive" className="mb-6">
          <XCircleIcon />
          <AlertTitle>Failed to book slot!</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <form className="space-y-4" ref={ref} action={action}>
        <TimeSelectorField
          name="startTime"
          legend="Start time"
          initialValue={initialStartTime}
          errors={state?.errors?.startTime || []}
        />
        <TimeSelectorField
          name="endTime"
          legend="End time"
          initialValue={initialEndTime}
          errors={state?.errors?.endTime || []}
        />
        {initialStartTime || initialEndTime ? (
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onModalClose?.()}
            >
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </div>
        ) : (
          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800"
          >
            {pending && <LoaderIcon />} Book slot
          </Button>
        )}
      </form>
    </>
  );
});

export default RequestForm;
