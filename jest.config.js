module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/tests/unit/__mocks__/emptyStyleMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@fortawesome/fontawesome-free/css/all.min.css$': '<rootDir>/tests/unit/__mocks__/emptyStyleMock.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@fortawesome)/)',
  ],
};
