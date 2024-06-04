import { HtmlElementToJsonType } from "@/utils/InterfaceType";
import { NextScript } from "../Body/Script";

export const ScriptTagList = ({
  scriptElements,
}: {
  scriptElements: HtmlElementToJsonType[];
}) => {
  return (
    <>
      {scriptElements?.map((script, index) => {
        // const scriptContent: HtmlElementToJsonType = script.children.find(
        //   (child) => child.content
        // ) as HtmlElementToJsonType;

        const attributes: Record<string, string> = script.attributes.reduce(
          (acc: Record<string, string>, attr: Record<string, string>) => {
            acc[attr.key] = attr.value;
            return acc;
          },
          {} as Record<string, string>
        );
        attributes.defer = "true";

        return <NextScript key={index} attribute={attributes} />;
      })}
    </>
  );
};
