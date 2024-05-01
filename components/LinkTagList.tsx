import { HtmlElementToJsonType } from "@/utils/InterfaceType";

export const LinkTagList = ({
  linkElements,
}: {
  linkElements: HtmlElementToJsonType[];
}) => {
  return (
    <>
      {linkElements.map((link) => {
        const attributes: Record<string, string> = link.attributes.reduce(
          (acc: Record<string, string>, attr: Record<string, string>) => {
            acc[attr.key] = attr.value;
            return acc;
          },
          {} as Record<string, string>
        );

        return <link {...attributes} />;
      })}
    </>
  );
};
