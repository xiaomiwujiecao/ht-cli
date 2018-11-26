var colors = require('colors');
var Template = require('../template')
var fs = require('fs')
var v = require('voca')
// set theme
colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red'
});
const moment = require("moment");
module.exports = {
	range(val) {
		return val.split('..').map(Number);
	},
	list(val) {
		return val.split(',');
	},
	collect(val, memo) {
		memo.push(val);
		return memo;
	},
	increaseVerbosity(v, total) {
		return total + 1;
	},
	// write angular.js template
	writeAngularHtml(dir, name) {
		console.log('dir::'.info, dir)
		console.log('name::'.info, name)
		const T = Template.angular(name)
		const nameHTML = `${name}.html`
		const nameAddHTML = `${name}.add.html`
		const nameListHTML = `${name}.list.html`
		const nameEditorHTML = `${name}.editor.html`
		try {
			// write into HTML template
			fs.writeFileSync(`${dir}/${nameHTML}`, `${T[nameHTML]}`, 'utf8')
			fs.writeFileSync(`${dir}/${nameAddHTML}`, `${T[nameAddHTML]}`, 'utf8')
			fs.writeFileSync(`${dir}/${nameListHTML}`, `${T[nameListHTML]}`, 'utf8')
			fs.writeFileSync(`${dir}/${nameEditorHTML}`, `${T[nameEditorHTML]}`, 'utf8')
			// write into  service
			fs.writeFileSync(`portal/frontend/src/js/app.${name}.js`, T.APP, 'utf8')
			fs.writeFileSync(`portal/frontend/src/js/controllers.${name}.js`, T.CONTROLLER, 'utf8')
			fs.writeFileSync(`portal/frontend/src/js/services.${name}.js`, T.SERVICES, 'utf8')

		} catch (err) {
			console.log(err)
		}
	},
	writeModelApiService(name) {
		var T = Template.apiModelService(name)
		const MODEL = `${v.capitalize(name)}.js`
		const SERVICE = `${name}Service.js`
		const API = `${name}.js`
		const AJAX = `${name}s.js`

		try {
			fs.writeFileSync(`portal/models/${MODEL}`, T.MODEL, 'utf8')
			fs.writeFileSync(`portal/services/${SERVICE}`, T.SERVICE, 'utf8')
			fs.writeFileSync(`portal/routes/api/${API}`, T.API, 'utf8')
			fs.writeFileSync(`portal/routes/ajax/${AJAX}`, T.SERVICE, 'utf8')
		} catch (err) {
			console.log(err)
		}
	}

}