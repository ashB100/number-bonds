/**
 * Created by ashnita on 16/01/2014.
 */

/**
 *
 * @param rowNum: keeps track of the row number that is being created, row numbers start from 0
 * @param parentEl: reference to the HTMLElement the rows are being added into
 * @param storyOfNumber: data-num value for the users story selection, "Story of Numbers"(2-10), "Double"(20), "Random"(1)
 * @constructor el: is the reference to the div element for the row, it contains:
 * input span+ input span= input span.fa, ie, operand1 + operand2 = answer (feedback)
 */
function Row(rowNum, parentEl, storyOfNumber) {
    'use strict';
    this.rowNumber = rowNum;
    this.parentEl = parentEl;
    this.storyOfNumber = storyOfNumber;

    this.el = null; // is <div> element the row is in
    this.operand1 = null;
    this.operand2 = null;
    this.answer = null;
    this.rowIsCorrect = false;
    this.numberOfTimesChanged = 0;
    this.isDouble = (storyOfNumber === NumberBonds.conf.maxNumForDouble);
    this.score = 0;
    this.randomNumCount = 0;
}

/**
 * Create the div element for the row,
 * create the input and span elements (for operand1 + operand2 = answer feedback), into this row (div element),
 * add event listener for input changes.
 */
Row.prototype.createEquation = function() {
    'use strict';
    this.renderContainer();
    this.renderRow();
    this.addEvents();
    NumberBonds.score = 0;
};

/**
 * Create the HTMLElement for the row (div)
 */
Row.prototype.renderContainer = function() {
    'use strict';
    this.el = NumberBondsUtils.renderElement(this.parentEl, 'div', {className: 'row'});
};

/**
 * The content is rendered differently for "Double" or "Number" selections, eg. Double: 2 + 2 = ---, Number: --- + --- = 2
 */
Row.prototype.renderRow = function() {
    'use strict';
    if (this.isDouble === true) {
        // operand1
        this.operand1 = NumberBondsUtils.renderElement(this.el, 'input', {disabled: 'disabled', value: this.rowNumber});
        // "+"
        NumberBondsUtils.renderElement(this.el, 'span', {innerHTML: '+'});
        // operand2
        this.operand2 = NumberBondsUtils.renderElement(this.el, 'input', {disabled: 'disabled', value: this.rowNumber});
        // "="
        NumberBondsUtils.renderElement(this.el, 'span', {innerHTML: '='});
        // answer
        this.answer = NumberBondsUtils.renderElement(this.el, 'input', {autofocus: (this.rowNumber === 0),required: 'required', pattern: '[0-9]'});
        // feedback
        NumberBondsUtils.renderElement(this.el, 'span', {className: 'fa'});
    } else if(this.storyOfNumber === 1) {
        this.addARandomRow();

        // keep count of and display questions attempted
        // display countdown of time elapsed

    } else {
        // operand1
        this.operand1 = NumberBondsUtils.renderElement(this.el, 'input', {autofocus: (this.rowNumber === 0), pattern: 'd+'});
        // "+"
        NumberBondsUtils.renderElement(this.el, 'span', {innerHTML: '+'});
        // operand2
        this.operand2 = NumberBondsUtils.renderElement(this.el, 'input', {pattern: 'd+', required: true});
        // "="
        NumberBondsUtils.renderElement(this.el, 'span', {innerHTML: '='});
        // answer
        this.answer = NumberBondsUtils.renderElement(this.el, 'input', {disabled: 'disabled', value: this.storyOfNumber});
        // feedback
        NumberBondsUtils.renderElement(this.el, 'span', {className: 'fa'});
    }
};

Row.prototype.addARandomRow = function() {
    'use strict';
    var val1 = NumberBondsUtils.getRandomInt(1,5);
    var val2 = NumberBondsUtils.getRandomInt(1,10);
    this.el.innerHTML = '';
    this.randomNumCount += 1;
    // operand1
    this.operand1 = NumberBondsUtils.renderElement(this.el, 'input', {disabled: 'disabled', value: val1});
    // "+"
    NumberBondsUtils.renderElement(this.el, 'span', {innerHTML: '+'});
    // operand2
    this.operand2 = NumberBondsUtils.renderElement(this.el, 'input', {disabled: 'disabled', value: val2});
    // "="
    NumberBondsUtils.renderElement(this.el, 'span', {innerHTML: '='});
    // answer
    this.answer = NumberBondsUtils.renderElement(this.el, 'input', {autofocus: (this.rowNumber === 1)});
    // feedback
    NumberBondsUtils.renderElement(this.el, 'span', {className: 'fa'});
};

Row.prototype.checkAnswerCorrect = function() {
    'use strict';
    var scoreEl = document.getElementById('score');
    // if both operand1 and operand2 are entered
    if (this.operand1.value !== '' && this.operand2.value !== '') {
        // increment number of times this row has changed
        this.numberOfTimesChanged += 1;
        if (parseInt(this.operand1.value) + parseInt(this.operand2.value) === parseInt(this.answer.value)) {
            this.el.classList.remove('answerIncorrect');
            this.el.classList.add('answerCorrect');
            this.rowIsCorrect = true;
            if (this.storyOfNumber === 1) {
                this.score ++;
            }
            // if answer correct and number of times changed is 1
            if (this.rowIsCorrect && this.numberOfTimesChanged === 1) {
                // increment score
                ++NumberBonds.score;
            }

        } else {
            // set the row's class to 'answerIncorrect'
            this.el.classList.remove('answerCorrect');
            this.el.classList.add('answerIncorrect');
            // if the correct answer had been provided before but now the now an incorrect value is provided then decrement the score
            if (this.numberOfTimesChanged > 1 && this.rowIsCorrect) {
                // decrement score
                NumberBonds.score -= 1;
            }
        }
        if (this.storyOfNumber === 1 ) {
            scoreEl.innerHTML = 'Score: ' + this.score + '/' + this.randomNumCount;
        } else {
            scoreEl.innerHTML = 'Score: ' + NumberBonds.score + '/' + (parseInt(this.storyOfNumber) + 1);
        }
    }
};

// Check that only number values are entered
Row.prototype.validateInput = function() {
    // if the user enters the same operand1 and operand2 combination, give a message and fade
    // if operand1 != the rowNumber, display a message "enter in order" and fade the message away
};

Row.prototype.addEvents = function() {
    'use strict';
    var self = this;

    this.el.addEventListener('change', function() {
        self.checkAnswerCorrect();
    });

    this.el.addEventListener('keyup', function() {
        self.validateInput();
    });

    // Add an event for enter key press for 'Story of Random Numbers', if field is empty don't accept enter press
    if(this.storyOfNumber === 1) {
        this.el.addEventListener('keypress', function() {
            if (event.keyCode === 13) {
                self.addARandomRow();
            }
        });
    }
};
