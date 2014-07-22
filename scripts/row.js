/**
 * Created by ashnita on 16/01/2014.
 */

var NumberBonds = NumberBonds || {};


/**
 * Row constructor - an instance of the row is created for each line of 'story'
 * @param rowNum: {number} keeps track of the row number that is being created, row numbers start from 0
 * @param parentEl: {object} reference to the HTMLElement the rows are being added into
 * @param storyOfNumber: {number}data-num value for the users story selection, "Story of Numbers"(2-10), "Double"(20), "Random"(1)
 * @param storyType: {string} the type of story, ie, Doubles/Randoms/Numbers
 * @constructor el: is the reference to the div element for the row, it contains:
 * input span+ input span= input span.fa, ie, operand1 + operand2 = answer (feedback)
 */
NumberBonds.Row = function(rowNum, parentEl, storyOfNumber, storyType) {
    'use strict';
    this.rowNumber = rowNum;
    this.parentEl = parentEl;
    this.storyOfNumber = storyOfNumber;
    this.storyType = storyType;

    this.el = null; // the <div> element the row is created inside
    this.operand1 = null;
    this.operand2 = null;
    this.answer = null;
    this.rowIsCorrect = false;
    this.numberOfTimesChanged = 0;
    this.score = 0;
    this.randomNumCount = 0;
};

/**
 * Create the div element for the row,
 * create the input and span elements (for operand1 + operand2 = answer feedback), into this row (div element),
 * add event listener for input changes.
 */
NumberBonds.Row.prototype.createEquation = function() {
    'use strict';
    this.renderContainer();
    this.renderRow();
    this.addEvents();
    NumberBonds.score = 0;
};

/**
 * Create the HTMLElement for the row (div)
 */
NumberBonds.Row.prototype.renderContainer = function() {
    'use strict';
    this.el = NumberBonds.Utilities.renderElement(this.parentEl, 'div', {className: 'row'});
};

/**
 * The content is rendered differently for "Double" and "Number" selections, eg. Double: 2 + 2 = ---, Number: --- + --- = 2
 */
NumberBonds.Row.prototype.renderRow = function() {
    'use strict';
    var Utils = NumberBonds.Utilities;
    if (this.storyType === NumberBonds.App.conf.storyOfDoubles.storyType) {
        // operand1
        this.operand1 = Utils.renderElement(this.el, 'input', {disabled: 'disabled', value: this.rowNumber});
        // "+"
        Utils.renderElement(this.el, 'span', {innerHTML: '+'});
        // operand2
        this.operand2 = Utils.renderElement(this.el, 'input', {disabled: 'disabled', value: this.rowNumber});
        // "="
        Utils.renderElement(this.el, 'span', {innerHTML: '='});
        // answer
        this.answer = Utils.renderElement(this.el, 'input', {autofocus: (this.rowNumber === 0),required: 'required', pattern: '[0-9]'});
        // feedback
        Utils.renderElement(this.el, 'span', {className: 'fa'});
    } else if(this.storyOfNumber === 1) {
        this.addARandomRow();

        // keep count of and display questions attempted
        // display countdown of time elapsed

    } else {
        // operand1
        this.operand1 = Utils.renderElement(this.el, 'input', {autofocus: (this.rowNumber === 0), pattern: 'd+'});
        // "+"
        Utils.renderElement(this.el, 'span', {innerHTML: '+'});
        // operand2
        this.operand2 = Utils.renderElement(this.el, 'input', {pattern: 'd+', required: true});
        // "="
        Utils.renderElement(this.el, 'span', {innerHTML: '='});
        // answer
        this.answer = Utils.renderElement(this.el, 'input', {disabled: 'disabled', value: this.storyOfNumber});
        // feedback
        Utils.renderElement(this.el, 'span', {className: 'fa'});
    }
};

NumberBonds.Row.prototype.addARandomRow = function() {
    'use strict';
    var Utils = NumberBonds.Utilities;
    var val1 = Utils.getRandomInt(1,5);
    var val2 = Utils.getRandomInt(1,10);
    this.el.innerHTML = '';
    this.randomNumCount += 1;
    // operand1
    this.operand1 = Utils.renderElement(this.el, 'input', {disabled: 'disabled', value: val1});
    // "+"
    Utils.renderElement(this.el, 'span', {innerHTML: '+'});
    // operand2
    this.operand2 = Utils.renderElement(this.el, 'input', {disabled: 'disabled', value: val2});
    // "="
    Utils.renderElement(this.el, 'span', {innerHTML: '='});
    // answer
    this.answer = Utils.renderElement(this.el, 'input', {autofocus: (this.rowNumber === 1)});
    // feedback
    Utils.renderElement(this.el, 'span', {className: 'fa'});
};

NumberBonds.Row.prototype.checkAnswerCorrect = function() {
    'use strict';
    var scoreEl = document.getElementById('score');

    console.log(this);
    console.log(this.operand1.value);
    console.log(this.operand2.value);
    // if both operand1 and operand2 are entered
    if (this.operand1.value !== '' && this.operand2.value !== '') {

        // handle correct answer
        if (parseInt(this.operand1.value) + parseInt(this.operand2.value) === parseInt(this.answer.value)) {
            this.el.classList.remove('answerIncorrect');
            this.el.classList.add('answerCorrect');
            this.rowIsCorrect = true;

            // for random numbers score
            if (this.storyOfNumber === 1) {
                this.score ++;
            }

            // increment number of times this row has changed
            this.numberOfTimesChanged += 1;
            // if answer correct and number of times changed is 1
            if (this.rowIsCorrect && this.numberOfTimesChanged === 1) {
                // increment score
                ++NumberBonds.score;
            }
            console.log('AnswerCorrect: ' + this.rowIsCorrect + ' Score: ' + NumberBonds.score);

        // handle incorrect answer
        } else {
            // set the row's class to 'answerIncorrect'
            this.el.classList.remove('answerCorrect');
            this.el.classList.add('answerIncorrect');

            // if the correct answer had been provided before but now an incorrect value is provided then decrement the score
            if (this.numberOfTimesChanged > 1 && this.rowIsCorrect) {
                // decrement score
                NumberBonds.score -= 1;
            }
        }

        // create another event handler for random number answers

        // print score
        if (this.storyOfNumber === 1 ) {
            scoreEl.innerHTML = 'Score: ' + this.score + '/' + this.randomNumCount;
        } else {
            scoreEl.innerHTML = 'Score: ' + NumberBonds.score + '/' + (this.storyOfNumber+1);
        }
    }
};

// Check that only number values are entered
NumberBonds.Row.prototype.validateInput = function() {
    'use strict';
    // if the user enters the same operand1 and operand2 combination, give a message and fade
    // if operand1 != the rowNumber, display a message "enter in order" and fade the message away
};

NumberBonds.Row.prototype.addEvents = function() {
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
