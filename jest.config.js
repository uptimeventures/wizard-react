const isCI = process.env.CI !== ''

module.exports = {
  notify: isCI ? false : true,
  verbose: true,
  roots: ['src/'],
  setupTestFrameworkScriptFile: './scripts/setup-tests.js',
  setupFiles: ['raf/polyfill'],
  testPathIgnorePatterns: [
    '/examples/',
    '/node_modules/',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
}
