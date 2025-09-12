import { SectionHeader } from "../ui/SectionHeader";
import { EmbedContainer } from "../ui/EmbedContainer";
import { LazyIframe } from "../ui/LazyIframe";
import { SPOTIFY_EMBEDS, SOUNDCLOUD_EMBED } from "@/lib";
import "@/styles/border.css";

export default function Listen() {
  return (
    <div>
      <SectionHeader right={true} subTitle="Listen" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-96 lg:h-auto">
          <EmbedContainer height="600px">
            <LazyIframe
              src={SOUNDCLOUD_EMBED}
              title="soundcloud sets"
              width="100%"
              height="600px"
            />
          </EmbedContainer>
        </div>

        <div className="flex flex-col gap-4 lg:gap-8">
          <EmbedContainer>
            <LazyIframe
              src={SPOTIFY_EMBEDS.artist}
              title="Spotify Artist"
              width="100%"
              height="152"
            />
          </EmbedContainer>
          <EmbedContainer>
            <LazyIframe
              src={SPOTIFY_EMBEDS.track1}
              title="Spotify Track 1"
              width="100%"
              height="152"
            />
          </EmbedContainer>
          <EmbedContainer>
            <LazyIframe
              src={SPOTIFY_EMBEDS.track2}
              title="Spotify Track 2"
              width="100%"
              height="152"
            />
          </EmbedContainer>
        </div>
      </div>
    </div>
  );
}
