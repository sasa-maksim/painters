import { ClockIcon, EditIcon, Trash2Icon } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { formatDate, intervalToDuration } from "date-fns";

interface TimeSlotProps {
  start_time: string;
  end_time: string;
}

const TimeSlot = ({ start_time, end_time }: TimeSlotProps) => {
  const startDate = new Date(start_time);
  const endDate = new Date(end_time);
  endDate.setHours(endDate.getHours() + 15);

  const duration = intervalToDuration({ start: startDate, end: endDate });

  return (
    <Card className="w-full sm:w-fit">
      <CardContent className="w-fit pb-0">
        <div className="flex items-center gap-x-3">
          <div className="bg-amber-100 rounded-b-lg px-2 py-3 text-center">
            <small className="font-sans text-xs text-amber-600 font-medium uppercase">
              {formatDate(startDate, "EEEE")}
            </small>
            <div className="font-serif text-lg font-bold text-amber-700">
              {formatDate(startDate, "dd")}
            </div>
            <div className="font-sans text-xs text-amber-600">September</div>
          </div>
          <div>
            <h3 className="font-serif font-semibold text-gray-900">
              {formatDate(startDate, "do MM yyyy")}
            </h3>
            <div className="flex items-center text-gray-600 mt-1">
              <ClockIcon className="w-3 h-3 mr-1" />
              <span className="font-sans text-sm">
                {formatDate(startDate, "hh:mm a")} &ndash;{" "}
                {formatDate(endDate, "hh:mm a")}
              </span>
            </div>
            <p className="inline-flex mt-2 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {duration.hours} hours
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" className="shadow-none">
          <EditIcon />
        </Button>
        <Button variant="outline" size="sm" className="shadow-none">
          <Trash2Icon />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TimeSlot;
