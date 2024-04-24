// Commitlint Configuration
// Reference: https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md
// -------------------------------------------------------------------------- /

module.exports = {
	extends: [
		'@commitlint/config-conventional',
	],

	rules: {
		'scope-case': [
			2,
			'always',
			[
				'upper-case',
				'lower-case',
				'pascal-case',
			],
		],
		'subject-case': [
			2,
			'never',
			[],
		],
		"body-max-length": [0, "always"],
		"body-max-line-length": [0, "always"]
	}
}
