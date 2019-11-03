const { Generator } = require("./");


const config = {
	model: {
		path: "../test/models"
	}, 
	extension: {
		path: "../test/extensions"
	}, 
	template: {
		path: "../test/templates"
	} 
}

const generator = new Generator(config);


const project = {	
	output: "/Users/rafael/workspace/code-gen/test/output/",
	entityFilter: ['Sku'],
	templateFilter: ['backend_js', 'resolver_js'],
	
}

const files = generator.run(project).catch(error => console.error(error)).then(v => {});;


