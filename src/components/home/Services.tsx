import React from "react";
import Container from "../Container";
import { services } from "@/lib/data";
import Image from "next/image";

const Services = () => {
  return (
    <section id="services" className="py-24">
      <Container>
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold font-heading mb-1">Our Services</h2>
          <p className="font-medium text-gray-500">
            Comprehensive audio solutions tailored to your event needs
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col items-start justify-center border border-neutral-200 rounded-xl shadow p-10"
            >
              <div className="mb-10">
                <div className="bg-primary/10 w-17.5 h-17.5 rounded-2xl p-3 flex items-center justify-center mb-7">
                  <Image
                    src={`/icons/${service.icon}`}
                    alt={service.title}
                    width={36}
                    height={36}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
              <ul className="space-y-2 list-disc pl-4">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Services;
