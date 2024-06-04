import { HtmlElementToJsonType } from "@/utils/InterfaceType";
import React from "react";
import { Roboto } from "next/font/google";
import { NextImage } from "./NextImage";
import https from "https";
import { ClientRequest, IncomingMessage } from "http";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface CustomHeadPropsType {
  bodyJson: HtmlElementToJsonType;
}

const SELF_CLOSING_TAGS = [
  "img",
  "input",
  "br",
  "hr",
  "wbr",
  "base",
  "area",
  "col",
  "command",
  "embed",
  "keygen",
  "param",
  "source",
  "track",
];

const Element = ({ element }: { element: HtmlElementToJsonType }) => {
  const attributes: Record<string, any> = element.attributes.reduce(
    (acc: Record<string, any>, attr: Record<string, string>) => {
      let key = attr.key;
      if (key === "class") {
        key = "className";
      }
      if (key === "style") {
        const styleObject: Record<string, string> = attr.value
          .split(";")
          .reduce(
            (styleAcc, styleProp) => {
              const [property, value] = styleProp.split(":");
              if (property && value) {
                styleAcc[property.trim()] = value.trim();
              }
              return styleAcc;
            },
            {} as Record<string, string>
          );

        // Keep styleObject as an object
        acc[key] = styleObject;
      } else {
        acc[key] = attr.value;
      }
      return acc;
    },
    {} as Record<string, any>
  );

  if (attributes.hasOwnProperty("src") && attributes.src.startsWith("data:")) {
    return null;
  }
  if (attributes.hasOwnProperty("href")) {
    // console.log("src", attributes.href);
  }

  // add missing attribute
  if (element.tagName === "a") {
    if (!attributes.hasOwnProperty("href") || !attributes.href) {
      attributes.href = "#";
    }
    if (!attributes.hasOwnProperty("title") || !attributes.title) {
      attributes.title = "News 18";
    }

    if (
      element.content?.startsWith("<svg") ||
      element.content?.startsWith("<path") ||
      element.content?.startsWith("<img")
    ) {
      // console.log("element.content", element.content);

      element.content = element.content + "News 18---------";
    }
    attributes.rel = "noopener";
    attributes.target = "_blank";
  }
  // add missing content in button
  else if (
    element.tagName === "button" &&
    !element.hasOwnProperty("content") &&
    element.children.length === 0
  ) {
    element.children = [
      {
        type: "text",
        content: ".",
        tagName: "span",
        attributes: [
          { key: "class", value: "whitespace-nowrap font-semibold" },
        ],
        children: [],
      },
    ];
  } else if (element.tagName === "h4") {
    element.tagName = "p";
  }

  // script tag
  if (element.tagName === "script") {
    // console.log("script tag", element);
    // return <script {...attributes} defer />;
    return null;
  }

  // image tag
  else if (element.tagName === "img") {
    let Priority: boolean = false;

    if (attributes?.src?.startsWith("http")) {
      const imageUrl: URL = new URL(attributes.src);

      const options: object = {
        method: "HEAD",
        host: imageUrl.hostname,
        path: imageUrl.pathname,
      };

      const req: ClientRequest = https.request(
        options,
        (res: IncomingMessage) => {
          if (res && res.statusCode && res?.statusCode >= 400) {
            return null;
          }
          if (
            res.headers["content-length"] !== undefined &&
            parseInt(res.headers["content-length"]) >= 100000
          ) {
            Priority = true;
          }
        }
      );

      req.end();
    }

    return <NextImage Priority={Priority} attributes={attributes} />;
  }

  // meta and link tags
  else if (element.tagName === "meta" || element.tagName === "link") {
    // this is not working
    // return <Head>{React.createElement(element.tagName, attributes)}</Head>;

    if (element.tagName === "meta") {
      if (!attributes.hasOwnProperty("content")) {
        attributes.content = "stack overflow";
        console.log("meta tag without content", attributes);
      } else if (!attributes.hasOwnProperty("name")) {
        attributes.name = "stack overflow";
        console.log("meta tag without name", attributes);
      }
      // console.log("meta tag", attributes);

      return <meta {...attributes} />;
    } else {
      return <link {...attributes} />;
    }
  }

  // self closing tags
  else if (
    !element.hasOwnProperty("children") ||
    element.children.length === 0
  ) {
    return React.createElement(element.tagName, attributes);
  }

  // all other tags
  else {
    return React.createElement(
      element.tagName,
      attributes,
      element?.children
        ? element?.children?.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )
        : element?.content
          ? element.content
          : null
    );
  }
};

export const CustomBody = ({ bodyJson }: CustomHeadPropsType) => {
  return (
    <div className={roboto.className}>
      {bodyJson?.children?.map((child, index) =>
        child.type === "element" ? (
          <Element key={index} element={child} />
        ) : (
          child.content
        )
      )}
    </div>
  );
};
