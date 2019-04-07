module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  verbose: true,
  testMatch: ['**/*/*.spec.[jt]s'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['/node_modules/', '/db-data/'],
};
