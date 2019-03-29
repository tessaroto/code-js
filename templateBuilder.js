const Velocity = require('velocityjs');
const File = require("./utils/file");
const path = require('path');

class TemplateBuilder{
	constructor(config) {
		this.config = config || {};
		this.templates = [];
		this.extensionFiles = ".template";
	}

	getTemplate(templateName){
		return this.templates[templateName];
	}

	async run(templateName, context, saveToTemplate){
		const template = this.getTemplate(templateName);

		const result = Velocity.render(template, context, null);
		const saveTo = Velocity.render(saveToTemplate, context, null);

		return {result, saveTo};
	}

	async load(templatePath) {
		const fullPath = path.join(process.cwd(), templatePath);
    const files = await File.list(fullPath, this.extensionFiles);

    await files.forEach(this.loadTemplate.bind(this));

    return this.templates;
	}


	async loadTemplate(file){
		const filename = path.basename(file);
		const templateName = filename.substring(0, filename.length - this.extensionFiles.length);
		const raw = await File.read(file);

		this.templates[templateName] = raw;
	}
}

module.exports = TemplateBuilder;
