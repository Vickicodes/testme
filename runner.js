const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const render = require('./render');

const ignoreDirs = [ 'node_modules' ];

class Runner {
	constructor() {
		this.testFiles = [];
	}

	async collectFiles(targetPath) {
		console.log(chalk.yellow('==== Collecting files ===='));
		const files = await fs.promises.readdir(targetPath);

		console.log(chalk.yellow('==== looking for .test.js files ===='));
		for (let file of files) {
			const filePath = path.join(targetPath, file);
			const stats = await fs.promises.lstat(filePath);

			if (stats.isFile() && file.includes('.test.js')) {
				this.testFiles.push({ name: filePath, shortName: file });
			} else if (stats.isDirectory() && !ignoreDirs.includes(file)) {
				const childFiles = await fs.promises.readdir(filePath);

				files.push(...childFiles.map((f) => path.join(file, f)));
			}
		}
	}

	async runTests() {
		for (let file of this.testFiles) {
			console.log(chalk.cyan(`==== Running Tests on ${file.shortName}====`));
			const beforeEaches = [];
			global.render = render;
			global.beforeEach = (fn) => {
				beforeEaches.push(fn);
			};

			global.it = async (desc, fn) => {
				beforeEaches.forEach((func) => func());
				try {
					await fn();
					console.log(chalk.green(`\tPASSED - ${desc}`));
				} catch (err) {
					const message = err.message.replace(/\n/g, '\n\t\t');
					console.log(chalk.red(`\tFAILED - ${desc}`));
					console.log(chalk.red('\t', message));
				}
			};

			try {
				require(file.name);
			} catch (err) {
				console.log(err);
			}
		}
	}
}

module.exports = Runner;
