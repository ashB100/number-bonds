/**
 * Created by ashnita on 16/01/2014.
 */
function foreach(object, action) {
    for (var property in object) {
        if (Object.prototype.hasOwnProperty.call(object, property)) {
            action(property, object[property]);
        }
    }
}

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