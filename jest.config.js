module.exports = {
  preset: '@shelf/jest-mongodb',
  collectCoverage: true,
  watchPathIgnorePatterns: ['globalConfig'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts': 'ts-jest'
  }
}
