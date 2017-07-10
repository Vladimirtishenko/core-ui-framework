class ModalView {
	static template(html) {

		return '<section class="framework-modal fl fl-justify-c fl-align-c">' +
					'<div class="framework-modal__content-wrapper">' +
						'<div class="framework-modal__content">'+html+'</div>' +
					'</div>' +
				'</section>';

	}
}

export default ModalView;