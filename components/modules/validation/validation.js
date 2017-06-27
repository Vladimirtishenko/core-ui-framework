'use strict';

import ValidationModule from './validation.md.js'

class ValidationFacade {
	constructor($public){
		this.$public = $public;
		this.module = new ValidationModule(this.$public);
	}

	validationString(){
		
	}

	validationEmail(){

	}

	validationUrl(){

	}

	validationSelect(){

	}

	validationHidden(){

	}

	fullValidation(field, form, format){
		return this.module.fullValidation(field, form, format);
	}
}

export default ValidationFacade;