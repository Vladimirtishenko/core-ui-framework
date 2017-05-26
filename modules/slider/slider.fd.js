import module from './slider.md.js';

class Slider {
	constructor($public){
		this.$public = $public;
	}

	/**
	 *
	 * Required HTML structure
	 * .framework-top-slider > .framework-top-slider__wrapper > .framework-top-slider__item(style="background-image: img")
	 * Must have 2 or more block with class .framework-top-slider__item
	 * Example options: 
	 *	{
	 *		top: _$('.framework-top-slider'),
	 *		wrapper: _$('.framework-top-slider__wrapper'),
	 *		item: 'framework-top-slider__item',
	 *		controls: 'framework-top-slider__controls',
	 *		controlsItem: 'framework-top-slider__controls-item',
	 *		controlsItemActive: 'framework-top-slider__controls-item-active',
	 *		directions: 'Y' || 'X',
	 *	}
	 */
	

	getSlider(options){
		new module(options, this.$public);
	}
}

export default Slider;