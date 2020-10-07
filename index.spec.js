const { default: load } = require('@commitlint/load');
const { default: lint } = require('@commitlint/lint');
const commitlintConfigFile = require('./commitlint.config');

let commitlintConfig = {};

async function lintMessage(message) {
	return await lint(
		message,
		commitlintConfig.rawRulesConfig,
		commitlintConfig.rawOpts,
	);
}

beforeAll(async () => {
	const result = await load(commitlintConfigFile);
	commitlintConfig = {
		rawRulesConfig: result.rules,
		rawOpts: result.parserPreset ? { parserOpts: result.parserPreset.parserOpts } : {},
	};
});


describe('Commitlint Configuration', () => {
	test('Should correctly validate type', async () => {
		const allowedTypes = [
			'build',
			'ci',
			'chore',
			'docs',
			'feat',
			'fix',
			'perf',
			'refactor',
			'revert',
			'style',
			'test',
			'bogusType',
		];

		const lintPromises = allowedTypes.map((type) => lintMessage(`${type}: some message`));
		const lintResults = await Promise.all(lintPromises);

		lintResults.forEach((lintResult, index) => {
			if (index < lintResults.length - 1) {
				expect(lintResult.valid).toBe(true);
			} else {
				expect(lintResult.valid).toBe(false);
			}
		});
	});

	test('Should correctly validate scope', async () => {
		const allowedScopes = [
			'scope',
			'SomeScope',
			'multiple/scopes',
		];

		const lintPromises = allowedScopes.map((scope) => lintMessage(`fix(${scope}): some message`));
		const lintResults = await Promise.all(lintPromises);

		lintResults.forEach((lintResult) => {
			expect(lintResult.valid).toBe(true);
		});
	});

	test('Should correctly validate subject', async () => {
		const allowedSubjects = [
			'Did some things',
			'Word',
			'herro',
			'fixed that THING',
		];

		const lintPromises = allowedSubjects.map((subject) => lintMessage(`fix(scope): ${subject}`));
		const lintResults = await Promise.all(lintPromises);

		lintResults.forEach((lintResult) => {
			console.log(lintResult);
			expect(lintResult.valid).toBe(true);
		})
	});
})