import React from "react";
import Container from "../Container";
import { testimonials } from "@/lib/data";
import Image from "next/image";

const Testimonials = () => {
  return (
    <section className="py-24">
      <Container>
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold font-heading mb-1">
            What Our Clients Say
          </h2>
          <p className="font-medium text-gray-500">
            Comprehensive audio solutions tailored to your event needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col items-start justify-center gap-4 border border-neutral-200 rounded-xl shadow px-7 py-10"
            >
              <Image
                src="/icons/quote-up.svg"
                alt="Quote"
                width={32}
                height={32}
              />
              <p className="text-gray-600 text-sm">{testimonial.text}</p>
              <div className="flex items-center gap-2">
                <Image
                  src="/images/avatar.png"
                  alt="Testimonial"
                  width={32}
                  height={32}
                  className="object-cover"
                />
                <div className="">
                  <h4 className="font-bold text-xs">{testimonial.name}</h4>
                  <p className="text-gray-500 text-[10px]">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
