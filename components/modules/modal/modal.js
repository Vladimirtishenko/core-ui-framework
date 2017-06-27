import module from './modal.md.js';

let modal;

class Modal {

	/**
	 *
	 * Modal consist of only .framework-modal > .framework-modal__content-wrapper > .framework-modal__close + .framework-modal__content
	 *
	 */

	constructor($public) {
		modal = new module($public);
	}

	openModal(html){
		modal.open(html);
	}

	closeModal(){
		modal.close();
	}
}

export default Modal;