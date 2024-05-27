import Image from "next/image";

export const NextImage = ({
  attribute,
}: {
  attribute: Record<string, string>;
}) => {
  return (
    <Image
      loading="lazy"
      priority={false}
      src={attribute.src}
      alt={attribute.alt}
      {...attribute}
    />
  );
};
