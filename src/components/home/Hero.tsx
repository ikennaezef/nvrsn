import { heroList } from "@/lib/data";
import Container from "../Container";
import Image from "next/image";
import Button from "../Button";

const brands = [
  "logo-tacee.png",
  "logo-spinbaad.png",
  "logo-ns.png",
  "logo-tmc.png",
];

const Hero = () => {
  return (
    <div className="bg-primary-dark rounded-b-4xl lg:rounded-b-[100px] overflow-hidden">
      <div
        style={{ backgroundImage: 'url("/images/hero-img.png")' }}
        className="relative rounded-b-4xl lg:rounded-b-[100px] overflow-hidden bg-cover bg-no-repeat min-h-150 py-16 flex items-center after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-linear-to-t after:from-black after:to-black/30"
      >
        <Container className="flex flex-col lg:flex-row items-center justify-between gap-8 text-white w-full h-full relative z-30">
          <div className="w-full lg:w-3/5 max-w-137.5 flex flex-col gap-4">
            <h2 className="text-4xl lg:text-6xl font-extrabold leading-tight font-heading">
              Premium Sound Management For Every Event
            </h2>
            <p>
              Professional DJ services, state-of-the-art sound systems, and
              expert technical management to make your event unforgettable.
            </p>
            <div className="flex items-center gap-6 mt-9">
              <Button href="#book">Book Now</Button>
              <Button href="#services" variant="secondary">
                View Services
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-2/5 flex flex-col gap-5">
            {heroList.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-5 max-w-md bg-white/5 border border-white/15 rounded-xl p-5"
              >
                <div className="bg-white/10 w-9 h-9 rounded-lg p-1 flex items-center justify-center">
                  <Image
                    src={`/icons/${item.icon}`}
                    alt={item.title}
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <h5 className="text-sm font-bold">{item.title}</h5>
                  <p className="text-xs text-white">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
      <div className="bg-primary-dark py-12">
        <Container className="flex items-center justify-between gap-6">
          <p className="text-white font-medium text-lg font-heading w-30">
            Brands That Trust Us:
          </p>
          <div className="flex w-full max-w-full justify-between items-center gap-8">
            {brands.map((brand) => (
              <img
                key={brand}
                src={`/images/${brand}`}
                alt={"Brand Logo"}
                className="max-h-12 w-auto shrink"
              />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Hero;
