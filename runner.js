const fs = require('fs');
const path = require('path');

class Runner {
	constructor() {
		this.testFiles = [];
	}

	async collectFiles(targetPath) {
		console.log('==== Collecting files ====');
		const files = await fs.promises.readdir(targetPath);

		console.log('==== looking for .test.js files ====');
		for (let file of files) {
			const filePath = path.join(targetPath, file);
			const stats = await fs.promises.lstat(filePath);

			if (stats.isFile() && file.includes('.test.js')) {
				this.testFiles.push({ name: filePath });
			} else if (stats.isDirectory()) {
				const childFiles = await fs.promises.readdir(filePath);

				files.push(...childFiles.map((f) => path.join(file, f)));
			}
		}
	}

	async runTests() {
		console.log('==== Running Tests ====');
		for (let file of this.testFiles) {
			require(file.name);
		}
	}
}

module.exports = Runner;
