class ErrorHelper {
	static error(c){
		const code = {
			404: 'Sorry, module not found!'
		}

		return code[c];
	}
}

export default ErrorHelper;