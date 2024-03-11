/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'

const config: Config = {
	clearMocks: true,

	collectCoverage: false,

	coverageDirectory: 'coverage',

	coverageProvider: 'v8',

	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],

	collectCoverageFrom: ['src/**/*.ts', '!src/**/__tests__/**', '!**/index.ts', '!src/config/*'],
	coverageThreshold: {
		global: {
			branches: 90,
			functions: 90,
			lines: 90,
			statements: 90,
		},
	},
	preset: 'ts-jest',
	testEnvironment: 'node',
	// moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
	modulePaths: ['<rootDir>'],
	globals: {
		isolatedModules: true,
	},
}

export default config
