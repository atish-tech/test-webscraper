"use client";
import { webScraperRoutes } from "@/utils/api-routes";
import { DivJSX } from "@/utils/get-JSX/div-jsx";
import { ImgJsx } from "@/utils/get-JSX/img-jsx";
import { nextFontJSX } from "@/utils/get-JSX/next-font";
import { PJSX } from "@/utils/get-JSX/p-jsx";
import { WebPageData } from "@/utils/interface-type";
import Head from "next/head";
import { useEffect, useState } from "react";

// alternetive way of getStaticProps
export async function getData() {
  const response = await fetch(webScraperRoutes, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  }).then((res) => res.json());
  return response;
}

export default function Home() {
  const [pageData, setPageData] = useState<WebPageData[]>([]);

  const [pTag, setPTag] = useState<JSX.Element[]>([]);
  const [divTag, setDivTag] = useState<JSX.Element[]>([]);
  const [imgTag, setImgTag] = useState<JSX.Element[]>([]);
  const [nextFont, setNextFont] = useState<JSX.Element[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getData();
      setPageData(response.val);

      const parser = new DOMParser(); // global api to parse html string
      const temp = response?.val[0].responseText;
      const doc = parser.parseFromString(temp, "text/html");

      const title: string = doc.querySelector("title")?.textContent || "";

      const fontLink: NodeListOf<Element> = doc.querySelectorAll("link[rel='preconnect']");
      const ps: NodeListOf<HTMLParagraphElement> = doc.querySelectorAll("p");
      const divs: NodeListOf<HTMLDivElement> = doc.querySelectorAll("div");
      const imgs: NodeListOf<HTMLImageElement> = doc.querySelectorAll("img");

      const divElements: JSX.Element[] = DivJSX(divs);
      const imgElements: JSX.Element[] = ImgJsx(imgs, title);
      const pElement: JSX.Element[] = PJSX(ps);
      const nextFontElement: JSX.Element[] = nextFontJSX(fontLink);

      setNextFont(nextFontElement);
      setImgTag(imgElements);
      setPTag(pElement);
      setDivTag(divElements);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Medium</title>
        <meta name="description" content="Medium Article" />
        {nextFont}
      </Head>

      <main>
        {divTag}
        {pTag}
        {imgTag}
      </main>
    </>
  );
}
