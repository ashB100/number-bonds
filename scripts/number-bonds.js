/**
 * Created by Ashnita on 30/12/2013.
 * NumberBonds is an app that helps children learn and remember combination of numbers that add up to a number so they
 * don't have to calculate them each time. It presents each number (numbers between 2-10 and doubles of numbers up to 20)
 * as a story of that number (or a story of Doubles). The content is rendered by JS according to the user's selection.
 */
window.onload = function() {
    numberBonds.init();
};

/**
 * numberBonds follows the Revealing Module Pattern (it could be a custom object but I wanted to try this pattern).
 * It gets the parent container where the content will be added, adds the event listener for users selection and
 * uses the Row object to create the lines(rows) for the story selected.
 * The content is rendered differently for "Double" or "Number" selections, eg. Double: 2 + 2 = ---, Number: --- + --- = 2
 * A row is created (containing input and span elements for operand1 + operand2 = answer (feedback) ) for each
 * pair of numbers that add up to the selected number (ie, n+1). Eg. The combinations for Story of 2 are:
 * 0 + 2 = 2, 1 + 1 = 2, 2 + 0 = 2, therefore 3 rows/lines are created for the Story of 2.
 */
var numberBonds = function () {
    // configurable variables
    var conf = {
        maxNumForDouble: 20,
        parentContainer: "content"
    };

    var parentEl;       // the parent HTMLElement where the content will be displayed
    var storySelection; // will be set to the "data-num" attribute when user clicks a story selection (nav) link
    var isDouble;       // will be set if story selection is Double

    var init = function () {
        setParentElement();
        addClickEvent();

        console.dir(parentEl);
    };

    var setParentElement = function () {
        parentEl = document.getElementById(conf.parentContainer);
    };

    var addClickEvent = function() {
        document.addEventListener('click', handleStorySelection);
    };

    var handleStorySelection = function() {
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
        printTitle();
        // print the lines of the story
        for (var rowNum = 0; rowNum <= storySelection; rowNum++) {
            row = new Row(rowNum, parentEl, storySelection);
            row.createEquation();
        }
    };

    var printTitle = function() {
        renderElement(parentEl, 'p', {innerHTML: 'Story Of : ' + (isDouble ? 'Double' : storySelection), className: 'storyTitle'});
    };

    return {
        conf: conf,
        init: init,
        parentEl: parentEl,
        storySelection: storySelection,
        isDouble: isDouble
    }
}();
