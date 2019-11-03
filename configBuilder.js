
class ConfigBuilder{
	constructor() {
    this.entity = this.entity || {};
    this.entity.annotations = this.entity.annotations || {};
    this.attribute = this.attribute || {};
    this.attribute.annotations = this.attribute.annotations || {};
    this.attribute.types = ["Int", "String", "Float", "Boolean"]
    this.background = {};
	}

	config() {
		return this.config;
	}
	
}

module.exports = ConfigBuilder;
