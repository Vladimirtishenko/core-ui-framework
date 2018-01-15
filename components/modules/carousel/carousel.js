import module from './carousel.md.js'

/**
 *
 * Required params:
 * (HTML)Wraper class .frame-carousel 
 *		  	consist of: .frame-carousel > ul.frame-carousel__list > li.frame-carousel__item
 *				   and: .frame-carousel-controls > span(data-controls="*")	
 *
 */

 /**
  *
  * Params options
  * {
  *		wrap: Element,
  *		margin: Number,
  *		direction: String (e.g: translateX),
  *		preview: Boolean,
  *		count: Number
  *		
  *	}
  *
  */
 


class CarouselFacade {
	constructor($public) {
		this.$public = $public;
	}

	getCarousel(options){
		return new module(options, this.$public);
	}
}

export default CarouselFacade;