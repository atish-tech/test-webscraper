import { webScraperRoutes } from "@/utils/api-routes";
import { WebPageData } from "@/utils/interface-type";
import Head from "next/head";
import { parse } from "himalaya";
import { jsonToJSXLogic } from "@/utils/json-head";

export async function getData() {
  const response = await fetch(webScraperRoutes, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  // cache: "force-cache",  // removed bcz of dev mode

  return (await response.json()).val;
}

export default async function Home() {
  const response: WebPageData[] = await getData();

  let htmlResponse = "";
  if (response[0].responseText.startsWith("<!doctype html>")) {
    htmlResponse = response[0].responseText;
  }

  const json: any = parse(htmlResponse);

  let headJson;
  if (
    json.length > 1 &&
    json[1]?.children?.length > 0 &&
    json[1]?.children[0].tagName === "head"
  ) {
    headJson = json[1]?.children[0];
  }

  const headData = jsonToJSXLogic(headJson);
  console.log("headData", headData);

  return (
    <>
      <Head>
        <title>Web Scraper</title>
        {/* {headData} */}
      </Head>
    </>
  );
}
