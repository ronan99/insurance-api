/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'

const config: Config = {
	roots: ['<rootDir>/src'],
	clearMocks: true,

	collectCoverage: false,

	coverageDirectory: 'coverage',

	coverageProvider: 'v8',

	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],

	collectCoverageFrom: [
		'src/**/*.ts',
		'!src/**/__tests__/**',
		'!**/index.ts',
		'!**/app.ts',
		'!**/config.ts',
		'!src/infra/*',
		'!src/domain/repositories/*.ts',
		'!**/*DTO.ts',
		'!src/di/**',
		'!src/core/**',
		'!src/domain/repositories/Implementations/Prisma/**',
		'!src/infra/prisma/**',
	],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 90,
			lines: 90,
			statements: 90,
		},
	},
	preset: 'ts-jest',
	testEnvironment: 'node',
	modulePaths: ['<rootDir>'],
	globals: {
		isolatedModules: true,
	},
}

export default config
