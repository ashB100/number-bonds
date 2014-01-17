/**
 * Created by ashnita on 16/01/2014.
 */

/**
 * Iterates over the own properties of a given object and calls the (higher order) function which is passed in as action
 * @param object is the object which we want to enumerate
 * @param action is the function which is called for each property
 */
function foreach(object, action) {
    for (var property in object) {
        if (Object.prototype.hasOwnProperty.call(object, property)) {
            action(property, object[property]);
        }
    }
}

/**
 * Creates the given HTMLElement in the given parent container with the attributes provided (if any)
 * @param parentEl is the reference to the DOM element in which to add this element
 * @param elementType is the name of the html element, ie, the tag to create
 * @param attributeList is an object with the attributes for this newly created element
 * @returns {HTMLElement}
 */
function renderElement(parentEl, elementType, attributeList) {
    var el = document.createElement(elementType);
    if ( attributeList != undefined) {
        typeof attributeList ? "object" : {};
        foreach(attributeList, function(property, value){
            el[property] = attributeList[property];
        });
    }
    parentEl.appendChild(el);
    return el;
}
