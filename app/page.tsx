import { webScraperRoutes } from "@/utils/ApiRoutes";
import { HtmlElementToJsonType, WebPageData } from "@/utils/InterfaceType";
import Head from "next/head";
import { parse } from "himalaya";
import { jsonToJSXLogic } from "@/utils/JsonHead";

export async function getData() {
  const response = await fetch(webScraperRoutes, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  return (await response.json()).val;
}

export default async function Home() {
  const response: WebPageData[] = await getData();

  let htmlResponse: string = "";

  const htmlResponseItem = response.find((item) =>
    item.responseText.startsWith("<!doctype html>")
  );

  if (htmlResponseItem) {
    htmlResponse = htmlResponseItem.responseText;
  }

  const htmlBodyJson: HtmlElementToJsonType[] = parse(
    htmlResponse
  ) as unknown as HtmlElementToJsonType[];

  let headJson: HtmlElementToJsonType = {} as HtmlElementToJsonType;

  const headElement = htmlBodyJson.find((element) =>
    element.children?.some((child) => child.tagName === "head")
  );

  if (headElement) {
    const headChild = headElement.children?.find(
      (child) => child.tagName === "head"
    );
    if (headChild) {
      headJson = headChild;
    }
  }

  const headData = jsonToJSXLogic(headJson);
  console.log(headData);

  return (
    <>
      <Head>
        <title>Web Scraper</title>
        {/* {headData} */}
      </Head>
    </>
  );
}
