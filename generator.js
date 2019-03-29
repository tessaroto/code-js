// const { ContextBuilder, ConfigBuilder, Extensions } = require("./");
const ContextBuilder = require("./contextBuilder");
const ConfigBuilder = require("./configBuilder");
const Extensions = require("./extensions");
const TemplateBuilder = require("./templateBuilder");
const { EntityBuilder } = require("dsl-model");

class Generator {
	constructor({ modelPath, extensionPath, templatePath }) {
		this.modelPath = modelPath
		this.extensionPath = extensionPath;
		this.templatePath = templatePath;
		this.config = new ConfigBuilder();
		this.extensions = new Extensions(this.config);
		this.entityBuilder = new EntityBuilder(this.config);
		this.templateBuilder = new TemplateBuilder(this.config);
	}

	async run(bundle) {
		await this.extensions.load(this.extensionPath)
		await this.templateBuilder.load(this.templatePath);

		const entities = await this.entityBuilder.buildFrom(this.modelPath);
		const contextBuilder = new ContextBuilder(this.config, entities);

		while(contextBuilder.next()){
			const context = contextBuilder.create();

			for(const i in bundle){
				const templateName = bundle[i].template;
				const saveToTemplate = bundle[i].saveTo;

				const {result, saveTo} = await this.templateBuilder.run(templateName, context, saveToTemplate);

				console.log(`\n---------- ${context.entity.name}: ${saveTo}  ----------`)
				console.log(result);
			}

		}
	}
}

module.exports = Generator;



