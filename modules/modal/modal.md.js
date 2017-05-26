import view from './modal.view.js';

class ModalModule {
	constructor($public){
		this.$public = $public;
		this.hideClass = 'framework-modal-none';
		this.view = view;
	}

	open(html){

		this.wrapper = _$('.framework-modal');
		
		if(this.wrapper){
			let content = _$('.framework-modal__content' ,this.wrapper);
			content.innerHTML = html;
		} else {
			let view = this.view.template(html);
			document.body.insertAdjacentHTML('afterbegin', view);
			this.wrapper = _$('.framework-modal');
		}
		
		this.$public.helper('transition').openTransition(this.wrapper, 'flex', .5, 'opacity: 1');

		this.close();

	}

	close(){

		this.$public.helper('event').flyEvent('add', ['click'], [this.wrapper], () => {
			this.$public.helper('transition').closeTransition(this.wrapper, 'none', 'opacity: 0');
		})

		
	}
}

export default ModalModule;