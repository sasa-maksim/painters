import AvatarCard from "@/components/dashboard/avatar";
import LogoutButton from "@/components/dashboard/logout-button";
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
import { AccountType } from "@/types";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const Availability = () => {
  return (
    <>
      <header className="bg-white w-full px-2 py-2 sm:px-8 sm:py-8 flex gap-x-8 gap-y-4 justify-between items-center flex-wrap sticky top-0 mb-8 border-b">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 w-fit">
            My Availability
          </h1>
          <p className="font-sans text-gray-600 mt-1 w-fit">
            Manage your available time slots
          </p>
        </div>
        <AvatarCard accountType={AccountType.PAINTER} />
      </header>
      <main className="py-8 px-2 md:px-16 mx-auto">
        <h2 className="font-serif text-2xl font-bold text-gray-800 w-fit mb-4">
          Time slots
        </h2>
        <div className="flex mb-8">
          <Button
            asChild
            className="bg-amber-600 hover:bg-amber-700 active:bg-amber-800 transition-colors"
          >
            <Link href="/painter/create">
              <PlusIcon /> Add Availability slot
            </Link>
          </Button>
        </div>
        <div className="flex flex-wrap gap-8">
          {[1, 2, 3].map(t => (
            <TimeSlot
              key={t}
              id={t.toString()}
              start_time={new Date().toISOString()}
              end_time={new Date().toISOString()}
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

export default Availability;
