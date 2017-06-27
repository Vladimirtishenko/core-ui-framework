import module from './notification.md.js'

class Notification {
	constructor($public){
		this.$public = $public;
		this.module = new module($public);
	}

	notifyMe(text){
		if(text){
			this.module.notify(text);
		} else {
			this.unknowError();
		}
	}

	unknowError(){
		this.module.error();
	}
}

export default Notification;