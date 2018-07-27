import module from './accordeon.md.js';

class AccordeonFacade {
	constructor($public){
		this.$public = $public;
	}

	/**
	 *
	 * Required structure
	 * (HTML) .framework-accordeon > elements > .framework-accordeon-link + .framework-accordeon-sub
	 *
	 * Required params
		{
			wrapper: 'framework-accordeon', - wrapper accordeon
			linkClass: 'framework-accordeon-link', - class for event click
			subClass: 'framework-accordeon-sub', - class for hidden content
			active: 'framework-accordeon-open',
			auto: true
		}
	 */

	getAccordeon(options = {}){
		return new module(options, this.$public);
	}
}

export default AccordeonFacade;