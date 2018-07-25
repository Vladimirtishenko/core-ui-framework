class TabModule {

	static defaultProps = {
		tabs: 'framework-tabs',
		link: 'framework-tabs__link',
		content: 'framework-tab-content',
		tabpanel: 'framework-tabpanel',
		activeTab: 'framework-active-tab',
		activeTabPanel: 'framework-tabpanel-active',
		hide: false,
		target: true
	}

	constructor(params, $public) {

		this.$public = $public;

		this.props = {...TabModule.defaultProps, ...params};
		
		this.tablist = _$('.'+this.props.tabs);
		this.tabpanel = _$('.'+this.props.content);

		if(this.props.hide){
			this.hideTab();
		}

		this.$public.helper('event').flyEvent('add', ['click'], [this.tablist], this.actionHandler.bind(this))

	}

	hideTab(){

		for (var i = this.tabpanel.children.length - 1; i >= 0; i--) {
			this.tabpanel.children[i].classList.add('framework-tabpanel')
		}
		
	}

	actionHandler(event){

		if(!event || !event.target) return;

		let target = this.props.target ? event.target : event.target.closest('[data-id^="#"]'),
			attr = target.dataset.id || (target.closest('[data-id^="#"]') && target.closest('[data-id^="#"]').dataset.id),
			tabForActive = _$(attr),
			activeTablist = _$('.' + this.props.activeTab),
			activeTabpanel = _$('.' + this.props.activeTabPanel);

		if(!target.classList.contains(this.props.activeTab) && tabForActive){
			activeTablist.classList.remove(this.props.activeTab)
			activeTabpanel.classList.remove(this.props.activeTabPanel)

			target.classList.add(this.props.activeTab)
			tabForActive.classList.add(this.props.activeTabPanel)

		}


	}
}

export default TabModule;