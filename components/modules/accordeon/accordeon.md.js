class AccordeonModule {

	static defaultProps = {
		parent: null,
		wrapper: 'framework-accordeon',
		linkClass: 'framework-accordeon-link',
		subClass: 'framework-accordeon-sub',
		active: 'framework-accordeon-open',
		auto: true
	}


	constructor(params, $public){


		this.props = {...AccordeonModule.defaultProps, ...params};

		this.wrapper = this.props.parent ? _$('.'+this.props.wrapper, _$('.'+this.props.parent)) : _$('.'+this.props.wrapper);

		console.log(this.wrapper);

		if(!this.wrapper) return;

		this.$public = $public;

		this.$public.helper('event').flyEvent('add', ['click'], [this.wrapper], this.generateAccordeon.bind(this))

		return this.getAllPublic();

	}

	generateAccordeon(event){
		if(!event || !event.target || !event.target.classList.contains(this.props.linkClass)) return;

		event.stopPropagation && event.stopPropagation();

		let {t, sub, sH, sSH} = this.getNeedVariables(event.target);

		if(!sub) return;

		this.transitionEvent = this.transitionEnd.bind(this, sub, sSH);

		if(t.classList.contains(this.props.active)){
			this.closeState(t, sub, sSH, sH)
		} else {
			this.closePrevious();
			t.classList.add(this.props.active);
			sub.style.cssText += "height: " + (sSH || sH) + "px";
			this.$public.helper('event').flyEvent('add', ['transitionend'], [sub], this.transitionEvent)
		}
	}

	closePrevious(){
		if(!this.props.auto) return;

		let active = document.querySelector('.'+this.props.active);

		if(!active) return;

		let {t, sub, sH, sSH} = ::this.getNeedVariables(active);

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

		target.classList.remove(this.props.active);
		sub.style.cssText += "height: " + (sSH || sH) + "px";
		window.getComputedStyle(sub).height;
		sub.style.cssText += "height: " + 0 + "px";

	}

	getNeedVariables(target){

		let variable = {};

			variable.t = target;
			variable.sub = target.parentNode.querySelector('.' + this.props.subClass);
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

		let target = document.querySelectorAll('.'+this.props.active);

		if(target.length < 1) return;

		for (var i = 0; i < target.length; i++) {

			let {t, sub, sH, sSH} = this.getNeedVariables(target[i]);

			this.closeState(t, sub, sSH, sH);

		}


	}
}

export default AccordeonModule;
