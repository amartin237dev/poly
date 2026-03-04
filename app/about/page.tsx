import Navbar from "../components/Navbar";
import About from "../components/About";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-[family-name:var(--font-poppins)]">
      <Navbar variant="dark" />
      <main className="pt-[72px]">
        <About />
      </main>
    </div>
  );
}
