// const HttpBackend = require("i18next-http-backend/cjs");
// const ChainedBackend = require("i18next-chained-backend").default;
// const LocalStorageBackend = require("i18next-localstorage-backend").default;

// const isBrowser = typeof window !== "undefined";
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  debug: false,
  reloadOnPrerender: isDev,
  // backend: {
  //   backendOptions: [{ expirationTime: 20 * 1000 }, {}], // 1 hour
  //   backends: isBrowser ? [LocalStorageBackend, HttpBackend] : []
  // },
  // serializeConfig: false,
  // use: isBrowser ? [ChainedBackend] : [],
  i18n: {
    defaultLocale: "az",
    locales: ["az", "en", "ru", "tr", "ar"],
    localeDetection: false
  }
};
