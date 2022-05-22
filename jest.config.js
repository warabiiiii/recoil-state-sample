/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testRegex: '((\\.|/*.)(spec))\\.tsx?$',
  testTimeout: 5000,
};