class EventHelper {
	static flyEvent(action, listen, element, callback) {

        let oneCallback = false,
            callbackTohandler,
            count = 0;

        if (callback instanceof Array && element.length != callback.length) {
            throw {
                message: "The number of elements handler does not match"
            }
        } else if (typeof callback == "function") {
            oneCallback = true;
        }


        listen.forEach(listener);

        function listener(item, i) {
            element.forEach(elements.bind(this, item))
        }

        function elements(item, items, j) {

            if (!items) return;

            callbackTohandler = oneCallback ? callback : callback[j];

            try {
                items[action + 'EventListener'](item, callbackTohandler);
            } catch (e) {
                [].forEach.call(items, function(el, c) {
                    el[action + 'EventListener'](item, callbackTohandler);
                })
            }

        }

    }
}

export default EventHelper;