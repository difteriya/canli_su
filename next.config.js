/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: [
      "localhost",
      "wavio.b-cdn.net",
      "canlisu.az",
      `${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`,
      `${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com`
    ]
  },
  // experimental: {
  //   // Defaults to 50MB
  //   isrMemoryCacheSize: 0
  // }
  // experimental: { images: { allowFutureImage: true } }
};

module.exports = nextConfig;
