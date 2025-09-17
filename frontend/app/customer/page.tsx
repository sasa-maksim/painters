import TimeSlot from "@/components/dashboard/time-slot";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import BookingRequestCard from "./components/booking-request";

const BookingRequests = () => {
  return (
    <>
      <header className="bg-white w-full px-2 py-2 sm:px-8 sm:py-8 flex gap-x-8 gap-y-4 justify-between items-center flex-wrap sticky top-0 mb-8 border-b">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 w-fit">
            My Booking Requests
          </h1>
          <p className="font-sans text-gray-600 mt-1 w-fit">
            Manage your booking requests
          </p>
        </div>
        <Button
          asChild
          className="bg-green-600 hover:bg-green-700 active:bg-green-800 transition-colors"
        >
          <Link href="/painter/availability/create">
            <PlusIcon /> Make a new request
          </Link>
        </Button>
      </header>
      <main className="py-8 px-2 md:px-16 mx-auto">
        <h2 className="font-serif text-2xl font-bold text-gray-800 w-fit mb-8">
          Requests
        </h2>
        <div className="flex flex-wrap gap-8">
          {[1, 2, 3].map(t => (
            <BookingRequestCard
              key={t}
              id={`booking_${t}`}
              painter={{ id: `painter_${t}`, name: `Painter ${t}` }}
              startTime={new Date().toISOString()}
              endTime={new Date().toISOString()}
              status="pending"
            />
          ))}
        </div>
        <div className="my-8">
          <Pagination className="sm:justify-start">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </>
  );
};

export default BookingRequests;
