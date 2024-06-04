import { HtmlElementToJsonType } from "@/utils/InterfaceType";

export const MetaTagList = ({
  metaElements,
}: {
  metaElements: HtmlElementToJsonType[];
}) => {
  return (
    <>
      {metaElements?.map((meta, index) => {
        const attributes: Record<string, string> = meta.attributes.reduce(
          (acc: Record<string, string>, attr: Record<string, string>) => {
            acc[attr.key] = attr.value;
            return acc;
          },
          {} as Record<string, string>
        );

        // if (!attributes.hasOwnProperty("name")) {
        //   console.log("meta tag", attributes);
        // }

        return <meta key={index} {...attributes} />;
      })}
    </>
  );
};
