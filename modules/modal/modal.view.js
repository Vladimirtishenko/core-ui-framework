class ModalView {
	static template(html) {

		return '<section class="framework-modal align-items-center justify-content-center">' +
					'<div class="framework-modal__content-wrapper">' +
						'<div class="framework-modal__content">'+html+'</div>' +
					'</div>' +
				'</section>';

	}
}

export default ModalView;