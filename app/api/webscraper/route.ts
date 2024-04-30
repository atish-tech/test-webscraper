import { NextResponse } from "next/server";
import puppeteer, { HTTPResponse } from "puppeteer";
import { HTTPRequest } from "puppeteer";
import { WebPageData } from "@/utils/InterfaceType";
import {
  INCLUDED_DOMAINS,
  INCLUDED_RESOURCE_TYPE,
} from "@/utils/WebScrapperContants";

export async function GET() {
  const url =
    "https://medium.com/nerd-for-tech/workflow-for-switching-github-accounts-in-your-terminal-d87e50bb5511";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setRequestInterception(true);

  let pageData: WebPageData[] = [];

  page.on("request", (req: HTTPRequest) => {
    const url = new URL(req.url());
    if (
      !INCLUDED_RESOURCE_TYPE.includes(req.resourceType()) ||
      !INCLUDED_DOMAINS.includes(url.hostname)
    ) {
      return req.abort();
    }
    req.continue();
  });

  page.on("response", async (response: HTTPResponse) => {
    let temp: WebPageData = {
      url: "",
      resourceType: "",
      responseText: "",
      initiator: "",
      headers: "",
      method: "",
      postData: "",
      statusCode: 0,
      error: "",
    };

    try {
      temp.responseText = await response.text();
    } catch (error: any) {
      temp.error = error.message;
    }

    temp.statusCode = response.status();
    temp.url = response.url();
    temp.resourceType = response.request().resourceType();
    temp.method = response.request().method();
    temp.postData = response.request().postData() || "";
    temp.headers = JSON.stringify(response.request().headers());
    temp.initiator = JSON.stringify(response.request().initiator()) || "";

    pageData.push(temp);
  });

  await page.goto(url);

  await browser.close();

  return NextResponse.json({ val: pageData }, { status: 200 });
}
