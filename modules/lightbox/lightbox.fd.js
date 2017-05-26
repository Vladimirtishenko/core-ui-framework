import module from './lightbox.md.js';

class Lighbox {

	constructor($public){
		this.$public = $public;
	}

	/**
	 *
	 * Required params
	 * el - wrapper element for all images
	 * item - class child items (For example: <figure class="!!!item!!!"><img alt="" src=""/></figure>)
	 * clicked - class for element which activate lightbox
	 * imgClass - class for img which will be show in popup modal (For example: <figure class="!!!item!!!"><img class="!!!imgClass!!!" alt="" src=""/></figure>)
	 * zoom - default value is false, if true - zoom activated
	 *
	 */
	

	getLightbox(el, item, clicked, imgClass, zoom = false){
		new module(el, item, clicked, imgClass, zoom, this.$public);
	}

}

export default Lighbox;