/**
 * Created by ashnita on 16/01/2014.
 */
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
