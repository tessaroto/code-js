const ContextBuilder = require("./contextBuilder");
const ConfigBuilder = require("./configBuilder");
const Extensions = require("./extensions");
const Generator = require("./generator");

module.exports = { 
	ContextBuilder,
	ConfigBuilder,
	Extensions,
	Generator
}



// const { EntityBuilder } = require("dsl-model");
// const ContextBuilder = require("./contextBuilder");
// const ConfigBuilder = require("./configBuilder");

// const Extensions = require("./extensions");
// const Velocity = require('velocityjs');

// let config = new ConfigBuilder();
// const extensions = new Extensions(config);

// async function main() {

// 	await extensions.load('../test/extensions')

// 	const entityBuilder = new EntityBuilder(config);
// 	const path = '../test/model';

// 	let entities = await entityBuilder.buildFrom(path);

// 	const contextBuilder = new ContextBuilder(config, entities);

// 	while(contextBuilder.next()){
// 		console.log("--------------------")
// 		const context = contextBuilder.create();
// 		const result = Velocity.render('string of velocity $entity.comment    pk: $attribute', context, null);

// 		console.log(result);
// 	}
// }


// const files = main().catch(error => console.error(error)).then(v => {
//   //console.log(v);  // exibe 60 depois de 2 segundos.
// });;
