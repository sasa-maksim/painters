"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";

interface TimeSelectorFieldProps {
  legend: string;
  name: string;
  initialValue?: string;
}

const TimeSelectorField = ({
  legend,
  name,
  initialValue
}: TimeSelectorFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(date.getTime());
  const [defaultTimeString] = date.toTimeString().split(" ");

  useEffect(() => {
    if (initialValue) {
      const initialDate = new Date(initialValue);

      setDate(initialDate);
      setTime(initialDate.getTime());
    }
  }, [initialValue]);

  useEffect(() => {
    if (time) {
      date.setTime(time);
      setDate(new Date(date));
    }
  }, [time]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = date.toISOString();
    }
  }, [date]);

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredDate = event.target.valueAsDate;
    const currentDateTime = new Date(date.toDateString()).getTime();

    if (enteredDate) {
      const newDateTime = currentDateTime + enteredDate.getTime();
      if (date) setTime(newDateTime);
    }
  };

  return (
    <fieldset className="relative border rounded-sm pb-4">
      <legend className="absolute -top-[10px] left-3 px-2 bg-white text-sm capitalize font-mono">
        {legend}
      </legend>
      <div className="flex gap-4 mt-6 ml-4">
        <div className="flex flex-col gap-2 font-mono">
          <Label htmlFor="date-picker" className="px-1 text-start">
            Date
          </Label>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <input
              ref={inputRef}
              type="text"
              name={name}
              id={`${name}-date`}
              className="hidden"
            />
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker"
                className="w-32 justify-between font-normal"
              >
                {date ? date.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                className="w-64"
                selected={date}
                captionLayout="dropdown"
                onSelect={date => {
                  if (date) setDate(date);
                  setIsOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-2 font-mono">
          <Label htmlFor="time-picker" className="px-1 text-start">
            Time
          </Label>
          <Input
            type="time"
            id="time-picker"
            step="1"
            defaultValue={defaultTimeString}
            onChange={handleTimeChange}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default TimeSelectorField;
