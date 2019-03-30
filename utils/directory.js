const { join } = require('path')
const { mkdir } = require('fs')
const { promisify } = require('util')
const mkdirAsync = promisify(mkdir)

class Directory{

	static async create(path) {
    return await mkdirAsync(path, { recursive: true });
	}

}

module.exports = Directory;
