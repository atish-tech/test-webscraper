import Image from "next/image";

export function ImgJsx(imgs: NodeListOf<HTMLImageElement>, title: string) {
  const imgElements = Array.from(imgs).map((img: any, index) => {
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt") || title;
    return (
      <Image
        key={index}
        src={src || ""}
        alt={alt}
        width={100}
        height={100}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="lazy"
        priority={false}
      />
    );
  });

  return imgElements;
}
