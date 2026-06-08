const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://restful-booker.herokuapp.com",
    env: {
      username: "admin",
      password: "password123"
    },
    setupNodeEvents(on, config) {},
  },
});