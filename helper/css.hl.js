class CssHelper {
	static cssHelper(el, styles) {

        if (el.length != styles.length) {
            throw {
                message: "The number of elements does not match"
            }
        }

        el.forEach(cicleElements);

        function cicleElements(item, i) {
            try {
                item.style.cssText += styles[i]
            } catch (e) {
                [].forEach.call(item, function(elem, j) {
                    elem.style.cssText += styles[i]
                })
            }
        }
    }
}

export default CssHelper;