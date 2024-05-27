import { webScraperRoutes } from "@/utils/ApiRoutes";
import { HtmlElementToJsonType, WebPageData } from "@/utils/InterfaceType";
import { parse } from "himalaya";
import { CustomHead } from "@/components/Head/CustomHead";
import { CustomBody } from "@/components/Body/CustomeBody";

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

  const htmlResponseItem: WebPageData =
    response.find((item) => item.responseText.startsWith("<!doctype html>")) ||
    ({} as WebPageData);

  const htmlBodyJson: HtmlElementToJsonType[] = parse(
    htmlResponseItem?.responseText
  ) as unknown as HtmlElementToJsonType[];

  const headJson: HtmlElementToJsonType =
    htmlBodyJson
      .find((element) =>
        element?.children.some((child) => child.tagName === "head")
      )
      ?.children?.find((child) => child.tagName === "head") ||
    ({} as HtmlElementToJsonType);

  const bodyJson: HtmlElementToJsonType =
    htmlBodyJson
      .find((element) =>
        element?.children.some((child) => child.tagName === "body")
      )
      ?.children?.find((child) => child.tagName === "body") ||
    ({} as HtmlElementToJsonType);

  return (
    <>
      <CustomHead headJson={headJson} />
      <CustomBody bodyJson={bodyJson} />
    </>
  );
}
