import Container from "../Container";
import Button from "../Button";
import Image from "next/image";
import { about, usps } from "@/lib/data";

const About = () => {
  return (
    <section id="about" className="py-24">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-36">
          <div>
            <h2 className="font-bold mb-2">What We Do At NVRSN SOUNDS?</h2>
            <p className="font-heading text-4xl lg:text-5xl leading-tight font-bold">
              Shaping Event Experiences Through Sound.
            </p>
          </div>
          <div>
            <p>
              We don't just rent out sound systems; we engineer immersive sonic
              experiences. By combining elite hardware layouts with our internal
              professional tech crew, we eliminate the operational risks that
              ruin major events.
            </p>
            <div className="flex items-center justify-between gap-6 mt-10">
              <p>Let's handle your next event</p>
              <Button href="#book">Book Now</Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {about.map((item) => (
            <div
              key={item.stat}
              className="flex flex-col items-center justify-center text-center border border-neutral-200 rounded-xl h-60 shadow p-4"
            >
              <div className="bg-primary/10 w-17.5 h-17.5 rounded-full p-3 flex items-center justify-center mb-6">
                <Image
                  src={`/icons/${item.icon}`}
                  alt={item.text}
                  width={36}
                  height={36}
                />
              </div>
              <h5 className="text-3xl font-bold mb-2">{item.stat}</h5>
              <p className="text-lg text-gray-500">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="border border-neutral-200 rounded-xl shadow mt-12 p-6 lg:p-12">
          <h4 className="text-2xl font-heading font-bold mb-6">
            Why Choose Us?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {usps.map((item) => (
              <div key={item} className="flex items-center gap-4">
                <Image
                  src={"/icons/check.svg"}
                  alt="Check"
                  width={20}
                  height={20}
                />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
