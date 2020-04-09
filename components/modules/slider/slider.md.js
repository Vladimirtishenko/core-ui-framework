class SliderModule {

	static defaultProps = {
		top: 'framework-top-slider',
		wrapper: 'framework-top-slider__wrapper',
 		item: 'framework-top-slider__item',
 		itemActive: 'framework-top-slider__item--active',
 		controls: 'framework-top-slider__controls',
 		controlsItem: 'framework-top-slider__controls-item',
 		controlsItemActive: 'framework-top-slider__controls-item-active',
 		directions: 'Y',
 		mode: 'slide', // fade
		auto: false,
		timer: 6000
	}

	constructor(options, $public){
		this.$public = $public;

		this.props = {...SliderModule.defaultProps, ...options};

		this.createControls();
	}

	createControls(){

		if(!_$('.' + this.props.top ) || !_$('.' + this.props.wrapper ) || !_$('.' + this.props.controls ) || !_$('.'+this.props.item)) {
			console.log(`There are "top - ${this.props.top}", "wrapper - ${this.props.wrapper}", "controls - ${this.props.controls}" not defined in Slider Module`);
			return;
		}

		let span = "";

		this.children = _$('.'+this.props.item) instanceof HTMLElement ? [_$('.'+this.props.item)] : _$('.'+this.props.item);

		for (let i = 0; i < this.children.length; i++) {
			span += (i == 0) ?
						'<span class="'+this.props.controlsItemActive+' '+ this.props.controlsItem + ' " data-item="'+i+'">'+i+'</span>' :
						'<span class="'+this.props.controlsItem+'" data-item="'+i+'">'+i+'</span>';
		}

		_$('.' + this.props.controls).insertAdjacentHTML('beforeend', span);

		this.addEvent();
		this.props.auto && this.startActing();

	}

	startActing() {
		this.active = _$(`.${this.props.controlsItemActive}`);
		const { timer } = this.props;

		this.timeout = setTimeout(() => {
			const { dataset: { item = 0 } } = this.active,
					counter = Number(item) + 1 > this.children.length - 1 ? 0 : Number(item) + 1,
					next = _$(`.${this.props.controlsItem}[data-item="${counter}"]`);

			if(!next) return;

			this.handlerEvent({target: next});
			this.startActing();
		}, timer)
	}

	autoSlide(event) {
		const { type } = event;

		switch (type) {
			case 'mouseleave':
				this.startActing();
				break;
			case 'mouseenter':
				clearTimeout(this.timeout);
				break;
			default:
				return true;
		}
	}

	addEvent(){
		let controls = _$('.'+this.props.controls);
		this.$public.helper('event').flyEvent('add', ['click'], [controls], this.handlerEvent.bind(this));
		this.$public.helper('event').flyEvent('add', ['mouseenter', 'mouseleave'], [controls], this.autoSlide.bind(this));
	}

	handlerEvent(event){
		if(!event || !event.target) return;

		let target = event.target;

		if(!target.getAttribute('data-item') || target.classList.contains(this.props.controlsItemActive)) return;

		let attr = parseInt(target.getAttribute('data-item')),
			itemMove = this.props.directions == 'Y' ? _$('.'+this.props.wrapper).firstElementChild.clientHeight : _$('.'+this.props.wrapper).firstElementChild.clientWidth,
			active = _$('.' + this.props.controlsItemActive),
			activeItem = _$('.' + this.props.itemActive);


		active.classList.remove(this.props.controlsItemActive);
		target.classList.add(this.props.controlsItemActive);

		switch (this.props.mode) {
			case 'slide':
				_$('.' + this.props.wrapper).style.cssText = "transform: translate"+this.props.directions+"(-"+(attr*itemMove)+"px)";
				break;
			case 'fade':
					activeItem && activeItem.classList.remove(this.props.itemActive);
					this.children[attr] && this.children[attr].classList.add(this.props.itemActive);
				break;
			default:
				console.log('Property "mode" don`t recognized. Available params "slide" or "fade". Your mode is "' + this.props.mode + '"');
				break;
		}

	}
}

export default SliderModule;
