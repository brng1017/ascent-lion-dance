import { Brand } from "./site-header";
import { getHomePage } from "@/sanity/content";
import { homeDefaults } from "@/sanity/home-defaults";

export async function SiteFooter() {
  const content = await getHomePage();
  const home = {
    bookingUrl: content?.bookingUrl ?? homeDefaults.bookingUrl,
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
          <a href="/#about" className="hover:text-gold">
            Our story
          </a>
          <a href="/#services" className="hover:text-gold">
            Our services
          </a>
          <a href="/#community" className="hover:text-gold">
            Join the team
          </a>
          <a href={home.bookingUrl} className="hover:text-gold">
            Book a show
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
            Follow the journey{" "}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-3"
            >
              <path d="M6 18 18 6M6 6h12v12" />
            </svg>
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
