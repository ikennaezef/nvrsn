import { packageNotes, packages } from "@/lib/data";
import Container from "../Container";
import Button from "../Button";

const Rates = () => {
  return (
    <section id="rates" className="py-32">
      <Container>
        <div className="flex flex-col items-center mb-8 text-center">
          <h2 className="text-4xl font-bold font-heading mb-1">
            Our Rate Card
          </h2>
          <p className="font-medium text-gray-500">
            Flexible packages designed to fit your event and budget. Our prices
            are not final, and are slightly negotiable.
          </p>
          <div className="flex items-center gap-4 h-16 bg-primary/40 rounded-full p-5 mt-4">
            <Button>DJ + Sound Setup</Button>
            <Button variant="tertiary">Sound Setup</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {packages.map((pack) => (
            <div
              key={pack.id}
              className="flex flex-col items-start justify-start gap-4 border border-neutral-200 rounded-xl shadow p-5"
            >
              <h3 className="font-heading font-bold mb-2">{pack.name}</h3>
              <div className="flex items-center mb-2">
                <p className="text-3xl font-medium">{pack.price}</p>
                <p className="text-xs text-gray-500">{pack.priceSuffix}</p>
              </div>

              <p className="text-gray-500 text-[10px] mb-4">
                {pack.description}
              </p>
              <ul className="mb-6 space-y-2">
                {pack.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm gap-2">
                    <span className="">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="secondary"
                href="#book"
                className="w-full text-primary mt-auto"
              >
                {pack.cta}
              </Button>
            </div>
          ))}
        </div>
        <div className="bg-primary text-white mt-4 p-7 rounded-xl">
          <p className="text-xl font-semibold font-heading mb-4">Note:</p>
          <ul className="space-y-2 list-disc text-sm px-5">
            {packageNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default Rates;
