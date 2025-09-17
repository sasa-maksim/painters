import TimeSelectorField from "../form/time-selector-field";
import { Button } from "../ui/button";

const AvailabilityForm = () => {
  return (
    <form className="space-y-4">
      <TimeSelectorField name="start_time" legend="Start time" />
      <TimeSelectorField name="end_time" legend="End time" />
      <Button type="submit" className="w-full">
        Add Availability
      </Button>
    </form>
  );
};

export default AvailabilityForm;
