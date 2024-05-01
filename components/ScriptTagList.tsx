import { HtmlElementToJsonType } from "@/utils/InterfaceType";

export const ScriptTagList = ({
  scriptElements,
}: {
  scriptElements: HtmlElementToJsonType[];
}) => {
  return (
    <>
      {scriptElements.map((script) => {
        const scriptContent: HtmlElementToJsonType = script.children.find(
          (child) => child.content
        ) as HtmlElementToJsonType;

        const attributes: Record<string, string> = script.attributes.reduce(
          (acc, attr) => {
            acc[attr.key] = attr.value;
            return acc;
          },
          {} as Record<string, string>
        );

        return <script {...attributes}>{scriptContent?.content}</script>;
      })}
    </>
  );
};
