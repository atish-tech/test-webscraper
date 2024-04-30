export function nextFontJSX(fontLink: NodeListOf<Element>) {
  const nextFont = Array.from(fontLink).map((link) => {
    return (
      <link
        rel="preconnect"
        href={link.getAttribute("href") || "https://fonts.googleapis.com"}
      />
    );
  });
  return nextFont;
}