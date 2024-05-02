import { HtmlElementToJsonType } from "@/utils/InterfaceType";

export const StyleTagList = ({
  styleElements,
}: {
  styleElements: HtmlElementToJsonType[];
}) => {
  return (
    <>
      {styleElements.map((style) => {
        const styleData = style.children.find((child) => child.content);

        const attributes = style.attributes.reduce(
          (acc, attr) => {
            acc[attr.key] = attr.value;
            return acc;
          },
          {} as Record<string, string>
        );

        return <style {...attributes}>{styleData?.content}</style>;
      })}
    </>
  );
};
