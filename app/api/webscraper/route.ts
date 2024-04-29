import { NextResponse } from "next/server";
import puppeteer, { HTTPResponse } from "puppeteer";
import { HTTPRequest } from "puppeteer";
import { webScraperPageDataTypes } from "@/utils/interface-type";
import { allowedDomains, webScrapRequestType } from "@/utils/web-request-type";

export async function GET() {
  const url =
    "https://medium.com/nerd-for-tech/workflow-for-switching-github-accounts-in-your-terminal-d87e50bb5511";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setRequestInterception(true);

  let pageData: webScraperPageDataTypes = {
    url: [],
    resourceType: [],
    method: [],
    postData: [],
    headers: [],
    initiator: [],
    response: [],
  };

  page.on("request", (req: HTTPRequest) => {
    const url = new URL(req.url());
    if (
      !webScrapRequestType.includes(req.resourceType()) ||
      !allowedDomains.includes(url.hostname)
    ) {
      return req.abort();
    }
    req.continue();
  });

  page.on("response", async (response: HTTPResponse) => {
    let text;
    try {
      text = await response.text();
    } catch (error) {
      text = null;
    }

    pageData.response.push({ url: response.url(), text: text || null });
    pageData.url.push(response.url() || "");
    pageData.resourceType.push(response.request().resourceType() || "");
    pageData.method.push(response.request().method() || "");
    pageData.postData.push(response.request().postData() || "");
    pageData.headers.push(JSON.stringify(response.request().headers()) || "");
    pageData.initiator.push(
      JSON.stringify(response.request().initiator()) || ""
    );
  });

  await page.setExtraHTTPHeaders({
    "Content-Type": "application/json",
  });

  await page.goto(url);

  await browser.close();

  return NextResponse.json({ data: pageData }, { status: 200 });
}
