module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testEnvironment": "jsdom",
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest",
    // '^.+\\.svg$': '<rootDir>/fileTransformer.js',
  },
  moduleNameMapper: {
    '^.+\\.svg$': '<rootDir>/fileTransformer.js',
  //   // "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileTransformer.js",
  },
  "setupFilesAfterEnv": [
    "<rootDir>/src/setupTests.tsx"
  ]
}