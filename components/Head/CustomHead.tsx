import { HtmlElementToJsonType } from "@/utils/InterfaceType";
// import Head from "next/head";
import { MetaTagList } from "./MetaTagList";
import { LinkTagList } from "./LinkTagList";
import { StyleTagList } from "./StyleTagList";
import { ScriptTagList } from "./ScriptTagList";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

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

  console.log("title element", titleElementContent);

  return (
    <>
      <title>{titleElementContent?.content}</title>

      <MetaTagList metaElements={metaElements} />
      <LinkTagList linkElements={linkElements} />
      <StyleTagList styleElements={styleElements} />
      <ScriptTagList scriptElements={scriptElements} />
    </>
  );
};
