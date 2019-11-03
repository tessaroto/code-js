
const path = require("path");
const File = require("./utils/file");
const Directory = require("./utils/directory");
const ContextManager = require("./contextManager");
const ConfigBuilder = require("./configBuilder");
const Extensions = require("./extensions");
const TemplateBuilder = require("./templateBuilder");
const { EntityBuilder } = require("dsl-js");

class Generator {
	constructor({ model, extension, template}) {
		this.model = model;
		this.extension = extension;
		this.template = template;
		this.config = new ConfigBuilder();
		this.extensions = new Extensions(this.config);
		this.entityBuilder = new EntityBuilder(this.config);
		this.templateBuilder = new TemplateBuilder(this.config);
	}
	
	async objectFilter(obj, filter) {
		var result = Object.assign({}, obj);
		Object.keys(obj).forEach((key)=>{
				if (filter && !filter.includes(key)) 
					delete result[key];
			})
		return result;
	}

	async findEntities() {
		return await this.entityBuilder.buildFrom(this.model.path)
	}

	async findTemplates(templateFilter) {
		const templates = await this.templateBuilder.load(this.template.path);
		return await this.objectFilter(templates, templateFilter);
	}

	async run({ output, entityFilter, templateFilter }) {

		await this.extensions.load(this.extension.path)

		const entities = await this.findEntities();
		const templates = await this.findTemplates(templateFilter);
		const contextManager = new ContextManager(this.config, entities, (entityFilter || Object.keys(entities)));

		while(contextManager.next()){
			const context = contextManager.create();
			await Object.keys(templates).forEach(async (templateName)=>{
				const {result, saveTo} = await this.templateBuilder.run(templateName, context);
				if (!saveTo)
					throw Error(`Template error: Export path didn't defined, please add in template #saveTo("{path}") in template ${templateName}`)
				
				await this.save({result, saveTo, output});
			}, this)
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



