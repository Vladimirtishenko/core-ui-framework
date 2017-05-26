class CarouselModule {
	constructor(wrap, margin, direction, needPreview, needCount, $public) {
			
		this.wrap = wrap;
		this.$public = $public;
		this.direction = direction;
		this.needPreview = needPreview;
		this.needCount = needCount;
		this.params = (this.direction == 'translateY') ? 'height' : 'width';
		this.clientParams = (this.direction == 'translateY') ? 'clientHeight' : 'clientWidth';
		
		this.wrapperList = wrap.querySelector('.frame-carousel');
		this.list = wrap.querySelector('.frame-carousel__list');
		this.children = this.list.children;
		this.margin = margin;

		if(this.children.length < 1) return;

		this.controls = wrap.querySelector('.frame-carousel-controls');
		
		this.createListWidth();
		this.previewPresented();
		this.lengthTryOuts();

		this.$public.helper('event').flyEvent('add', ['click'], [this.controls], this.handlerAction.bind(this));

	}

	lengthTryOuts(){

		if(this.children.length > this.needCount){
			this.controls.style.display = "block"
		}
	}

	previewPresented(){
		if(!this.needPreview) return;

		this.$public.helper('event').flyEvent('add', ['click'], [this.list], this.previewHandler.bind(this));

	}

	previewHandler(){
		if(!event || !event.target || event.target.tagName != 'IMG') return;

		let src = event.target.src;

		this.needPreview.querySelector('img').src = src;

	}

	previewSinteticEvent(src){
		
		let img = _$('img', this.needPreview);

		img.src = src;

	}

	createListWidth(left, time){

		let width = (this.children.length + 2) * (this.children[0][this.clientParams] + this.margin * 2) + "px",
			leftOffset = left || 0,
			timeDuration = time || '0s';

		this.list.style.cssText += this.params + ":" + width + ";transition: " + timeDuration + " ease-out ;transform: "+this.direction+"("+leftOffset+"px)";

	}

	handlerAction(event){
		if(!event || !event.target || !event.target.getAttribute('data-controls')) return;

		let target = event.target,
			attr = target.getAttribute('data-controls'),
			offset = (this.children[1][this.clientParams] + this.margin),
			cloning,
			cloned;

		if(attr == 'next'){

				cloning = this.list.firstElementChild;
				cloned = cloning.cloneNode(true);

				this.list.appendChild(cloned);
				this.createListWidth(-offset, '.3s');


		} else {

				cloning = this.list.lastElementChild;
				cloned = cloning.cloneNode(true);

				this.createListWidth(-offset, '0s');

				window.getComputedStyle(this.list).transform;

				this.list.insertBefore(cloned, this.list.firstElementChild);

				this.createListWidth(0, '.3s');

		}

		this.handlerOffset = this.transitionEnd.bind(this, cloning);
		this.$public.helper('event').flyEvent('add', ['transitionend'], [this.list], this.handlerOffset);

	}

	transitionEnd(cloning, event){

		if(event.propertyName == 'transform'){
				this.createListWidth();
				this.list.removeChild(cloning)
		
			this.$public.helper('event').flyEvent('remove', ['transitionend'], [this.list], this.handlerOffset);
		}
	}

}

export default CarouselModule;