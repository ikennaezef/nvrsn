import About from "@/components/home/About";
import Book from "@/components/home/Book";
import Hero from "@/components/home/Hero";
import Rates from "@/components/home/Rates";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col font-sans">
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Rates />
      <Book />
    </div>
  );
}
