module.exports = {
  reporters: [
    "default",
    ["jest-junit", {
      "outputDirectory": "./reports/junit",
      "outputName": "junit.xml"
    }]
  ],
  collectCoverage: true,
};
