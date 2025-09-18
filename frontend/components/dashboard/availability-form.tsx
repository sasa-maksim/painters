import { forwardRef } from "react";
import TimeSelectorField from "../form/time-selector-field";
import { Button } from "../ui/button";

interface AvailabilityFormProps {
  initialStartTime?: string;
  initialEndTime?: string;
}

const AvailabilityForm = forwardRef<HTMLFormElement, AvailabilityFormProps>(
  function ({ initialStartTime, initialEndTime }: AvailabilityFormProps, ref) {
    return (
      <form className="space-y-4" ref={ref}>
        <TimeSelectorField
          name="start_time"
          legend="Start time"
          initialValue={initialStartTime}
        />
        <TimeSelectorField
          name="end_time"
          legend="End time"
          initialValue={initialEndTime}
        />
        {initialStartTime || initialEndTime ? null : (
          <Button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 active:bg-amber-800"
          >
            Add Availability
          </Button>
        )}
      </form>
    );
  }
);

export default AvailabilityForm;
