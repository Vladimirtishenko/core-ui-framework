import view from './zoom.view.js';

class ZoomModule {
	constructor(classElement, $public){
		this.$public = $public;
		this.view = view;
		this.classie = "framework-zoom";
		this.staticElement = _$('.' + classElement);

		this.$public.helper('event').flyEvent('add', ['mouseenter', 'mouseleave', 'mousemove'], [this.staticElement], this.handlerToZoomImg.bind(this));
	}

	imageInserted(src){

		this.staticElement.insertAdjacentHTML('beforeend', this.view.template(src));
		this.el = _$('.' + this.classie);

	}

	handlerToZoomImg(event){

		let type = event && event.type,
			target = event && event.target;

		if(!target) return;

		let events = {
			mousemove: this.handlerMousemove.bind(this),
			mouseenter: this.handlerMouseenter.bind(this),
			mouseleave: this.handlerMouseleave.bind(this),
		}

		events[type](event);

	}

	handlerMousemove (event){

		this.el.firstElementChild.style.cssText += "left: " + (-(event.offsetX * this.offsetPosition.left)) + "px; top: " + (-(event.offsetY * this.offsetPosition.top)) + "px"

	}

	handlerMouseenter (event){

		this.image = _$('img', event.target)

		this.imageInserted(this.image.src);

		this.offsetPosition = this.calculateWidthAndHeight();


	}

	handlerMouseleave (event){
		try{
			this.el.parentNode.removeChild(this.el);
		} catch(e){}

	}

	calculateWidthAndHeight(){

		let params = {},
			w = this.el.clientWidth,
			h = this.el.clientHeight,
			sw = 1000,
			dh = this.el.firstElementChild.clientHeight;

		params.left = (sw - w) / w;
		params.top = (dh - h) / h;

		return params;

	}
}

export default ZoomModule;
