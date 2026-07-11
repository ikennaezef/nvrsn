import Container from "./Container";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-primary-dark">
      <Container className="flex flex-col lg:flex-row space-x-10 pt-15 pb-25 text-white gap-10">
        <div className="w-full lg:w-1/4">
          <Link href={"/#"}>
            <Image src="/images/logo.png" alt="Logo" width={155} height={47} />
          </Link>
        </div>
        <div className="w-full lg:w-[30%] grid grid-cols-2 gap-0 lg:gap-4">
          <div>
            <h6 className="text-lg font-heading font-bold mb-4">Quick Links</h6>
            <div className="flex flex-col gap-2">
              <Link href="/#about" className="hover:underline">
                About Us
              </Link>
              <Link href="/#services" className="hover:underline">
                Services
              </Link>
              <Link href="/#rate" className="hover:underline">
                Rate Card
              </Link>
            </div>
          </div>
          <div>
            <h6 className="text-lg font-heading font-bold mb-4">
              Contact Info
            </h6>
            <div className="flex flex-col gap-2">
              <Link
                href="tel:+2349031975387"
                className="inline-flex items-center gap-2 hover:underline"
              >
                <img src="/icons/phone.svg" alt="Phone" />
                +2349031975387
              </Link>
              <Link
                href="mailto:nvrsnsounds@gmail.com"
                className="inline-flex items-center gap-2 hover:underline"
              >
                <img src="/icons/mail.svg" alt="Email" />
                nvrsnsounds@gmail.com
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[30%]">
          <h6 className="text-lg font-heading font-bold mb-4">Follow Us</h6>
          <div className="flex items-center gap-5">
            <div className="flex items-center justify-center w-10.5 h-10.5 rounded-lg p-2 bg-primary/15">
              <img src="/icons/instagram.svg" alt="Instagram" className="" />
            </div>
            <div className="flex items-center justify-center w-10.5 h-10.5 rounded-lg p-2 bg-primary/15">
              <img src="/icons/tiktok.svg" alt="Tiktok" className="" />
            </div>
            <div className="flex items-center justify-center w-10.5 h-10.5 rounded-lg p-2 bg-primary/15">
              <img src="/icons/whatsapp.svg" alt="Whatsapp" className="" />
            </div>
          </div>
        </div>
      </Container>
      <div className="border-t border-t-white/60 py-6 px-4">
        <p className="text-neutral-300 text-sm text-center">
          © {new Date().getFullYear()} NVRSN SOUNDS. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
