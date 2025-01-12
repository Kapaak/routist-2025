import Image, { StaticImageData } from "next/image";
import { PropsWithChildren } from "react";

interface HalfPageImageProps extends PropsWithChildren {
  image: StaticImageData | string;
  alt: string;
}

export const HalfPageImage = ({ image, alt, children }: HalfPageImageProps) => {
  return (
    <div className="flex h-full">
      <div className="relative hidden flex-1 before:absolute before:h-full before:w-full before:bg-gradient-to-r before:from-main-yellow before:to-main-orange before:opacity-50 before:content-[''] lg:block">
        <Image
          className="z-negative object-cover object-left"
          src={image}
          fill
          alt={alt}
        />
      </div>
      {children}
    </div>
  );
};
