class RatesModule {
	constructor(el, empty, full, input, $public){
		if(!el) return;

		this.el = el;
		this.empty = empty;
		this.full = full;
		this.input = _$("." + input);
		this.dataRate = 'data-rate';

		$app.h('event').flyEvent('add', ['click', 'mouseover', 'mouseout'], [this.el], this.rateEvents.bind(this));
	}

	rateEvents(e){

		let events = {
			click: () => {
				let selected = _$('.swirl-rate-selected', this.el),
					rate = e.target.getAttribute(this.dataRate);

				if(selected){
					selected.classList.remove('swirl-rate-selected');
				}
				e.target.classList.add('swirl-rate-selected');
				events.mouseout();

				this.input.value = rate;
			},
			mouseover: () => {
				if(e.target.classList.contains(this.empty)){
					for (var i = 0; i < this.el.children.length; i++) {
						if(this.el.children[i] != e.target){
							this.el.children[i].classList.add(this.full)
						} else {
							break;
						}
					}
					e.target.classList.add(this.full)
				}
			},
			mouseout: () => {
				for (var i = this.el.children.length - 1; i >= 0; i--) {
					if(this.el.children[i].classList.contains('swirl-rate-selected')){
						break;
					}
					this.el.children[i].classList.remove(this.full)
				}			
			}
		}

		try {
			events[e.type]();
		} catch(e){}
		

	}
}

export default RatesModule;