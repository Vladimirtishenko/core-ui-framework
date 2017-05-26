class asyncLoadContentFacade {
	constructor($public){
		this.$public = $public;
	}

	_getType(type){

		let types = {
			json: 'application/json'
		}

		return types[type];


	}
	
	_get(url, callback){
		this.$public.app('serverRequest')('GET', url, null, null, callback)
	}

	_post(url, data, callback, type){
		this.$public.app('serverRequest')('POST', url, this._getType(type) || 'application/x-www-form-urlencoded', data, callback)
	}
}

export default asyncLoadContentFacade;