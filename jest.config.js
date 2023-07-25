module.exports = {
    rootDir: '.',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    modulePathIgnorePatterns: ['<rootDir>/dist'],
    testPathIgnorePatterns: ['<rootDir>/dist/'],
    coverageDirectory: './coverage/',
    collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}'],
    coveragePathIgnorePatterns: [
      '.*\\.d\\.ts',
      '/components/.*./index\\.ts',
      'jest.config.js',
      'webpack.*\\.js',
      './coverage',
      './public',
      '/test-utils',
      '/types',
      '/strings',
      '/utils',
      '/build',
      'assets',
      './functions/setup\\.js',
      '/redux'
    ],
    coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
    testResultsProcessor: 'jest-junit',
    reporters: ['default', 'jest-junit'],
    clearMocks: true,
    automock: false,
    testTimeout: 15000
};
  