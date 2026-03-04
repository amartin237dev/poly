import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProduct from "./components/FeaturedProduct";
import Testimonials from "./components/Testimonials";
import PerfumeReadings from "./components/PerfumeReadings";
import Newsletter from "./components/Newsletter";
import About from "./components/About";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-[family-name:var(--font-poppins)]">
      <Navbar />
      <Hero />
      <FeaturedProduct />
      <Testimonials />
      <PerfumeReadings />
      <Newsletter />
      <About />
    </div>
  );
}
