import { NextRequest, NextResponse } from "next/server";
import chromium from 'chrome-aws-lambda';
import puppeteer, { Browser, HTTPRequest, HTTPResponse, Page } from 'puppeteer-core';
import { WebPageData } from "@/utils/InterfaceType";
import { INCLUDED_RESOURCE_TYPE } from "@/utils/WebScrapperContants";

export async function GET(request: NextRequest) {
  const urlQueryObject = new URL(request.url);
  const searchParams = new URLSearchParams(urlQueryObject.search);
  const url: string = searchParams.get("url") as string;
  const domainName: string = new URL(url).hostname;

  const browser: Browser = await puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
  });
  const page: Page = await browser.newPage();

  // const userAgent: string = request.headers.get("user-agent") as string;
  // await page.setUserAgent(userAgent);

  // await page.setRequestInterception(true);

  // let pageData: WebPageData[] = [];

  // page.on("request", (req: HTTPRequest) => {
  //   const url: URL = new URL(req.url());
  //   if (
  //     !INCLUDED_RESOURCE_TYPE.includes(req.resourceType()) ||
  //     url.hostname !== domainName
  //   ) {
  //     return req.abort();
  //   }
  //   req.continue();
  // });

  // page.on("response", async (response: HTTPResponse) => {
  //   let temp: WebPageData = {
  //     url: "",
  //     resourceType: "",
  //     responseText: "",
  //     initiator: "",
  //     headers: "",
  //     method: "",
  //     postData: "",
  //     statusCode: 0,
  //     error: "",
  //   };

  //   try {
  //     temp.responseText = await response.text();
  //   } catch (error: object | any) {
  //     temp.error = error.message;
  //   }

  //   temp.statusCode = response.status();
  //   temp.url = response.url();
  //   temp.resourceType = response.request().resourceType();
  //   temp.method = response.request().method();
  //   temp.postData = response.request().postData() || "";
  //   temp.headers = JSON.stringify(response.request().headers());
  //   // temp.initiator = JSON.stringify(response.request().initiator()) || "";

  //   pageData.push(temp);
  // });
  const title = await page.title();

  try {
    await page.goto(url);
  } catch (error) {
    console.error("Navigation failed:", error);
  }

  await browser.close();

  return NextResponse.json({ val: title }, { status: 200 });
}
