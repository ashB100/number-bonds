/**
 * Created by Ashnita on 30/12/2013.
 * @todo Try and use method chaining
 * @todo documentation
 * @todo testing framework - Karma
 * @todo do the scores - create another object
 * @todo flash message manager pattern - to display message(correct/incorrect/duplicate)
 *       and style it with css so that it fades away with some set delay
 */
window.onload = function() {
    App.main();
};
App = {
    main: function() {
        // use event bubbling, add an event listener on the document
        document.addEventListener('click', this.handleEvent);
    },

    handleEvent: function() {
        if (event.target.className == "storyLink") {
            App.renderTheStory()
        }
    },

    /**
     * Renders the rows of equations on the element with id = "content".
     * Clears the innerHTML of parent element first
     *
     */
    renderTheStory: function() {
        var parentEl = document.getElementById("content"),
            storyOfNumber = event.target.getAttribute("data-num"),
            isDouble = (storyOfNumber === '20'),
            equation = null;

        // clear the content first
        parentEl.innerHTML = "";
        // print the title of story
        renderElement(parentEl, 'h2', {innerHTML: 'Story Of : ' + (isDouble ? 'Double' : storyOfNumber), className: 'storyTitle'});
        equation = new RowContainer(parentEl, storyOfNumber, isDouble);
        equation.init();
    }
};

// takes in id of parent container, checks if its double or number bonds and renders the rows correctly for the
// number of rows needed (the links for each number selection has a data attribute which stores the number
// displays the score
function RowContainer(parentContainer, num, isDouble) {
    this.parentEl = parentContainer;
    this.isDouble = isDouble;
    this.storyOfNumber = num;
    this.score = 0;
}

RowContainer.prototype.init = function() {
    // create a new row for the number of rows needed
    var row = null,
        allTheRows = [];
    for (var i=0; i <= this.storyOfNumber; i++) {
        row = new Row(i, this.parentEl, this.isDouble, this.storyOfNumber);
        // keep the row in an array
        allTheRows.push(row);
        console.dir(row);
        row.init();
    }
};

/**
 *
 * @param i {Number}: something
 * @param parentEl {HTMLElement}: element where the row will be rendered
 * @param isDouble {boolean}
 * @param storyOfNumber {string}
 * @constructor
 */
function Row(i, parentEl, isDouble, storyOfNumber) {
    this.parentEl = parentEl;
    this.el = null; // is <div> element the row is in
    this.rowNumber = i;
    this.isDouble = isDouble;
    this.storyOfNumber = storyOfNumber;
    this.operand1 = null;
    this.operand2 = null;
    this.answer = null;
}

Row.prototype.init = function() {
    this.renderContainer();
    this.renderRow();
    this.addEvents();
};

// add row's <div> element to the parent container
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

/**
 *
 *
 * @param parentEl
 * @param elementName
 * @param attributeList
 * @returns {HTMLElement}
 *
 * @todo create foreach function to iterate over properties in object
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

/**
 *
 *
 */
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


/**
 *
 */
Row.prototype.checkAnswerCorrect = function() {
    if (this.operand1.value !== '' && this.operand2.value !== '') {
        if (parseInt(this.operand1.value) + parseInt(this.operand2.value) === parseInt(this.answer.value)) {
            this.el.className = 'answerCorrect';
        } else {
            this.el.className = 'answerIncorrect';
        }
    }
};

/**
 *
 */
Row.prototype.addEvents = function() {
    var self = this;
    this.el.addEventListener("change", function() {
        self.checkAnswerCorrect();
    });
};
