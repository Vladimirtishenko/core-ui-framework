const MODE = ['circle', 'slide', 'shadow'];

class CarouselModule {

	// Static props, should be merged with dinamic props

	static defaultProps = {
		wrap: _$('.frame-carousel'),
		list: 'frame-carousel__list',
		arrows: 'frame-carousel__controls',
		margin: 0,
		direction: 'translateX',
		preview: false,
		count: 4,
		mode: null,
		speed: '.3s',
		controls: {
			state: false,
			wrap: 'frame-carousel__dot-wrapper',
			dot: 'frame-carousel__dot',
			active: 'frame-carousel__dot--active'
		},
		state: 0,
		callback: null
	}

	// Constuctor: Merge props, verify elements and transfered params, call reduce method

	constructor(options, $public) {

		this.$public = $public;

		// Merge props
		this.props = {...CarouselModule.defaultProps, ...options};

		// Create elements from class names
		this.propsExtends();

		if(
			!this.props.list ||
			 this.props.list.children.length < 1 ||
			!this.props.mode ||
			!this.props.arrows
		) {
			return;
		}

		// Choosing carousel mode
		this.reduce(this.props.mode);

	}

	// Modififcation for props, create elements from class names and transfered 'clients' option to global props.
	propsExtends(){

		let props = this.props;

		this.props.list = _$('.' + props.list, props.wrap); // Create list
		this.props.arrows = _$('.' + props.arrows, props.wrap); // Create arrows

		this.props.clients = {
					sizes: (props.direction == 'translateY') ? 'height' : 'width',
					state: (props.direction == 'translateY') ? 'clientHeight' : 'clientWidth'
		}; // Create states clients

	}


	// Define the carousel mode, call different methods for construct this or that structure, apppend handlers to controls elements

	reduce(mode){

		let controls = _$('.' + this.props.controls.wrap);

		switch (mode) {

			case 'slide':

				this.moveSlide();
				this.previewPresented();
				this.controlsVisibility();

				this.controlsCreate();
				this.$public.helper('event').flyEvent('add', ['click'], [this.props.arrows], this.__handlerActionSlide.bind(this));
				this.$public.helper('event').flyEvent('add', ['click'], [controls], this.__controlsHandlerSlide.bind(this));

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
				this.$public.helper('event').flyEvent('add', ['click'], [controls], this.__controlsHandlerShadow.bind(this));
				break;

			default:
				return false;
		}

	}

	// Method will be launched when mode: 'fade'
	// 1) Set up absolute position for list elements
	// 2) Take higher element height and set up for all elements
	// 3) Hide all list element except 'Active element'

