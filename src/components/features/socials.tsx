"use client";
import { SocialLink } from "../ui/SocialLink";
import { SOCIAL_LINKS } from "@/lib";
import { SoundCloudIcon, InstagramIcon, FacebookIcon, SpotifyIcon } from "../ui/SocialIcons";

export default function Socials() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center gap-4">
        <SocialLink href={SOCIAL_LINKS.soundcloud} ariaLabel="SoundCloud Profile">
          <SoundCloudIcon />
        </SocialLink>
        <SocialLink href={SOCIAL_LINKS.instagram} ariaLabel="Instagram Profile">
          <InstagramIcon />
        </SocialLink>
        <SocialLink href={SOCIAL_LINKS.facebook} ariaLabel="Facebook Profile">
          <FacebookIcon />
        </SocialLink>
        <SocialLink href={SOCIAL_LINKS.spotify} ariaLabel="Spotify Profile">
          <SpotifyIcon />
        </SocialLink>
      </div>
      <hr />
      <div className="flex items-center flex-col justify-center">
        <SocialLink
          href={`mailto:${SOCIAL_LINKS.email}`}
          className="text-lg 2xl:text-2xl md text-white md:hover:text-bubblegum"
          ariaLabel="Email Contact"
        >
          {SOCIAL_LINKS.email}
        </SocialLink>
        <SocialLink
          href={SOCIAL_LINKS.instagram}
          className="text-lg lg:text-lg 2xl:text-2xl text-white md:hover:text-bubblegum"
          ariaLabel="Instagram Handle"
        >
          {SOCIAL_LINKS.instagramHandle}
        </SocialLink>
      </div>
    </div>
  );
}