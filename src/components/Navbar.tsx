"use client";

import { useState, useEffect } from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Button from "./Button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Rate Card", href: "/#rates" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={
        isScrolled ? "fixed top-0 left-0 right-0 z-50 shadow-xl h-25" : ""
      }
    >
      <header
        className={`bg-primary-dark w-full relative ${isScrolled ? "" : ""}`}
      >
        <Container className="flex flex-col justify-center h-25">
          <div className="flex items-center justify-between">
            <Link href={"/"}>
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={155}
                height={47}
              />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-white hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
              <Button href="#book">Book Now</Button>
            </nav>

            <button
              className="md:hidden text-white p-1"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </Container>

        {isMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 right-0 bg-primary-dark border-t border-white/10 z-40">
            <Container className="flex flex-col py-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-white py-3 border-b border-white/10 last:border-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </Container>
          </nav>
        )}
      </header>
    </div>
  );
};

export default Navbar;
