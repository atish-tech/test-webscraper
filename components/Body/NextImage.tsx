import Image from "next/image";

interface NextImageProps {
  attributes: Record<string, any>;
  Priority: boolean;
}

export const NextImage = ({ attributes, Priority }: NextImageProps) => {
  let alt;

  if (attributes.hasOwnProperty("alt") && attributes?.alt?.length > 1) {
    alt = attributes.alt;
  } else {
    alt = "Image description";
  }

  if (
    !attributes.hasOwnProperty("width") &&
    !attributes.hasOwnProperty("height")
  ) {
    attributes.layout = "responsive";
    attributes.objectFit = "cover";
    attributes.sizes =
      "(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, (max-width: 1536px) 100vw, 1000px";
  }

  if (attributes?.height == 266 || attributes?.width == 400) {
    Priority = true;
  }

  enum LoadingType {
    Eager = "eager",
    Lazy = "lazy",
  }
  let Loading: LoadingType = LoadingType.Lazy;
  if (Priority) {
    Loading = LoadingType.Eager;
  }

  return (
    <Image
      loading={"eager"}
      src={attributes.src}
      alt={alt}
      {...attributes}
      width={parseInt(attributes.width) || 20}
      height={parseInt(attributes.height) || 20}
      // placeholder="blur"
      // blurDataURL={
      //   "https://blog.cloudflare.com/content/images/2021/09/image3-16.png"
      // }
      priority={Priority}
    />
  );
};
