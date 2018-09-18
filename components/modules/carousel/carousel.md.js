const MODE = ['circle', 'slide', 'shadow'];

class CarouselModule {

	constructor(options, $public) {

		this.$public = $public;

		this.props = new function() {
				this.wrap = options.wrap || _$('.frame-carousel') || null;
				this.list = _$('.frame-carousel__list', this.wrap);
				this.children = this.list && this.list.children;
				this.margin = options.margin || 0;
				this.direction = options.direction || 'translateX';
				this.preview = options.preview || false;
				this.count = options.count || 4;
				this.mode = options.mode;
				this.speed = options.speed || '.3s';
				this.controls = {
					state: options.controls && options.controls.state || false,
					wrap: options.controls && options.controls.wrap || _$('.frame-carousel-dot-controls'),
					dot: options.controls && options.controls.dot,
					active: options.controls && options.controls.active
				};
				this.arrows = _$('.frame-carousel-controls', this.wrap);
				this.clients = {
					sizes: (this.direction == 'translateY') ? 'height' : 'width',
					state: (this.direction == 'translateY') ? 'clientHeight' : 'clientWidth'
				};
				this.state = 0;
		}

		if(
			!this.props.children ||
			 this.props.children.length < 1 ||
			!this.props.mode ||
			!this.props.arrows
		) {
			return;
		}

		this.reduce(this.props.mode);

	}

	reduce(mode){

		switch (mode) {

			case 'slide':

				this.moveSlide();
				this.previewPresented();
				this.controlsVisibility();

				this.controlsCreate();
				this.$public.helper('event').flyEvent('add', ['click', ], [this.props.arrows], this.__handlerActionSlide.bind(this));
				this.$public.helper('event').flyEvent('add', ['click'], [this.props.controls.wrap], this.__controlsHandlerSlide.bind(this));

				break;

			case 'circle':

				this.moveSlide();
				this.previewPresented();
				this.controlsVisibility();

				this.$public.helper('event').flyEvent('add', ['click'], [this.props.arrows], this.__handlerActionCircle.bind(this));

				break;

			case 'shadow':

				this.controlsVisibility();
				this.controlsCreate();
				this.setAbsolute();

				this.$public.helper('event').flyEvent('add', ['click'], [this.props.arrows], this.__handlerActionShadow.bind(this));
				this.$public.helper('event').flyEvent('add', ['click'], [this.props.controls.wrap], this.__controlsHandlerShadow.bind(this));
				break;

			default:
				return false;
		}

	}

	setAbsolute(){

		let maxHeight = 0,
			childrens = [].forEach.call(this.props.children, (item, i)=> {

					if(item.clientHeight > maxHeight){
						maxHeight = item.offsetHeight;
					}
					if(i != 0){
						item.style.cssText += "position:absolute; opacity: 0;";
					} else {
						item.style.cssText += "position:absolute;";
					}

				});



		this.props.list.style.height = maxHeight+'px';

	}


	moveSlide(left, time){

		let child = this.props.children,
			firstChild = Array.from( this.props.children ).shift(),
			width = (child.length + 2) * (firstChild[this.props.clients.state] + this.props.margin * 2) + "px",
			leftOffset = left || 0,
			timeDuration = time || '0s';

		this.props.list.style.cssText += this.props.clients.sizes + ":" + width + ";transition: " + timeDuration + " ease-out ;transform: "+this.props.direction+"("+leftOffset+"px)";

	}

	previewPresented(){

		if(!this.props.preview) return;

		this.$public.helper('event').flyEvent('add', ['click'], [this.props.list], (event) => {

			if(!event || !event.target || event.target.tagName != 'IMG') return;

			this.props.preview.querySelector('img').src =  event.target.src;

		});

	}

	previewSinteticEvent(src){

		let img = _$('img', this.props.preview);
		img.src = src;

	}

	controlsVisibility(){

		if(this.props.children.length > this.props.count){
			this.props.arrows.style.display = "block"
		}
	}

	/**
	 *
	 * Dot controls create and action
	 *
	 */


