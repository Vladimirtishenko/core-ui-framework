import module from './carousel.md.js'

/**
 *
 * Required params:
 * (HTML)Wraper class .frame-carousel 
 *		  	consist of: .frame-carousel > ul.frame-carousel__list > li.frame-carousel__item
 *				   and: .frame-carousel-controls > span(data-controls="*")	
 *
 */


class CarouselFacade {
	constructor($public) {
		this.$public = $public;
	}

	getCarousel(wrap, margin, direction, needPreview, minCount){
		return new module(wrap, margin, direction, needPreview, minCount, this.$public);
	}
}

export default CarouselFacade;