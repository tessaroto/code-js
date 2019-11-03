const Velocity = require('velocityjs');
const File = require("./utils/file");
const path = require('path');

class TemplateBuilder{
	constructor(config) {
		this.config = config || {};
		this.templates = {};
		this.extensionFiles = ".template";
	}

	geTemplates(){
		return Object.keys(this.templates);
	}

	getTemplate(templateName){
		return this.templates[templateName];
	}

	async run(templateName, context){
		const template = this.getTemplate(templateName);

		const macros = {
		    saveTo: function(path) {
		    	context.saveTo = path;
		    	return "";
	    }
    }
    context.saveTo = null;
		const result = Velocity.render(template, context, macros);
		const saveTo = context.saveTo;

		return {result, saveTo};
	}

	async load(templatePath) {
		const fullPath = path.join(process.cwd(), templatePath);
	    const files = await File.list(fullPath, this.extensionFiles);
	   

	    for(var i in files){
	    	const file = files[i];
	    	const filename = path.basename(file);
				const templateName = filename.substring(0, filename.length - this.extensionFiles.length);
				const raw = await File.read(file);
				this.templates[templateName] = raw;
	    }
	    return this.templates;
	}


	
}

module.exports = TemplateBuilder;
