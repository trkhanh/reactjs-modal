let browser = ["ChromeHeadless"];
let coverageType = "text";

if (process.env.CONTINUOUS_INTEGRATION) {
  browser = ["Firefox"];
  coverageType = "lcovonly";
}

module.exports = function (config) {
  config.set({
    frameworks: ["mocha"],

    preprocessors: {
      "./src/*.js": ["coverage"],
      "./src/**/*.js": ["coverage"],
      "./specs/index.js": ["webpack", "sourcemap"],
    },

    files: ["./specs/index.js"],

    webpack: require("./scripts/webpack.test.config"),

    webpackMiddleware: { stats: "errors-only" },

    reporters: ["mocha", "coverage"],

    mochaReporter: { showDiff: true },

    coverageReporter: {
      type: coverageType,
      dir: "coverage/",
      subdir: ".",
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers,

    captureTimeout: 4 * 60 * 1000,

    singleRun: process.env.CONTINUOUS_INTEGRATION,
  });
};
