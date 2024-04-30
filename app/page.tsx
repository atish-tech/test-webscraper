import { webScraperRoutes } from "@/utils/api-routes";
import { WebPageData } from "@/utils/interface-type";
import Head from "next/head";
import { parse } from "himalaya";
import { jsonToJSXLogic } from "@/utils/json-head";

export async function getData() {
  const response = await fetch(webScraperRoutes, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });
  return await response.json();
}

export default async function Home() {
  const response = await getData();

  let htmlResponse = "";
  if (response.responseText[0].startsWith("<!doctype html>")) {
    htmlResponse = response.responseText[0];
  }

  const json: any = parse(htmlResponse);

  let headJson = {};
  if (
    json.length > 1 &&
    json[1]?.children?.length > 0 &&
    json[1]?.children[0].tagName === "head"
  ) {
    headJson = json[1]?.children[0];
  }

  const headData = jsonToJSXLogic(headJson);
  console.log(headData);
  

  return (
    <>
      <Head>
        <title>Web Scraper</title>
        {headData}
      </Head>
    </>
  );
}
