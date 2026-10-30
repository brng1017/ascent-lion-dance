import { Arrow } from '@/components/arrow';
import { Brand } from "./site-header";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { getHomePage } from "@/sanity/content";
import { homeDefaults } from "@/sanity/home-defaults";

export async function SiteFooter() {
  const content = await getHomePage();
  const home = {
    bookingUrl: siteConfig.bookingUrl,
    email: content?.email ?? homeDefaults.email,
    phone: content?.phone ?? homeDefaults.phone,
    instagramUrl: content?.instagramUrl ?? homeDefaults.instagramUrl,
  };
  return (
    <footer className="mt-auto border-t border-white/10 bg-ink px-6 pt-12 pb-7 lg:px-10">
      <div className="mx-auto flex max-w-312 flex-col justify-between gap-10 pb-10 md:flex-row">
        <div>
          <Brand />
          <p className="mt-2 max-w-62.5 text-xs leading-6 text-white/45">
            Denver, Colorado.
          </p>
        </div>
        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-2 gap-x-12 gap-y-4 text-xs text-white/70 sm:gap-x-20"
        >
          <Link href="/about" className="hover:text-gold">
            Our story
          </Link>
          <Link href="/services" className="hover:text-gold">
            Our services
          </Link>
          <Link href="/join" className="hover:text-gold">
            Join the team
          </Link>
          <a href={home.bookingUrl} className="hover:text-gold">
            {siteConfig.bookingLabel}
          </a>
        </nav>
        <div className="space-y-3 text-xs text-white/70">
          <a className="block hover:text-gold" href={`mailto:${home.email}`}>
            {home.email}
          </a>
          <a
            className="block hover:text-gold"
            href={`tel:${home.phone.replace(/[^\d+]/g, "")}`}
          >
            {home.phone}
          </a>
          <a
            className="inline-flex items-center gap-2 text-gold"
            href={home.instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram aria-hidden="true" className="size-4 shrink-0" />
            Follow the journey{" "}
            <Arrow diagonal />
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-312 flex-wrap justify-between gap-3 border-t border-white/10 pt-6 text-[9px] tracking-wide text-white/35">
        <p>© Ascent Lion Dance Association. All rights reserved.</p>
        <p>Tradition. Community. Celebration.</p>
      </div>
    </footer>
  );
}
