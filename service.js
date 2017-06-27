import Config from './config/config.js';
import ErrorHelper from './components/helper/error.js';

class ServiceLocator {
	constructor(App) {
		this.config = Config;
		this.app = App;
		this.classes = {}
		this.public = {
			'module': this.getModule.bind(this),
			'helper': this.getHelper.bind(this),
			'app': this.getApp.bind(this)
		};
		this.registrationModule(this.config, null);

		window.$app = {m:this.public.module, h: this.public.helper};
		
	}

	registrationModule(config, option){
		
		for(let key in config){

			if(typeof config[key] == 'object' && !this.classes[key]){
				this.classes[key] = {};
				this.registrationModule(config[key], key);
			} else {

				let url = (option == 'modules') ? option + '/' + key + '/' + config[key] : option + '/' + config[key];

				let module = require("./components/" + url + '.js').default;

				this.setModule(key, option, module);
			}

		}

	}

	getModule(name){
		if(this.classes['modules'][name]){
			return this.classes['modules'][name];
		} else{
			throw ErrorHelper.error(404);
		}
	}

	getHelper (name){
		if(this.classes['helper'][name]){
			return this.classes['helper'][name];
		} else{
			throw ErrorHelper.error(404);
		}
	}

	getApp(name){
		if(this.app[name]){
			return this.app[name];
		} else{
			throw ErrorHelper.error(404);
		}
	}

	setModule(key, option, module){
		if(option == 'helper'){
			this.classes[option][key] = module;
		} else {
			this.classes[option][key] = new module(this.public);
		}
		
	}

}

export default ServiceLocator;