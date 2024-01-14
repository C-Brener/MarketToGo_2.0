module.exports = {
  preset: '@shelf/jest-mongodb',
  collectCoverage: true,
  watchPathIgnorePatterns: ['globalConfig'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts': 'ts-jest'
  }
}
