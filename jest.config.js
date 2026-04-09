const nextJest = require("next/jest");
const createJestConfig = nextJest({ dir: "./" });
const customConfig = {
  setupFilesAfterFramework: [],
  setupFiles: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
};
module.exports = createJestConfig(customConfig);