	controlsCreate(){

		if(this.props.count !== 1 || !this.props.controls.state) return;

		this.props.controls.wrap.innerHTML = "";

		let dots = ""

		for (var i = 0; i < this.props.children.length; i++) {
			dots += i == 0 ? `<span data-controls="${i}" class="${this.props.controls.dot + ' ' + this.props.controls.active}"></span>` : `<span data-controls="${i}" class="${this.props.controls.dot}"></span>`
		}

		this.props.controls.wrap.innerHTML = dots;

	}

	__controlsHandlerSlide(event) {
		if(!event || !event.target || !event.target.getAttribute('data-controls')) return;

		let props = this.getLocalProps(event);

		this.__setActiveHandler(event.target);

		this.moveSlide(-(props.offset * parseInt(props.attr)), this.props.speed);

		this.props.state = parseInt(props.attr);
	}

	__controlsHandlerShadow(event) {
		if(!event || !event.target || !event.target.getAttribute('data-controls')) return;

		let props = this.getLocalProps(event);

		this.__setActiveHandler(event.target);

		this.props.children[this.props.state].style.cssText += "opacity: 0; z-index: 0; transition: .8s";

		this.props.state = parseInt(props.attr);

		this.props.children[this.props.state].style.cssText += "opacity: 1; z-index: 1; transition: .8s";

	}

	__setActiveHandler(el){
		if(this.props.count !== 1 || !this.props.controls.state) return;

		_$('.' + this.props.controls.active).classList.remove(this.props.controls.active);

		el.classList.add(this.props.controls.active);

	}

	/* / Dot controls create and action */

	/**
	 *
	 * Handler for 'slide' mode
 	 *
	 */


	__handlerActionSlide(event){

		if(!event || !event.target || !event.target.getAttribute('data-controls')) return;

		let props = this.getLocalProps(event);

		this.calculateState(props.attr);

		this.__setActiveHandler(_$('[data-controls="'+this.props.state+'"]'));

		this.moveSlide(-(props.offset * this.props.state), this.props.speed);

	}

	/**
	 *
	 * Handler for 'circle' mode
 	 *
	 */

	__handlerActionCircle(event){

		if(!event || !event.target || !event.target.getAttribute('data-controls')) return;

		let props = this.getLocalProps(event),
			cloning,
			cloned;



		if(props.attr == 'next'){

				cloning = this.props.list.firstElementChild;
				cloned = cloning.cloneNode(true);

				this.props.list.appendChild(cloned);
				this.moveSlide(-props.offset, this.props.speed);

		} else {

				cloning = this.props.list.lastElementChild;
				cloned = cloning.cloneNode(true);

				this.moveSlide(-props.offset, '0s');

				window.getComputedStyle(this.props.list).transform;

				this.props.list.insertBefore(cloned, this.props.list.firstElementChild);

				this.moveSlide(0, this.props.speed);

		}

		this.handlerOffset = this.transitionEnd.bind(this, cloning);
		this.$public.helper('event').flyEvent('add', ['transitionend'], [this.props.list], this.handlerOffset);

	}

	__handlerActionShadow(event){

		if(!event || !event.target || !event.target.getAttribute('data-controls')) return;

		let props = this.getLocalProps(event);

		this.props.children[this.props.state].style.cssText += "opacity: 0; z-index: 0; transition: .8s"

		this.calculateState(props.attr);

		this.props.children[this.props.state].style.cssText += "opacity: 1; z-index: 1; transition: .8s"

		this.__setActiveHandler(_$('[data-controls="'+this.props.state+'"]'));

	}

	transitionEnd(cloning, event){

		if(event.propertyName == 'transform'){
				this.moveSlide();
				this.props.list.removeChild(cloning)

			this.$public.helper('event').flyEvent('remove', ['transitionend'], [this.props.list], this.handlerOffset);
		}
	}


	getLocalProps(event){

		let props = {};

		props.attr = event.target.getAttribute('data-controls');
		props.child = Array.from( this.props.children ).shift();
		props.offset = (props.child[this.props.clients.state] + this.props.margin);

		return props;
	}

	calculateState(attr){

		if(attr == 'next'){
			this.props.state++;
		} else {
			this.props.state--;
		}

		if(this.props.state > this.props.children.length - 1){
			this.props.state = 0;
		} else if(this.props.state < 0){
			this.props.state = this.props.children.length - 1;
		}
	}

}

export default CarouselModule;
