import Navbar from "../components/Navbar";
import PerfumeReadings from "../components/PerfumeReadings";

export default function ReadingsPage() {
  return (
    <div className="min-h-screen bg-background font-[family-name:var(--font-poppins)]">
      <Navbar variant="dark" />
      <main className="pt-[72px]">
        <PerfumeReadings />
      </main>
    </div>
  );
}
