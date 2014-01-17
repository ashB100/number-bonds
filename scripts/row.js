/**
 * Created by ashnita on 16/01/2014.
 */

/**
 *
 * @param rowNum contains which row number is being created, row numbers start from 0
 * @param parentEl reference to the HTMLElement the rows are being added into
 * @param storyOfNumber contains the users story selection, ie Story of 2 - Story of 10 ("Story of Numbers") or Double
 * @constructor el is the reference to the div element for the row, it contains:
 * input span+ input span= input span.fa, ie, operand1 + operand2 = answer (feedback)
 */
function Row(rowNum, parentEl, storyOfNumber) {
    this.parentEl = parentEl;
    this.el = null; // is <div> element the row is in
    this.rowNumber = rowNum;
    this.isDouble = (storyOfNumber === '20');
    this.storyOfNumber = storyOfNumber;
    this.operand1 = null;
    this.operand2 = null;
    this.answer = null;
}

/**
 * Create the div element for the row,
 * create the input and span elements (for operand1 + operand2 = answer feedback), into this row (div element),
 * add event listener for input changes.
 */
Row.prototype.createEquation = function() {
    this.renderContainer();
    this.renderRow();
    this.addEvents();
};

/**
 * Create the HTMLElement for the row (div)
 */
Row.prototype.renderContainer = function() {
    this.el = renderElement(this.parentEl, "div", {className: 'row'});
};

/**
 * The content is rendered differently for "Double" or "Number" selections, eg. Double: 2 + 2 = ---, Number: --- + --- = 2
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
        this.answer = renderElement(this.el, 'input', {autofocus: (this.rowNumber == 0),required: true, pattern: "d+"});
        // feedback
        renderElement(this.el, 'span', {className: 'fa'});
    } else {
        // operand1
        this.operand1 = renderElement(this.el, 'input', {autofocus: (this.rowNumber == 0), pattern: 'd+'});
        // "+"
        renderElement(this.el, 'span', {innerHTML: '+'});
        // operand2
        this.operand2 = renderElement(this.el, 'input', {pattern: 'd+', required: true});
        // "="
        renderElement(this.el, 'span', {innerHTML: '='});
        // answer
        this.answer = renderElement(this.el, 'input', {disabled: 'disabled', value: this.storyOfNumber});
        // feedback
        renderElement(this.el, 'span', {className: 'fa'});
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
