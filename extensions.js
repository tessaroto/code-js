const File = require("./utils/file");
const path = require('path');

class Extensions{
	constructor(config) {
		this.config = config || {};
	}

	async load(extPath) {
		const fullPath = path.join(process.cwd(), extPath);
    const files = await File.list(fullPath, ".extension");

    await files.forEach(this.loadExtension.bind(this));

    return this.config;
	}

	async loadExtension(file){
		const extension = require(file);

		await extension.scope.forEach(async (scope)=>{
			
			this.config[scope].annotations[extension.name] = {
				params: extension.params || {},
				onCreateContext: extension.onCreateContext || null
			};

		});
	}

}

module.exports = Extensions;
