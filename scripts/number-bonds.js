/**
 * Created by Ashnita on 30/12/2013.
 * Trying to use the Revealing Module Pattern
 * @todo How do I access the public properties of numberBonds from Row??
 */
window.onload = function() {
    numberBonds.init();
};
var numberBonds = function () {
    // configurable variables
    var conf = {
        maxNumForDouble: 20,
        parentContainer: "content"
    };

    var parentEl;       // the parent DOM element where the content will be displayed
    var storySelection; // will be set to the "data-num" attribute when user clicks a story selection (nav) link
    var isDouble;       // will be set if story selection is Double


    var init = function () {
        setParentElement();
        addEvents();
        document.onclick = function () {
            if (event.target.className === "storyLink") {
                storySelection = event.target.getAttribute("data-num");
                console.log(storySelection, "Story Selcected");
                isDouble = (storySelection == conf.maxNumForDouble);
                console.log(isDouble, "Is selection Double?");
                renderStory();
            }
        };

        console.dir(parentEl);
    };

    var setParentElement = function () {
        parentEl = document.getElementById(conf.parentContainer);
    };

    var addEvents = function() {
        // don't know why addEventListener doesn't add the event handler for 'onclick' event of parentEl
        // try putting it in anonymous function
        parentEl.addEventListener('click', function()
        {
            if (event.target.className === "storyLink") {
            storySelection = event.target.getAttribute("data-num");
            isDouble = (storySelection == conf.maxNumForDouble);
            renderStory();
        }});
    };

    var setStorySelection = function() {
        console.dir(event);
        if (event.target.className === "storyLink") {
            storySelection = event.target.getAttribute("data-num");
            isDouble = (storySelection == conf.maxNumForDouble);
            renderStory();
        }
    };

    var renderStory = function() {
        var row;
        // clear the content first
        parentEl.innerHTML = "";
        // print the title of story
        //renderElement(parentEl, 'h2', {innerHTML: 'Story Of : ' + (isDouble ? 'Double' : storySelection), className: 'storyTitle'});
        printTitle();
        // print the lines of the story
        for (var rowNum = 0; rowNum <= storySelection; rowNum++) {
            row = new Row(rowNum, parentEl, storySelection);
            row.createEquation();
        }
    };

    var printTitle = function() {
        console.log(storySelection, "Story Selected (in printTitle)");
        renderElement(parentEl, 'p', {innerHTML: 'Story Of : ' + (isDouble ? 'Double' : storySelection), className: 'storyTitle'});
    };

    return {
        init: init,
        parentEl: parentEl,
        storySelection: storySelection
    }
}();


function Row(i, parentEl, storyOfNumber) {
    this.parentEl = parentEl;
    this.el = null; // is <div> element the row is in
    this.rowNumber = i;
    this.isDouble = (storyOfNumber === '20');
    this.storyOfNumber = storyOfNumber;
    this.operand1 = null;
    this.operand2 = null;
    this.answer = null;
}

Row.prototype.createEquation = function() {
    this.renderContainer();
    this.renderRow();
    this.addEvents();
};

Row.prototype.renderContainer = function() {
    this.el = renderElement(this.parentEl, "div", {className: 'row'});
};

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

Row.prototype.renderRow = function() {
    if (this.isDouble == true) {
        // operand1
        this.operand1 = renderElement(this.el, 'input', {disabled: 'disabled', value: this.rowNumber});
        // "+"
        renderElement(this.el, 'span', {innerHTML: '+'});
        // operand2
        this.operand2 = renderElement(this.el, 'input', {disabled: 'disabled', value: this.rowNumber});
        // "="
        renderElement(this.el, 'span', {innerHTML: '='});
        // answer
        this.answer = renderElement(this.el, 'input');
        // feedback
        renderElement(this.el, 'i', {className: 'fa'});
    } else {
        // operand1
        this.operand1 = renderElement(this.el, 'input');
        // "+"
        renderElement(this.el, 'span', {innerHTML: '+'});
        // operand2
        this.operand2 = renderElement(this.el, 'input');
        // "="
        renderElement(this.el, 'span', {innerHTML: '='});
        // answer
        this.answer = renderElement(this.el, 'input', {disabled: 'disabled', value: this.storyOfNumber});
        // feedback
        renderElement(this.el, 'i', {className: 'fa'});
    }
};

Row.prototype.checkAnswerCorrect = function() {
    if (this.operand1.value !== '' && this.operand2.value !== '') {
        if (parseInt(this.operand1.value) + parseInt(this.operand2.value) === parseInt(this.answer.value)) {
            this.el.className = 'answerCorrect';
        } else {
            this.el.className = 'answerIncorrect';
        }
    }
};

Row.prototype.addEvents = function() {
    var self = this;
    this.el.addEventListener("change", function() {
        self.checkAnswerCorrect();
    });
};
