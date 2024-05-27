import Script from "next/script";

export const NextScript = ({
  attribute,
  children,
}: {
  attribute: Record<string, string>;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <Script {...attribute}>{children}</Script>
    </>
  );
};
