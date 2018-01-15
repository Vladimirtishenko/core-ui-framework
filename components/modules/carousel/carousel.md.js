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
				this.mode = options.mode || 'circle';
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

		if(!this.props.children || this.props.children.length < 1) return;
		
		this.createListWidth();
		this.previewPresented();
		this.lengthTryOuts();
		this.controlsCreate();
		
		this.actionsCreator();

	}

	createListWidth(left, time){

		let child = this.props.children,
			firstChild = Array.from( this.props.children ).shift(),
			width = (child.length + 2) * (firstChild[this.props.clients.state] + this.props.margin * 2) + "px",
			leftOffset = left || 0,
			timeDuration = time || '0s';

		this.props.list.style.cssText += this.props.clients.sizes + ":" + width + ";transition: " + timeDuration + " ease-out ;transform: "+this.props.direction+"("+leftOffset+"px)";

	}

	previewPresented(){
		if(!this.props.preview) return;

		this.$public.helper('event').flyEvent('add', ['click'], [this.props.list], this.previewHandler.bind(this));

	}

	previewHandler(){
		if(!event || !event.target || event.target.tagName != 'IMG') return;

		let src = event.target.src;

		this.props.preview.querySelector('img').src = src;

	}

	previewSinteticEvent(src){
		
		let img = _$('img', this.props.preview);

		img.src = src;

	}

	lengthTryOuts(){

		if(this.props.children.length > this.needCount){
			this.props.arrows.style.display = "block"
		}
	}

	controlsCreate(){

		if(this.props.mode == 'circle' || this.props.count !== 1 || !this.props.controls.state) return;

		this.props.controls.wrap.innerHTML = "";

		let dots = ""

		for (var i = 0; i < this.props.children.length; i++) {
			dots += i == 0 ? `<span data-controls="${i}" class="${this.props.controls.dot + ' ' + this.props.controls.active}"></span>` : `<span data-controls="${i}" class="${this.props.controls.dot}"></span>`
		}

		this.props.controls.wrap.innerHTML = dots;

		this.$public.helper('event').flyEvent('add', ['click'], [this.props.controls.wrap], this.controlsHandler.bind(this));

	}

	controlsHandler(event) {
		if(!event || !event.target || !event.target.getAttribute('data-controls')) return;

		let dot = event.target.getAttribute('data-controls'),
			child = Array.from( this.props.children ).shift(),
			offset = (child[this.props.clients.state] + this.props.margin);

		this.setActiveClass(event.target);

		this.createListWidth(-(offset * parseInt(dot)), this.props.speed);

		this.props.state = parseInt(dot);
	}

	actionsCreator(){

		if(this.props.mode == 'circle'){
			this.$public.helper('event').flyEvent('add', ['click'], [this.props.arrows], this.handlerActionClone.bind(this));
		} else {
			this.$public.helper('event').flyEvent('add', ['click'], [this.props.arrows], this.handlerActionSlide.bind(this));
		}

	}

	handlerActionSlide(event){

		if(!event || !event.target || !event.target.getAttribute('data-controls')) return;

		let attr = event.target.getAttribute('data-controls'),
			child = Array.from( this.props.children ).shift(),
			offset = (child[this.props.clients.state] + this.props.margin);

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

		this.setActiveClass(_$('[data-controls="'+this.props.state+'"]'));

		this.createListWidth(-(offset * this.props.state), this.props.speed);

	}

	handlerActionClone(event){
		if(!event || !event.target || !event.target.getAttribute('data-controls')) return;

		let target = event.target,
			attr = target.getAttribute('data-controls'),
			child = Array.from( this.props.children ).shift(),
			offset = (child[this.props.clients.state] + this.props.margin),
			cloning,
			cloned;


		if(attr == 'next'){

				cloning = this.props.list.firstElementChild;
				cloned = cloning.cloneNode(true);

				this.props.list.appendChild(cloned);
				this.createListWidth(-offset, this.props.speed);

		} else {

				cloning = this.props.list.lastElementChild;
				cloned = cloning.cloneNode(true);

				this.createListWidth(-offset, '0s');

				window.getComputedStyle(this.props.list).transform;

				this.props.list.insertBefore(cloned, this.props.list.firstElementChild);

				this.createListWidth(0, this.props.speed);

		}

		this.handlerOffset = this.transitionEnd.bind(this, cloning);
		this.$public.helper('event').flyEvent('add', ['transitionend'], [this.props.list], this.handlerOffset);

	}

	setActiveClass(el){
		if(this.props.mode == 'circle' || this.props.count !== 1 || !this.props.controls.state) return;

		_$('.' + this.props.controls.active).classList.remove(this.props.controls.active);
		el.classList.add(this.props.controls.active);

	}

	transitionEnd(cloning, event){

		if(event.propertyName == 'transform'){
				this.createListWidth();
				this.props.list.removeChild(cloning)
		
			this.$public.helper('event').flyEvent('remove', ['transitionend'], [this.props.list], this.handlerOffset);
		}
	}

}

export default CarouselModule;