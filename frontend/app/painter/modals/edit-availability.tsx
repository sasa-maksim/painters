"use client";

import AvailabilityForm from "@/components/dashboard/availability-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { EditIcon } from "lucide-react";
import { useRef } from "react";

interface EditAvailabilityModalProps {
  startDate: Date;
  endDate: Date;
}

export function EditAvailabilityModal({
  startDate,
  endDate
}: EditAvailabilityModalProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const triggerFormSubmit = () => {
    formRef.current?.submit();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="shadow-none">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Availability</DialogTitle>
          <DialogDescription>
            Make changes to your availability. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <AvailabilityForm
          ref={formRef}
          initialEndTime={startDate.toISOString()}
          initialStartTime={endDate.toISOString()}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={triggerFormSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
