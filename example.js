const { Generator } = require("./");


const generator = new Generator();


const project = {

	model: {
		path: "../test/model"
	}, 
	extension: {
		path: "../test/extensions"
	}, 
	template: {
		path: "../test/templates"
	}, 
	output: "/tessaroto/code-gen/test/output/",
	bundle:[
		{
			template: "backend_js",
			saveTo: "backends/${entity.name.toCamelCase()}.js"
		},
		{
			template: "resolver_js",
			saveTo: "graphql/${entity.name.toKebabCase()}/resolver.js"
		}
	]
}

const files = generator.run(project).catch(error => console.error(error)).then(v => {});;