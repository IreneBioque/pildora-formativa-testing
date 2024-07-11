module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  rootDir: "./",
  testMatch: ["**/__tests__/**/*.test.ts", "**/*.spec.ts"],
  collectCoverage: true,
  coverageDirectory: "./coverage",
  coverageReporters: ["html", "text"],
};
