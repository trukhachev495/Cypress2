const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "s1bwx1",
  e2e: {
    baseUrl: 'https://qamid.tmweb.ru/admin',
    retries: {
      openMode:1,
      runMode:2
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
