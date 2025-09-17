import TimeSlot from "@/components/dashboard/time-slot";
import { Button } from "@/components/ui/button";
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
        <Link href="/painter/availability/create">
          <Button className="bg-amber-600 hover:bg-amber-700 active:bg-amber-800 transition-colors">
            <PlusIcon /> Add Availability slot
          </Button>
        </Link>
      </header>
      <main className="py-8 px-2 md:px-20 mx-auto">
        <h2 className="font-serif text-2xl font-bold text-gray-800 w-fit mb-8">
          Time slots
        </h2>
        <div className="flex flex-wrap gap-8">
          {[1, 2, 3].map(t => (
            <TimeSlot
              key={t}
              start_time={new Date().toISOString()}
              end_time={new Date().toISOString()}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Availability;
