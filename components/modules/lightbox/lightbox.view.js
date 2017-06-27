class LightboxView {
	static template(html) {

		return '<section class="framework-lightbox__modal align-items-center justify-content-center">' +
					'<div class="framework-lightbox__container flex-container align-items-center">' +
						'<span class="framework-modal__close"></span>' +
						'<div class="framework-lightbox__controls">'+
							'<span class="framework-lightbox__controls-prev" data-controls="prev"></span>' + 
							'<span class="framework-lightbox__controls-next" data-controls="next"></span>' + 
						'</div>' +
						'<div class="framework-lightbox__content">'+html+'</div>' +
					'</div>' +
				'</section>';

	}
}

export default LightboxView;