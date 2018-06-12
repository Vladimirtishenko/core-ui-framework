class SliderModule {

	static defaultProps = {
		top: 'framework-top-slider',
		wrapper: 'framework-top-slider__wrapper',
 		item: 'framework-top-slider__item',
 		controls: 'framework-top-slider__controls',
 		controlsItem: 'framework-top-slider__controls-item',
 		controlsItemActive: 'framework-top-slider__controls-item-active',
 		directions: 'Y'
	}

	constructor(options, $public){
		this.$public = $public;

		this.props = {...SliderModule.defaultProps, ...options};

		this.createControls();
	}

	createControls(){

		let span = "",
			children = _$('.'+this.props.item);

		if(!_$('.' + this.props.top ) || !_$('.' + this.props.wrapper ) || !children) {
			console.log('There are "top", "wrapper", "controls" not defined in Slider Module');
			return;
		}

		for (let i = 0; i < children.length; i++) {
			span += (i == 0) ? 
						'<span class="'+this.props.controlsItemActive+' '+ this.props.controlsItem + ' " data-item="'+i+'"></span>' : 
						'<span class="'+this.props.controlsItem+'" data-item="'+i+'"></span>';
		}

		let wrapperControls = '<div class="'+this.props.controls+'">'+span+'</div>';

		this.props.top.insertAdjacentHTML('beforeend', wrapperControls);

		this.addEvent();

	}

	addEvent(){
		let controls = _$('.'+this.props.controls);
		this.$public.helper('event').flyEvent('add', ['click'], [controls], this.handlerEvent.bind(this));
	}

	handlerEvent(event){
		if(!event || !event.target) return;

		let target = event.target;

		if(!target.getAttribute('data-item') || target.classList.contains(this.props.controlsItemActive)) return;

		let attr = parseInt(target.getAttribute('data-item')),
			itemHeight = _$('.'+this.props.wrapper).firstElementChild.clientHeight,
			active = _$('.' + this.props.controlsItemActive);

		active.classList.remove(this.props.controlsItemActive);
		target.classList.add(this.props.controlsItemActive);

		_$('.' + this.props.wrapper).style.cssText = "transform: translate"+this.props.directions+"(-"+(attr*itemHeight)+"px)"

	}
}

export default SliderModule;