class ErrorHelper {
	static error(c, name){
		const code = {
			404: 'Sorry, module '+(name || '')+' not found!'
		}

		return code[c];
	}
}

export default ErrorHelper;