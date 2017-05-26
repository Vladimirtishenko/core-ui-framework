import view from "./lightbox.view.js";

class LighboxModule {
	constructor(el, item, clicked, imgClass, zoom, $public){
		this.$public = $public;
		this.el = el;
		this.itemClass = item;
		this.clicked = clicked;
		this.view = view;
		this.imgClass = imgClass;
		this.zoom = {status: zoom, state: false}

		this.$public.helper('event').flyEvent('add', ['click'], [el], this.opened.bind(this))

	}

	stateEvents(){

		if(!this.events){		
			this.events = {
				close: {status: true, handler: this.closeView},
				controls: {status: true, handler: this.activateControls}
			}
		}

		for(let k in this.events){
			if(this.events[k].status){
				this.events[k].handler.call(this)
			}
		}

	}

	openView(html, src){
		this.wrapper = _$('.framework-lightbox__modal');
		
		if(this.wrapper){
			let content = _$('.framework-lightbox__content', this.wrapper);
			content.innerHTML = html;
		} else {
			let view = this.view.template(html);
			document.body.insertAdjacentHTML('afterbegin', view);
			this.wrapper = _$('.framework-lightbox__modal');
		}
		
		this.$public.helper('transition').openTransition(this.wrapper, 'flex', .5, 'opacity: 1');

		if(this.zoom.status && !this.zoom.state){
			this.zoom.state = true;
			this.$public.module('zoom').initialEvent('framework-lightbox__content');
		}

		this.stateEvents();
		
	}

	closeView(){

		if(this.events.close.status){
			this.events.close.status = false;
		} 

		this.$public.helper('event').flyEvent('add', ['click'], [this.wrapper], function(){
			this.$public.helper('transition').closeTransition(this.wrapper, 'none', 'opacity: 0');
		}.bind(this))
	}

	activateControls(){

		if(this.events.controls.status){
			this.events.controls.status = false;
		} 

		let controls = _$('.framework-lightbox__controls');

		this.$public.helper('event').flyEvent('add', ['click'], [controls], this.handlerControls.bind(this));

	}

	handlerControls(event){

		if(!event || !event.target) return;

		event.stopPropagation();

		let target = event.target,
			directions = target.getAttribute('data-controls'),
			wrapper = _$('.framework-lightbox__content img'),
			parent; 

		if(directions == 'next'){
			parent = this.parent.nextElementSibling ? this.parent.nextElementSibling : this.parent.parentNode.firstElementChild;
		} else if(directions == 'prev'){
			parent = this.parent.previousElementSibling ? this.parent.previousElementSibling : this.parent.parentNode.lastElementChild;
		} else {
			return;
		}

		let image = parent.querySelector("." + this.imgClass);

		wrapper.src = image.src;
		this.parent = parent;

	}

	opened(event){

		if(!event || !event.target || !event.target.classList.contains(this.clicked)) return;

		event.preventDefault();

		let target = event.target;
		this.parent = target.closest("."+this.itemClass);

		if(!this.parent) return;

		let img	= this.parent.querySelector('img'),
			template = "<img alt='"+img.alt+"' src='"+img.src+"'>";

		this.openView(template, img.src);

	}

}

export default LighboxModule;