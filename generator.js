
const path = require("path");
const File = require("./utils/file");
const Directory = require("./utils/directory");
const ContextManager = require("./contextManager");
const ConfigBuilder = require("./configBuilder");
const Extensions = require("./extensions");
const TemplateBuilder = require("./templateBuilder");
const { EntityBuilder } = require("dsl-model");

class Generator {
	constructor() {
		this.config = new ConfigBuilder();
		this.extensions = new Extensions(this.config);
		this.entityBuilder = new EntityBuilder(this.config);
		this.templateBuilder = new TemplateBuilder(this.config);
	}

	async run({ model, extension, template, bundle, output }) {
		await this.extensions.load(extension.path)
		await this.templateBuilder.load(template.path);

		const entities = await this.entityBuilder.buildFrom(model.path);
		const contextManager = new ContextManager(this.config, entities);

		while(contextManager.next()){
			const context = contextManager.create();

			for(const i in bundle){
				const templateName = bundle[i].template;
				const saveToTemplate = bundle[i].saveTo;

				const {result, saveTo} = await this.templateBuilder.run(templateName, context, saveToTemplate);

				await this.save({result, saveTo, output});
			}
		}
	}

	async save({result, saveTo, output}){
		const fullPath = path.join(output, saveTo);
		const pathDir = path.dirname(fullPath);
		await Directory.create(pathDir);
		await File.write(fullPath, result);
		console.log(`File was created ${fullPath}`);

	}

}

module.exports = Generator;



