class NotificationModule {
	constructor($public){
		this.$public = $public;
	}

	notify(text){

		let template = '<div class="framework-notify" role="alert">'+text+'</div>';

		this.$public.module('modal').openModal(template)

	}

	error(){

	}
}

export default NotificationModule;