/**
 * Created by ashnita on 16/01/2014.
 */
var NumberBonds = NumberBonds || {};

NumberBonds.Utilities = (function() {
    'use strict';
    /**
     * Iterates over the own properties of a given object and calls the (higher order) function which is passed in as action
     * @param object is the object which we want to enumerate
     * @param action is the function which is called for each property
     */
    var foreach = function(object, action) {
        for (var property in object) {
            if (Object.prototype.hasOwnProperty.call(object, property)) {
                action(property, object[property]);
            }
        }
    };

    /**
     * Creates the given HTMLElement in the given parent container with the attributes provided (if any)
     * @param parentEl is the reference to the DOM element in which to add this element
     * @param elementType is the name of the html element, ie, the tag to create
     * @param attributeList is an object with the attributes for this newly created element
     * @returns {HTMLElement}
     */
    var renderElement = function(parentEl, elementType, attributeList) {
        var el = document.createElement(elementType);
        if ( attributeList !== undefined) {
            attributeList = attributeList || {};

            // doesn't work for attributes which don't need a value, eg. autofocus
            foreach(attributeList, function(property){
                el[property] = attributeList[property];
            });
        }
        parentEl.appendChild(el);
        return el;
    };

    /*
    var renderElement = function(fragment, elementType, attributeList ) {
        var el = document.createElement(elementType);
        if ( attributeList !== undefined) {
            attributeList = attributeList || {};
            foreach(attributeList, function(property){
                el[property] = attributeList[property];
            });
        }
        fragment.appendChild(el);
    }; */

    // Returns a random integer between min and max
    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    return {
        foreach: foreach,
        renderElement: renderElement,
        getRandomInt: getRandomInt
    };
})();
