const { join } = require('path')
const { readdir, readFile, writeFile } = require('fs')
const { promisify } = require('util')

const readdirAsync = promisify(readdir)
const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class File{
	static async list(dir, extension = []) {
    const files = (await readdirAsync(dir)).map(f => join(dir, f))
    return files.filter((file)=>{
    	return file.endsWith(extension);
    });
	}

	static async read(path) {
    return await readFileAsync(path, "utf8");
	}

	static async write(path, data) {
    return await writeFileAsync(path, data);
	}


// 	fs = require('fs');
// fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
//     if (err) 
//         return console.log(err);
//     console.log('Wrote Hello World in file helloworld.txt, just check it');
// });


}

module.exports = File;
