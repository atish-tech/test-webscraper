import { webScraperRoutes } from "@/utils/api-routes";
import { webScraperPageDataTypes } from "@/utils/interface-type";

// not work in app route
// export async function getStaticProps() {
//   const response = await fetch(webScraperRoutes).then((res) => res.json());
//   return response.data;
// }

// alternetive way of getStaticProps
export async function getData() {
  const response = await fetch(webScraperRoutes, { cache: "force-cache" }).then(
    (res) => res.json()
  );
  return response.data;
}

export async function generateMetadata() {
  const response = await fetch(webScraperRoutes, { cache: "force-cache" }).then(
    (res) => res.json()
  );

  return {
    title: "medium",
    description: "medium article",
  };
}

export default async function Home() {
  const pageData: webScraperPageDataTypes = await getData();

  return <></>;
}
