import { HtmlElementToJsonType } from "./InterfaceType";

export const jsonToJSXLogic = (data: HtmlElementToJsonType) => {
  let jsxElement = "";

  if (
    data.tagName === "head" ||
    (data.tagName === "link" &&
      data.attributes?.some((attr) => attr.value == "preconnect"))
  ) {
    jsxElement += `<${data.tagName}`;
  } else {
    return "";
  }


  // const filteredData = data.children.filter(item =>
  //   item.tagName === "head" ||
  //   (item.tagName === "link" && item.attributes?.some((attr) => attr.value == "preconnect"))
  // );
  
  // const jsxElements = filteredData.map(item => `<${item.tagName}`);



  // console.log(jsxElements);
  
 
  data?.attributes?.forEach((attri) => {
    jsxElement += ` ${attri.key}="${attri.value}"`;
  });

  if (data.tagName === "link") {
    jsxElement += " />";
  } else {
    jsxElement += ">";
  }

  if (data.children) {
    data.children.forEach((child) => {
      jsxElement += jsonToJSXLogic(child);
    });
  }

  if (data.tagName === "head") {
    jsxElement += "</head>";
  }

  return jsxElement;
};
