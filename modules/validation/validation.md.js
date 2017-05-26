class ValidationModule {
	constructor($public){
		this.$public = $public;
		this.invalid = 'framework-invalid';
		this.form = 'flamework-form';
	}


	fullValidation(field, form, format){
		let element = form.elements;

		try {
			form.removeEventListener("focus", this.takeOffEvent);
		} catch(e){}

		form.addEventListener("focus", this.takeOffEvent, true);

		this.state = true;
		this.params = null;

		for (var i = element.length - 1; i >= 0; i--) {
			if(!this.checkField(element[i], field, format)){
				this.state = false;
				break;
			}
		}

		return {state: this.state, params: this.params};

	}

	setParams(format, el){

		if(format == 'json'){
			if(this.params == null || typeof this.params != 'object'){
				this.params = {};
			}

			if(this.params[el.name] && !(this.params[el.name] instanceof Array)){
				let value = this.params[el.name];

				this.params[el.name] = [value, el.value];

			} else if(this.params[el.name]) {
				this.params[el.name].push(el.value);

			} else {
				this.params[el.name] = el.value;
			}

		} else if(format == 'string') {

			if(typeof this.params != 'string'){
				this.params = '';
			}

			this.params += el.name+"="+el.value+"&";

		}

	}

	takeOffEvent(event){

		let element = this,
			invalid = _$('.framework-invalid', element);

		try {
			invalid.classList.remove('framework-invalid');
		} catch(e){
			try {
				for (let i = 0; i < invalid.length; i++) {
					invalid[i].classList.remove('framework-invalid');
				}
			} catch(e){
				console.log(e);
			}
		}

		

	}

	checkField(el, field, format){

		for(let key in field){
			if(key == el.name){

				if(field[key].required && el.value.length < 0){
					el.classList.add(this.invalid);
					return false;
				}

				if(field[key].pattern && !field[key].pattern.test(el.value)){
					el.classList.add(this.invalid);
					return false;
				}

				this.setParams(format, el);

			}
		}

		return true;

	}
}

export default ValidationModule;