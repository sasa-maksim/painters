import { Card } from "@/components/ui/card";
import { Calendar, Clock, UserCircle2, BadgeCheck } from "lucide-react";

interface BookingRequestCardProps {
  bookingId: string;
  painter: { id: string; name: string } | null;
  startTime: string;
  endTime: string;
  status: string;
}

const statusColors: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700"
};

export default function BookingRequestCard({
  bookingId,
  painter,
  startTime,
  endTime,
  status
}: BookingRequestCardProps) {
  const start = new Date(startTime);
  const end = new Date(endTime);

  return (
    <Card>
      <div className="flex items-center gap-3">
        <UserCircle2 className="w-8 h-8 text-blue-400" />
        <div>
          <div className="font-serif font-bold text-gray-900">
            {painter?.name || "Unassigned"}
          </div>
          <div className="text-xs text-gray-400">Painter</div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-700">
        <Calendar className="w-4 h-4" />
        <span className="font-sans text-sm">
          {start.toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric"
          })}
        </span>
      </div>
      <div className="flex items-center gap-2 text-gray-700">
        <Clock className="w-4 h-4" />
        <span className="font-sans text-sm">
          {start.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit"
          })}{" "}
          -{" "}
          {end.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit"
          })}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold capitalize ${
            statusColors[status] || "bg-gray-100 text-gray-700"
          }`}
        >
          <BadgeCheck className="w-4 h-4 mr-1" />
          {status}
        </span>
        <span className="ml-auto text-xs text-gray-400">
          ID: {bookingId.slice(0, 8)}…
        </span>
      </div>
    </Card>
  );
}
