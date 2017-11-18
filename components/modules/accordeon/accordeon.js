import module from './accordeon.md.js';

class AccordeonFacade {
	constructor($public){
		this.$public = $public;
	}

	/**
	 *
	 * Required structure
	 * (HTML) ul.framework-accordeon > elements(li) > .framework-accordeon-link + .framework-accordeon-sub
	 *
	 * Required params
	 * wrapElement - wrapper accordeon
	 * linkClass - class for event click
	 * subClass - class for hidden content
	 */

	getAccordeon(wrapElement, linkClass, subClass, auto){
		return new module(wrapElement, linkClass, subClass, auto, this.$public);
	}
}

export default AccordeonFacade;