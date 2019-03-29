const { Generator } = require("./");


const generator = new Generator({
	modelPath: "../test/model", 
	extensionPath: "../test/extensions",
	templatePath: "../test/templates",
});


const bundle = [
	{
		template: "test",
		saveTo: "/tessaroto/code-gen/test/output/graphql/${entity.name.toLowerCase()}.js"
	}
]

const files = generator.run(bundle).catch(error => console.error(error)).then(v => {
  //console.log(v);  // exibe 60 depois de 2 segundos.
});;