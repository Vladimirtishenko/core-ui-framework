class TabModule {
	constructor(hide, $public) {

		this.$public = $public;
		this.tablist = _$('.framework-tabs');
		this.tabpanel = _$('.framework-tab-content');
		this.activeTablist = 'framework-active-tab';
		this.activeTabpanel = 'framework-tabpanel-active';

		if(hide){
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

		let target = event.target,
			attr = target.getAttribute('data-id') || (target.closest('[data-id^="#"]') && target.closest('[data-id^="#"]').getAttribute('data-id')),
			tabForActive = _$(attr),
			activeTablist = _$('.' + this.activeTablist),
			activeTabpanel = _$('.' + this.activeTabpanel);

		if(!target.classList.contains(this.activeTablist) && tabForActive){
			activeTablist.classList.remove(this.activeTablist)
			activeTabpanel.classList.remove(this.activeTabpanel)

			target.classList.add(this.activeTablist)
			tabForActive.classList.add(this.activeTabpanel)

		}


	}
}

export default TabModule;