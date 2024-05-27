"use client";
import { HtmlElementToJsonType } from "@/utils/InterfaceType";
import React from "react";
import { NextImage } from "./NextImage";
import { Input } from "./Input";
import { HR } from "./HR";
import { BR } from "./BR";
import { Source } from "./Source";
import { Div } from "./Div";
import { NextScript } from "./Script";
import { P } from "./P";
import { A } from "./A";
import { Article } from "./Article";
import { Button } from "./Button";
import { Footer } from "./Footer";
import { Path } from "./Path";
import { Section } from "./Section";
import { Span } from "./Span";
import { Svg } from "./Svg";
import { H1, H2, H3, H4, H5, H6 } from "./HTag";
import { Pre } from "./Pre";
import { Code } from "./Code";
import { Figure } from "./Figure";
import { Strong } from "./Strong";
import { Em } from "./Em";
import { Rect } from "./Rect";
import { Figcaption } from "./Figcaption";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
interface CustomHeadPropsType {
  bodyJson: HtmlElementToJsonType;
}

const SELF_CLOSE_TAGS = [
  "img",
  "picture",
  "input",
  "hr",
  "br",
  "area",
  "base",
  "col",
  "command",
  "embed",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
];

const Element = ({ element }: { element: HtmlElementToJsonType }) => {
  const attributes: Record<string, string> = element.attributes.reduce(
    (acc: Record<string, string>, attr: Record<string, string>) => {
      if (attr.key === "style") {
        // before { key: 'style', value: 'flex:1' }

        const styleObject: Record<string, string> = attr.value
          .split(" ")
          .reduce(
            (styleAcc, styleProp) => {
              const [property, value] = styleProp.split(":");
              styleAcc[property.trim()] = value.trim();
              return styleAcc;
            },
            {} as Record<string, string>
          );

        // after { flex: '1' }
        acc[attr.key] = styleObject; //@ignore
      } else {
        acc[attr.key] = attr.value;
      }
      return acc;
    },
    {} as Record<string, string>
  );

  if (SELF_CLOSE_TAGS.includes(element.tagName)) {
    if (element.tagName === "img" || element.tagName === "picture") {
      return <NextImage attribute={attributes} />;
    } else if (element.tagName === "source") {
      return <NextImage attribute={attributes} />;
    } else if (element.tagName === "input") {
      return <Input attribute={attributes} />;
    } else if (element.tagName === "hr") {
      return <HR attribute={attributes} />;
    } else if (element.tagName === "br") {
      return <BR attribute={attributes} />;
    } else return React.createElement(element.tagName, attributes);
  } else {
    if (element.tagName === "div") {
      return (
        <Div attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </Div>
      );
    } else if (element.tagName === "script") {
      return (
        <NextScript attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </NextScript>
      );
    } else if (element.tagName === "a") {
      return (
        <A attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </A>
      );
    } else if (element.tagName === "article") {
      return (
        <Article attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </Article>
      );
    } else if (element.tagName === "button") {
      return (
        <Button attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </Button>
      );
    } else if (element.tagName === "footer") {
      return (
        <Footer attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </Footer>
      );
    } else if (element.tagName === "path") {
      return (
        <Path attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </Path>
      );
    } else if (element.tagName === "section") {
      return (
        <Section attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </Section>
      );
    } else if (element.tagName === "span") {
      return (
        <Span attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </Span>
      );
    } else if (element.tagName === "svg") {
      return (
        <Svg attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </Svg>
      );
    } else if (element.tagName === "p") {
      return (
        <P attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </P>
      );
    } else if (element.tagName === "h1") {
      return (
        <H1 attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </H1>
      );
    } else if (element.tagName === "h2") {
      return (
        <H2 attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </H2>
      );
    } else if (element.tagName === "h3") {
      return (
        <H3 attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </H3>
      );
    } else if (element.tagName === "h4") {
      return (
        <H4 attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </H4>
      );
    } else if (element.tagName === "h5") {
      return (
        <H5 attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </H5>
      );
    } else if (element.tagName === "h6") {
      return (
        <H6 attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </H6>
      );
    } else if (element.tagName === "pre") {
      return (
        <Pre attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </Pre>
      );
    } else if (element.tagName === "code") {
      return (
        <Code attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </Code>
      );
    } else if (element.tagName === "figure") {
      return (
        <Figure attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </Figure>
      );
    } else if (element.tagName === "strong") {
      return (
        <Strong attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </Strong>
      );
    } else if (element.tagName === "em") {
      return (
        <Em attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </Em>
      );
    } else if (element.tagName === "rect") {
      return (
        <Rect attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </Rect>
      );
    } else if (element.tagName === "figcaption") {
      return (
        <Figcaption attribute={attributes}>
          {element.children.map((child, index) =>
            child.type === "element" ? (
              <Element key={index} element={child} />
            ) : (
              child.content
            )
          )}
        </Figcaption>
      );
    } else {
      return null;

      return React.createElement(
        element.tagName,
        attributes,
        element.children.map((child, index) =>
          child.type === "element" ? (
            <Element key={index} element={child} />
          ) : (
            child.content
          )
        )
      );
    }
  }
};

export const CustomBody = ({ bodyJson }: CustomHeadPropsType) => {
  return (
    <div className={roboto.className}>
      {bodyJson.children.map((child, index) =>
        child.type === "element" ? (
          <Element key={index} element={child} />
        ) : (
          child.content
        )
      )}
    </div>
  );
};
