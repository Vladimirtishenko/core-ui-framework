class AccordeonModule {
	constructor(wrapElement, linkClass, subClass, auto, $public){

		this.wrapper = wrapElement;
		this.linkClass = linkClass;
		this.subClass = subClass;
		this.active = 'framework-accordeon-open';
		this.auto = auto;
		this.$public = $public;

		this.$public.helper('event').flyEvent('add', ['click'], [this.wrapper], this.generateAccordeon.bind(this))

		return this.getAllPublic();

	}

	generateAccordeon(event){
		if(!event || !event.target || !event.target.classList.contains(this.linkClass)) return;

		event.stopPropagation && event.stopPropagation();

		let {t, sub, sH, sSH} = this.getNeedVariables(event.target);

		if(!sub) return;

		this.transitionEvent = this.transitionEnd.bind(this, sub, sSH);

		if(t.classList.contains(this.active)){
			this.closeState(t, sub, sSH, sH)
		} else {
			this.closePrevious();
			t.classList.add(this.active);
			sub.style.cssText += "height: " + (sSH || sH) + "px";
			this.$public.helper('event').flyEvent('add', ['transitionend'], [sub], this.transitionEvent)
		}
	}

	closePrevious(){
		if(!this.auto) return;

		let active = document.querySelector('.'+this.active);

		if(!active) return;
		
		let {t, sub, sH, sSH} = this.getNeedVariables(active);

		this.closeState(t, sub, sSH, sH)

	}

	transitionEnd(sub, subStaticHeight, event){
		if(event.propertyName == "height"){
			if(!subStaticHeight) {
				sub.style.cssText += "height: auto";
			}
			this.$public.helper('event').flyEvent('remove', ['transitionend'], [sub], this.transitionEvent)
		}
	}

	closeState(target, sub, sSH, sH){

		target.classList.remove(this.active);
		sub.style.cssText += "height: " + (sSH || sH) + "px";
		window.getComputedStyle(sub).height;
		sub.style.cssText += "height: " + 0 + "px";

	}

	getNeedVariables(target){

		let self = this,
			variable = {};

			variable.t = target;
			variable.sub = target.parentNode.querySelector('.' + self.subClass);
			variable.sSH = variable.sub.getAttribute('data-static-width');
			variable.sH =  variable.sub && variable.sub.firstElementChild.clientHeight;


		return variable;
	}


	getAllPublic(){

		let self = this;

		return {
			__destroy: self.__destroy.bind(this)
		}

	}

	/**
	 *
	 * Public method which close all state of accordeon
	 *  
	 *
	 */
	
	__destroy(func){
		if(func) {
			func();
			return;
		}

		let target = document.querySelectorAll('.'+this.active);

		if(target.length < 1) return;

		for (var i = 0; i < target.length; i++) {

			let {t, sub, sH, sSH} = this.getNeedVariables(target[i]);

			this.closeState(t, sub, sSH, sH);
			
		}


	}
}

export default AccordeonModule;