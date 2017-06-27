import module from './rates.md.js';

class Rates {

	constructor($public){
		this.$public = $public;
	}

	/**
	 *
	 * Required params
	 * el - wrapper element for all rate stars
	 * empty - class empty star
	 * full - class full star
	 * input - element which get value
	 *
	 *
	 *
	 * Structure HTML 
	 *   <div class="goods__comments-rate-add flex-container justify-content-start align-items-center">
     *      <span data-rate="1" class="goods__comments-rate-star-empty"></span>
     *      <span data-rate="2" class="goods__comments-rate-star-empty"></span>
     *      <span data-rate="3" class="goods__comments-rate-star-empty"></span>
     *      <span data-rate="4" class="goods__comments-rate-star-empty"></span>
     *      <span data-rate="5" class="goods__comments-rate-star-empty"></span>
     *   </div>
     *   <input class="goods__comments-rate-value" type="hidden" name="rating" value="0">
	 */
	

	getRate(el, empty, full, input){
		new module(el, empty, full, input, this.$public);
	}

}

export default Rates;