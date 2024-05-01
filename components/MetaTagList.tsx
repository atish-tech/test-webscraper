import { HtmlElementToJsonType } from "@/utils/InterfaceType";

export const MetaTagList = ({
  metaElements,
}: {
  metaElements: HtmlElementToJsonType[];
}) => {
  return (
    <>
      {metaElements.map((meta) => {
        const attributes: Record<string, string> = meta.attributes.reduce(
          (acc: Record<string, string>, attr: Record<string, string>) => {
            acc[attr.key] = attr.value;
            return acc;
          },
          {} as Record<string, string>
        );

        return <meta {...attributes} />;
      })}
    </>
  );
};
