import { webScraperRoutes } from "@/utils/api-routes";
import { WebPageData } from "@/utils/interface-type";

// alternetive way of getStaticProps
export async function getData() {
  const response = await fetch(webScraperRoutes, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  }).then((res) => res.json());
  return response.data;
}

export async function generateMetadata() {
  const response = await fetch(webScraperRoutes, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  }).then((res) => res.json());

  return {
    title: "medium",
    description: "medium article",
  };
}

export default async function Home() {
  const pageData: WebPageData = await getData();

  return <></>;
}
