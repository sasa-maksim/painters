import { axiosInstance } from "@/app/lib/axios-instance";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RequestSlotsStatus } from "@/types";
import { revalidatePath } from "next/cache";

interface CancelRequestModalProps {
  id: string;
  status: RequestSlotsStatus;
}

export function CancelRequestModal({ id, status }: CancelRequestModalProps) {
  const confirmCancel = async () => {
    "use server";
    const { cookies } = await import("next/headers");

    const cks = await cookies();
    const token = cks.get("session");

    await axiosInstance.delete(`/booking-requests/${id}`, {
      headers: { Authorization: `Bearer ${token?.value}` }
    });

    revalidatePath("/customer");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {status !== RequestSlotsStatus.CANCELLED && (
          <Button variant="outline" size="sm" className="shadow-none">
            Cancel Request
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            The painter might not be available another time
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction onClick={confirmCancel} color="destructive">
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
