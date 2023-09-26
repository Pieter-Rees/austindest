import { Title } from "./title";
import "./border.css";

export default function Listen() {
  return (
    <div id="listen">
      <div className="my-6 lg:mb-8 lg:mt-0">
        <Title right={true} subTitle="Listen" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-96 lg:h-auto">
          <div className="rounded-lg fancy-border overflow-hidden safari-fix ">
            <iframe
              className="h-full "
              title="soundcloud sets"
              width="100%"
              height="600px"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1412583274&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:gap-8">
          <div className="overflow-hidden rounded-lg fancy-border safari-fix">
            <iframe
              src="https://open.spotify.com/embed/artist/4i1SjBqGZ4lVlEgMfpKVjb?utm_source=generator&theme=0"
              width="100%"
              height="152"
              loading="lazy"
            ></iframe>
          </div>
          <div className="overflow-hidden rounded-lg fancy-border safari-fix">
            <iframe
              src="https://open.spotify.com/embed/track/6aV4L76qLqOXKWM2KDI1IU?utm_source=generator"
              width="100%"
              height="152"
              loading="lazy"
            ></iframe>
          </div>
          <div className="overflow-hidden rounded-lg fancy-border safari-fix">
            <iframe
              src="https://open.spotify.com/embed/track/21RfPY7y0nx5B0KuZm3k77?utm_source=generator"
              width="100%"
              height="152"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
