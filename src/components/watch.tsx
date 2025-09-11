import { Title } from "./ui/Title";
import { VideoPlayer } from "./ui/VideoPlayer";

export default function Watch() {
  return (
    <div className="w-full space-y-8">
      <div className="my-6 lg:mb-8 lg:mt-0">
        <Title subtitle="Watch" align="left" size="lg" />
      </div>
      <div className="overflow-hidden rounded-lg border border-border">
        <VideoPlayer
          src="https://youtu.be/3DWK8802N00?t=2546"
          width="100%"
          height="500px"
        />
      </div>
    </div>
  );
}
