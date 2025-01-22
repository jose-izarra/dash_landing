
import { Hero } from "@/components/Hero";
export default function Home() {
  return (
    <div className="">
        <main className="cursor-none">
            <Hero />
        </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center fixed bottom-0 w-full p-4  text-gray-100 ">
        <div className="grid gap-3 grid-cols-3  place-items-stretch w-full ">
            <p className="font-semibold text-center text-xs sm:text-base">
                A theHouse creation
            </p>
            <p className="font-light text-center text-sm sm:text-lg">
                © 2025 DASH.
            </p>
            <p className="font-semibold text-center text-xs sm:text-base">
                Coming soon...
            </p>
        </div>
      </footer>
    </div>
  );
}