	setAbsolute(){

		let maxHeight = 0,
				childrens = [].forEach.call(this.props.list.children, (item, i)=> {

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

	// Method will be launched when mode: 'slide' or 'circle'
	// There are two ways for call this method:
	// 1) With parameters: Slider will be move.
	// 2) With parameters: Slider will not be move, just transition will set up at 0 (Because of animation should be smooth)

	moveSlide(left, time){

		let child = this.props.list.children,
				firstChild = Array.from( this.props.list.children ).shift(),
				width = (child.length + 2) * (firstChild[this.props.clients.state] + this.props.margin * 2) + "px",
				leftOffset = left || 0,
				timeDuration = time || '0s';

		this.props.list.style.cssText += this.props.clients.sizes + ":" + width + ";transition: " + timeDuration + " ease-out ;transform: "+this.props.direction+"("+leftOffset+"px)";

	}

	// Method will be launched when preview block transferred
	// 1) Just launched when you click for list element
	// 2) If event.target !== <img> function quit.

	previewPresented(){

		if(!this.props.preview) return;

		this.$public.helper('event').flyEvent('add', ['click'], [this.props.list], (event) => {

			if(!event || !event.target || event.target.tagName != 'IMG') return;

			this.props.preview.querySelector('img').src =  event.target.src;

		});

	}

	// Method will be launched when preview block transferred
	// 1) Artificial replace preview image
	// 2) It is working when you transferring some image url to this method

	previewSinteticEvent(src){

		let img = _$('img', this.props.preview);
		img.src = src;

	}

	controlsVisibility(){

		if(this.props.list.children.length > this.props.count){
			this.props.arrows.style.display = "block"
		}
	}

	/**
	 *
	 * Dot controls create and action
	 * Create dots if option 'controls' satisfactorily
	 *
	 */

	controlsCreate(){

		let controls = _$('.' + this.props.controls.wrap);

		if(this.props.count !== 1 || !this.props.controls.state) return;

		controls.innerHTML = "";

		let dots = ""

		for (let i = 0; i < this.props.list.length; i++) {
			dots += i == 0 ?
				`<span data-controls="${i}" class="${this.props.controls.dot + ' ' + this.props.controls.active}"></span>` :
				`<span data-controls="${i}" class="${this.props.controls.dot}"></span>`
		}

		this.props.controls.wrap.innerHTML = dots;

	}

	// Method move slide if choose 'slide' mode. Arrow handler

	__controlsHandlerSlide(event) {
		if(!event || !event.target || !event.target.getAttribute('data-controls')) return;

		let props = this.getLocalProps(event);

		this.__setActiveHandler(event.target);

		this.moveSlide(-(props.offset * parseInt(props.attr)), this.props.speed);

		this.props.state = parseInt(props.attr);

	}

  // Method move slide if choose 'slide' mode. Dots handler, Dots controls should activated

	__handlerActionSlide(event){

		if(!event || !event.target || !event.target.getAttribute('data-controls')) return;

		let props = this.getLocalProps(event);

		this.calculateState(props.attr);

		this.__setActiveHandler(_$('[data-controls="'+this.props.state+'"]'));

		this.moveSlide(-(props.offset * this.props.state), this.props.speed);

		if(this.props.callback && typeof this.props.callback == 'function') this.props.callback();

	}

	// Method hide active slide, launched to appearing another one if choose 'shadow' mode. Arrow handler

	__controlsHandlerShadow(event) {
		if(!event || !event.target || !event.target.getAttribute('data-controls')) return;

		let props = this.getLocalProps(event);

		this.__setActiveHandler(event.target);

		this.props.list.children[this.props.state].style.cssText += "opacity: 0; z-index: 0; transition: .8s";

		this.props.state = parseInt(props.attr);

		this.props.list.children[this.props.state].style.cssText += "opacity: 1; z-index: 1; transition: .8s";

	}

	// Method hide active slide, launched to appearing another one if choose 'shadow' mode. Dots handler, Dots controls should activated

	__handlerActionShadow(event){

		if(!event || !event.target || !event.target.getAttribute('data-controls')) return;

		let props = this.getLocalProps(event);

		this.props.list.children[this.props.state].style.cssText += "opacity: 0; z-index: 0; transition: .8s"

		this.calculateState(props.attr);

		this.props.list.children[this.props.state].style.cssText += "opacity: 1; z-index: 1; transition: .8s"

		this.__setActiveHandler(_$('[data-controls="'+this.props.state+'"]'));

		if(this.props.callback && typeof this.props.callback == 'function') this.props.callback();

	}

	// Set up active slide

	__setActiveHandler(el){
		if(this.props.count !== 1 || !this.props.controls.state) return;

		_$('.' + this.props.controls.active).classList.remove(this.props.controls.active);

		el.classList.add(this.props.controls.active);

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

		if(this.props.callback && typeof this.props.callback == 'function') this.props.callback();

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
		props.child = Array.from( this.props.list.children ).shift();
		props.offset = (props.child[this.props.clients.state] + this.props.margin);

		return props;
	}

	calculateState(attr){

		if(attr == 'next'){
			this.props.state++;
		} else {
			this.props.state--;
		}

		if(this.props.state > this.props.list.children.length - 1){
			this.props.state = 0;
		} else if(this.props.state < 0){
			this.props.state = this.props.list.children.length - 1;
		}
	}

}

export default CarouselModule;
