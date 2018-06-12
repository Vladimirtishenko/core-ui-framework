import module from './tab.md.js';

class TabFacade {
	constructor($public) {
		this.$public = $public;
	}

	/**
	 *
	 * Tab container must have:
	 * (HTML) .framework-tabs > a.framework-tabs__link(data-id='CONTENT_ID')
	 * (HTML) .framework-tab-content > div.framework-tabpanel(id='CONTENT_ID')
	 * Params: {}  
	 */
	
	getTab(option = {}){
		new module(option, this.$public)
	}
}

export default TabFacade;