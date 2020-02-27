exports.config = {
  capabilities: {
    browserName: "chrome"
  },
  directConnect: true,
  baseUrl: "https://testing-angular-applications.github.io",
  framework: "jasmine",
  specs: ["./tests/e2e/specs/*.js"],
};
