import { HtmlElementToJsonType } from "@/utils/InterfaceType";
import http, { ClientRequest, IncomingMessage } from "http";

export const LinkTagList = ({
  linkElements,
}: {
  linkElements: HtmlElementToJsonType[];
}) => {
  return (
    <>
      {linkElements?.map((link, index) => {
        const attributes: Record<string, string> = link.attributes.reduce(
          (acc: Record<string, string>, attr: Record<string, string>) => {
            acc[attr.key] = attr.value;
            return acc;
          },
          {} as Record<string, string>
        );

        if (attributes.hasOwnProperty("href")) {
          try {
            const hrefUrl: URL = new URL(attributes.href);

            const options: object = {
              method: "HEAD",
              host: hrefUrl.hostname,
              path: hrefUrl.pathname,
            };

            const trstRequest: ClientRequest = http.request(
              options,
              (res: IncomingMessage) => {
                if (res && res?.statusCode && res.statusCode >= 400) {
                  return null;
                }
              }
            );

            trstRequest.end();
          } catch (error) {
            return null;
          }
        }

        return <link key={index} {...attributes} />;
      })}
    </>
  );
};
