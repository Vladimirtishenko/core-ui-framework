class TabModule {

	static defaultProps = {
		tabs: 'framework-tabs',
		link: 'framework-tabs__link',
		content: 'framework-tab-content',
		tabpanel: 'framework-tabpanel',
		activeTab: 'framework-active-tab',
		activeTabPanel: 'framework-tabpanel-active',
		hide: false,
		target: true,
		smooth: true,
		history: false,
		onChange: null
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

	onChange(id){
		const { onChange } = this.props;

		if(onChange) {
			onChange(id);
		}

	}

	actionHandler(event){

		event.preventDefault()

		if(!event || !event.target) return;

		const { target: elementTarget, activeTab, activeTabPanel, smooth, history} = this.props,
			  { target: eventTarget } = event,
				target = elementTarget ? eventTarget : eventTarget.closest('[data-id^="#"]'),
				attr = target.dataset.id || (target.closest('[data-id^="#"]') && target.closest('[data-id^="#"]').dataset.id),
				tabForActive = _$(attr),
				activeTablist = _$('.' + activeTab),
				activeTabpanel = _$('.' + activeTabPanel);

		if(!target.classList.contains(activeTab) && tabForActive){
			activeTablist.classList.remove(activeTab)
			activeTabpanel.classList.remove(activeTabPanel)

			target.classList.add(activeTab)
			tabForActive.classList.add(activeTabPanel)

		}

		if(history) {
			window.history.pushState({page: attr}, '', location.origin + location.pathname + attr);
		}

		if(smooth) {
			const { y } = tabForActive.getBoundingClientRect();
			window.scrollTo({ top: y - 50, behavior: 'smooth' });
		}

		this.onChange(attr)


	}
}

export default TabModule;
