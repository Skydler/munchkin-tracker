import { LucideIcon } from "lucide-react";
import { useState } from "react";
import useSound from "use-sound";

type SoundEffectButtonProps = {
  soundFile: string;
  title: string;
  Icon: LucideIcon;
  animation?: string;
};
export default function SoundEffectButton({
  soundFile,
  title,
  Icon,
  animation = "animate-spin",
}: SoundEffectButtonProps) {
  const [playingSound, setPlayingSound] = useState(false);
  const [playActive, { stop }] = useSound(soundFile);

  return (
    <button
      className="btn btn-primary btn-block btn-lg"
      onMouseDown={() => {
        playActive();
        setPlayingSound(true);
      }}
      onMouseUp={() => {
        stop();
        setPlayingSound(false);
      }}
      onTouchStart={() => {
        playActive();
        setPlayingSound(true);
      }}
      onTouchEnd={() => {
        stop();
        setPlayingSound(false);
      }}
    >
      <Icon className={`${!playingSound && "invisible"} ${animation}`} />
      <span className="mx-1">{title}</span>
      <Icon className={`${!playingSound && "invisible"} ${animation}`} />
    </button>
  );
}
