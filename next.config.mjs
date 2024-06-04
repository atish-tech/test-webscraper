// const withBundleAnalyzer = require("@next/bundle-analyzer");
// import withBundleAnalyzer from "@next/bundle-analyzer";

// const withCSS = require("@zeit/next-css");
// module.exports = withCSS({});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "*",
      "www.scaler.com",
      "d1g0iq4cbcvjcd.cloudfront.net",
      "images.news18.com",
      "news.airbnb.com",
      "miro.medium.com",
      "cdn.sstatic.net",
      "www.gravatar.com",
      "sb.scorecardresearch.com",
      "cms.patrika.com",
      "new-img.patrika.com",
      "scaler.com",
      "rukminim2.flixcart.com",
      "static-assets-web.flixcart.com",
    ],
  },
  devtool: "source-map",
};

export default nextConfig;
