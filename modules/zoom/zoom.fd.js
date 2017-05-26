import module from './zoom.md.js';

class Zoom {
	constructor($public) {
		this.$public = $public;
	}

	initialEvent(classElement){
		this.module = new module(classElement, this.$public);
	}

	destructorize(){
		this.module = null;
	}
}

export default Zoom;