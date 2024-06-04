import { webScraperRoutes } from "@/utils/ApiRoutes";
import { HtmlElementToJsonType, WebPageData } from "@/utils/InterfaceType";
import { parse } from "himalaya";
import { CustomHead } from "@/components/Head/CustomHead";
import { CustomBody } from "@/components/Body/CustomeBody";
import axios from "axios";

export async function getData(url: string) {
  // const response = await fetch(webScraperRoutes, {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // return (await response.json()).val;

  const response = await axios.get(webScraperRoutes, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 9; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36",
    },
    params: {
      url,
    },
  });
  return response.data.val;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  if (searchParams?.url == undefined) return <div> Url is not valid </div>;

  const response: WebPageData[] = await getData(searchParams?.url);

  const htmlResponseItem: WebPageData[] = response.filter(
    (item: WebPageData) => item.resourceType === "document"
  );

  if (htmlResponseItem.length === 0) {
    return <div> No response </div>;
  }

  return htmlResponseItem.map((webPage: WebPageData) => {
    const htmlBodyJson: HtmlElementToJsonType[] = parse(
      webPage.responseText
    ) as unknown as HtmlElementToJsonType[];

    const documentJson = htmlBodyJson.filter(
      (item) => item?.tagName === "html"
    )[0];

    const headJson = documentJson?.children?.filter(
      (item) => item?.tagName === "head"
    )[0];

    const bodyJson = documentJson?.children?.filter(
      (item) => item?.tagName === "body"
    )[0];

    return (
      <>
        <CustomHead headJson={headJson} />
        <CustomBody bodyJson={bodyJson} />
      </>
    );
  });
}
