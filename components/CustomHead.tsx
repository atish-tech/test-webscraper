import { HtmlElementToJsonType } from "@/utils/InterfaceType";
import Head from "next/head";
import { MetaTagList } from "./MetaTagList";
import { LinkTagList } from "./LinkTagList";
import { StyleTagList } from "./StyleTagList";
import { ScriptTagList } from "./ScriptTagList";

interface CustomHeadPropsType {
  headJson: HtmlElementToJsonType;
}

export const CustomHead = ({ headJson }: CustomHeadPropsType) => {
  const metaElements: HtmlElementToJsonType[] = headJson.children?.filter(
    (child) => child.tagName === "meta"
  );

  const linkElements: HtmlElementToJsonType[] = headJson.children?.filter(
    (child) => child.tagName === "link"
  );

  const styleElements: HtmlElementToJsonType[] = headJson.children?.filter(
    (child) => child.tagName === "style"
  );

  const scriptElements: HtmlElementToJsonType[] = headJson.children?.filter(
    (child) => child.tagName === "script"
  );

  const titleElement: HtmlElementToJsonType = headJson.children?.find(
    (element) =>
      element.tagName === "title" &&
      element.children.find((child) => child.content)
  ) as HtmlElementToJsonType;

  const titleElementContent: HtmlElementToJsonType =
    titleElement?.children.find(
      (child) => child.content
    ) as HtmlElementToJsonType;

  return (
    // head tag is not working still i'm fiugring out the issue, but when i remove head tag it's working fine
   <>
    <Head>
      <title>{titleElementContent?.content}</title>

      <MetaTagList metaElements={metaElements} />
      <LinkTagList linkElements={linkElements} />
      <StyleTagList styleElements={styleElements} />
      <ScriptTagList scriptElements={scriptElements} />
    </Head>
   </>
  );
};
