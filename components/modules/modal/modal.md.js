import view from './modal.view.js';

class ModalModule {

	static defaultProps = {
		wrapper: 'framework-modal',
		content: 'framework-modal__content',
		close: 'framework-modal',
		view: true,
		transition: .5,
		remove: true
	}

	constructor($public){
		this.$public = $public;
		this.view = view;
	}

	open(html, options){

		this.props = {...ModalModule.defaultProps, ...options};
	
		let view = this.props.view ? this.view.template(html) : html;
		document.body.insertAdjacentHTML('afterbegin', view);

		this.wrapper = _$('.'+this.props.wrapper);

		if(!this.wrapper) return;
		
		this.$public.helper('transition').openTransition(this.wrapper, 'flex', this.props.transition, 'opacity: 1');

		this.close();

	}

	close(closeButton){

		this.$public.helper('event').flyEvent('add', ['click'], [_$('.'+this.props.close)], () => {
			this.$public.helper('transition').closeTransition(this.wrapper, 'none', 'opacity: 0', this.props.remove);
		})

		
	}
}

export default ModalModule;