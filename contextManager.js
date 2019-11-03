
class ContextManager{
	constructor(config, entities, entityFilter) {
		this.config = config;
		this.entities = entities;
		this.entityFilter = entityFilter;
		this.entityNames = Object.keys(entities);
		this.currentIndex = -1;

	}

	next() {
		return this.entityFilter.length-1 > this.currentIndex++;
	}

	getCurrentEntity() {
		return this.entities[this.entityFilter[this.currentIndex]];
	}

	create() {
		const context = {
			entities: this.entities,
			entity: this.getCurrentEntity()
		};
		this.onCreateContext(context);
		return context;
	}

	onCreateContext(context){
		const entity = this.getCurrentEntity();

		Object.values(this.config.background).forEach((background)=>{
			const conf = background;
			if(conf.onCreateContext)
				conf.onCreateContext(context, entity)
		});		

		Object.values(entity.annotations).forEach((annotation)=>{
			const conf = this.config.entity.annotations[annotation.name];
			if(conf.onCreateContext)
				conf.onCreateContext(context, entity, annotation.params)
		});


		entity.attributes.forEach((attribute)=>{
			attribute.annotations.forEach((annotation)=>{

				const conf = this.config.attribute.annotations[annotation.name];
				if(conf.onCreateContext)
					conf.onCreateContext(context, attribute, annotation.params)

			});
		});


	}
}

module.exports = ContextManager;
