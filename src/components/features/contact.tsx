import { SectionHeader } from "../ui/SectionHeader";
import { SocialLink } from "../ui/SocialLink";
import { SOCIAL_LINKS } from "@/lib";

export default function Contact() {
  return (
    <div>
      <SectionHeader subTitle="Contact & Bookings" center={true} />

      <div className="text-center">
        <div>
          <SocialLink
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="text-lg lg:text-lg 2xl:text-2xl text-white md:hover:text-bubblegum"
            ariaLabel="Email Contact"
          >
            {SOCIAL_LINKS.email}
          </SocialLink>
        </div>
        <div>
          <SocialLink
            href={SOCIAL_LINKS.instagram}
            className="text-lg lg:text-lg 2xl:text-2xl text-white md:hover:text-bubblegum"
            ariaLabel="Instagram Handle"
          >
            {SOCIAL_LINKS.instagramHandle}
          </SocialLink>
        </div>
      </div>
    </div>
  );
}
