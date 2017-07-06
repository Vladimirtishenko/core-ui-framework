import EventHelper from './event.js';

let state = {};

class TransitionHelper {

	static setState(el, method, cl){
		state['element'] = el; 
		state['method'] = method; 
		state['cl'] = cl; 
	}

	static openAnimation(el, cl){
		if(!el.classList.contains(cl)){
			el.style.display = 'block';
			el.classList.add(cl);
		}

	}
	static closeAnimation(el, hide, show){
		if(!el.classList.contains(hide)){
			el.classList.add(hide);
			TransitionHelper.setState(el, TransitionHelper.closeAnimationEnd, [hide, show]);
			EventHelper.flyEvent('add', ['animationend'], [el], TransitionHelper.closeAnimationEnd)
		}

	}

	static closeAnimationEnd (){
		EventHelper.flyEvent('remove', ['animationend'], [state.element], state['method']);
		state.element.style.display = 'none';
		for (var i = state.cl.length - 1; i >= 0; i--) {
			state.element.classList.remove(state.cl[i]);
		}
		state = {};
	}

	static openTransition(el, display, time, props){

		try{
			EventHelper.flyEvent('remove', ['transitionend'], [state.element], state['method']);
		} catch(e){}
		
		el.style.display = display;

		window.getComputedStyle(el).display;

		el.style.willChange = 'transform, opacity';

		el.style.cssText += "transition: " + time + "s; " + props;

	}

	static closeTransition(el, display, props){

		el.style.cssText += props;

		TransitionHelper.setState(el, TransitionHelper.closeTransitionEnd);

		el.style.willChange = 'auto';

		EventHelper.flyEvent('add', ['transitionend'], [el], TransitionHelper.closeTransitionEnd)

	}

	static closeTransitionEnd(){

		EventHelper.flyEvent('remove', ['transitionend'], [state.element], state['method']);

		state.element.removeAttribute('style');
	}

	/**
	 *
	 * params: el - array of HTMLElements, function; 
	 *
	 */
	
	static needEvent(el, callback){
		if(!(el instanceof Array)){el = [el]}
		EventHelper.flyEvent('add', ['click'], el, callback);
	}

	static toTop(element, to, duration){
		if (duration <= 0) return;
        let difference = to - element.scrollTop,
        	perTick = difference / duration * 10;

        setTimeout(() => {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop == to) return;
            TransitionHelper.toTop(element, to, duration - 10);
        }, 10);
	}

	static doScrolling(element, duration) {
		let startingY = window.pageYOffset,
			elementY = window.pageYOffset + document.querySelector(element).getBoundingClientRect().top,
			targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY,
			diff = targetY - startingY,
			easing = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
			start;

	  	if (!diff) return
		// Bootstrap our animation - it will get called right before next frame shall be rendered.
		window.requestAnimationFrame(function step(timestamp) {
	    if (!start) start = timestamp
	    // Elapsed miliseconds since start of scrolling.
	    var time = timestamp - start
			// Get percent of completion in range [0, 1].
	    var percent = Math.min(time / duration, 1)
	    // Apply the easing.
	    // It can cause bad-looking slow frames in browser performance tool, so be careful.
	    percent = easing(percent)

	    window.scrollTo(0, startingY + diff * percent)

		// Proceed with animation as long as we wanted it to.
	    if (time < duration) {
	      window.requestAnimationFrame(step)
	    }
	  })
	}

}

export default TransitionHelper;