import Head from "next/head";

export const CustomHead = ({ children }: { children: React.ReactNode }) => (
  <Head>{children}</Head>
);
