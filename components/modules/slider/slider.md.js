class SliderModule {
	constructor(options, $public){
		this.$public = $public;

		this.options = {
			top: _$('.framework-top-slider'),
	 		wrapper: _$('.framework-top-slider__wrapper'),
	 		item: 'framework-top-slider__item',
	 		controls: 'framework-top-slider__controls',
	 		controlsItem: 'framework-top-slider__controls-item',
	 		controlsItemActive: 'framework-top-slider__controls-item-active',
	 		directions: 'Y'
		}

		this.optionsGenerate(options);
		this.createControls();
	}

	optionsGenerate(options){

		for(let key in options){

			if(this.options[key] != ''){
				this.options[key] = options[key];
			}
			
		}

	}

	createControls(){

		let span = "",
			children = _$('.'+this.options.item);

		for (let i = 0; i < children.length; i++) {
			span += (i == 0) ? '<span class="'+this.options.controlsItemActive+' '+ this.options.controlsItem + ' " data-item="'+i+'"></span>' : '<span class="'+this.options.controlsItem+'" data-item="'+i+'"></span>'
		}

		let wrapperControls = '<div class="'+this.options.controls+'">'+span+'</div>';


		if(!this.options.top) {
			throw 'Class mismatch';
			return;
		}

		this.options.top.insertAdjacentHTML('beforeend', wrapperControls);

		this.addEvent();

	}

	addEvent(){
		let controls = _$('.'+this.options.controls);
		this.$public.helper('event').flyEvent('add', ['click'], [controls], this.handlerEvent.bind(this));
	}

	handlerEvent(event){
		if(!event || !event.target) return;

		let target = event.target;

		if(!target.getAttribute('data-item') || target.classList.contains('.' + this.options.controlsItemActive)) return;

		let attr = parseInt(target.getAttribute('data-item')),
			itemHeight = this.options.wrapper.firstElementChild.clientHeight,
			active = _$('.' + this.options.controlsItemActive);

		active.classList.remove(this.options.controlsItemActive);
		target.classList.add(this.options.controlsItemActive);

		this.options.wrapper.style.cssText = "transform: translate"+this.options.directions+"(-"+(attr*itemHeight)+"px)"

	}
}

export default SliderModule;