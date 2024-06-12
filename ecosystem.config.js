module.exports = {
  apps: [
    {
      name: "nextjs-canlisu",
      script: "yarn start",
      watch: ["public/locales"]
      // Delay between restart
      // watch_delay: 1000,
      // ignore_watch: ["node_modules", ".next"]
      // [”[\/\\]\./”, “node_modules”]
    }
  ]
};
