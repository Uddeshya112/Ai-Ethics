import Image from "next/image";
import { automotiveImages, type AutomotiveImageKey } from "@/lib/automotive-images";

type EditorialImageProps = {
  asset: AutomotiveImageKey;
  caption: string;
  className?: string;
};

export default function EditorialImage({ asset, caption, className = "" }: EditorialImageProps) {
  const image = automotiveImages[asset];

  return (
    <figure className={`editorial-image ${className}`}>
      <div className="editorial-image-frame">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 680px) calc(100vw - 36px), (max-width: 1236px) calc(100vw - 56px), 1180px"
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
