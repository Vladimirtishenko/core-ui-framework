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
	 * Params: 
	 * 1) hide - if need all show tabs and hide after load  
	 */
	
	getTab(hide){
		new module(hide, this.$public)
	}
}

export default TabFacade;