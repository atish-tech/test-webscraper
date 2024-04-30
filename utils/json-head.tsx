export const jsonToJSXLogic = (data: any) => {
  let jsxElement: any = "";

  if (
    data.tagName === "head" ||
    (data.tagName === "link" &&
      data.attributes?.some((attr: any) => attr.value == "preconnect"))
  ) {
    jsxElement += `<${data.tagName}`;
  } else {
    return "";
  }

  data?.attributes?.forEach((attri: any) => {
    jsxElement += ` ${attri.key}="${attri.value}"`;
  });

  if (data.tagName === "link") {
    jsxElement += " />";
  } else {
    jsxElement += ">";
  }

  if (data.children) {
    data.children.forEach((child: any) => {
      jsxElement += jsonToJSXLogic(child);
    });
  }

  if (data.tagName === "head") {
    jsxElement += "</head>";
  }

  return jsxElement;
};
