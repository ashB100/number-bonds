/**
 * Created by Ashnita on 30/12/2013.
 * NumberBonds is an app that helps children learn and remember combination of numbers that add up to a number so they
 * don't have to calculate them each time. It presents each number (numbers between 2-10 and doubles of numbers up to 20)
 * as a story of that number (or a story of Doubles). The content is rendered by JS according to the user's selection.
 */
window.onload = function() {
    NumberBonds.init();
};

/**
 * numberBonds follows the Revealing Module Pattern (it could be a custom object but I wanted to try this pattern).
 * It gets the parent container where the content will be added, adds the event listener for users' selection and
 * uses the Row object to create the lines(rows) for the story selected.
 * The content is rendered differently for "Double" or "Number" selections, eg. Double: 2 + 2 = ---, Number: --- + --- = 2
 * A row is created (containing input and span elements for operand1 + operand2 = answer (feedback) ) for each
 * pair of numbers that add up to the selected number (ie, n+1). Eg. The combinations for Story of 2 are:
 * 0 + 2 = 2, 1 + 1 = 2, 2 + 0 = 2, therefore 3 rows/lines are created for the Story of 2.
 */
var NumberBonds = function () {
    // configurable variables
    var conf = {
        maxNumForDouble: 20,
        storyOfRandoms: 'Randoms',
        storyOfDoubles: 'Doubles',
        parentContainer: 'content'
    };

    var parentEl; // reference to the parent HTMLElement where the content will be displayed
    var scoreEl;  // reference to the HTMLElement where score is displayed
    var score = 0;

    var init = function () {
        setParentElement();

        // Update the page content when the click event is called. Use event bubbling so listener can be on document itself
        document.addEventListener('click', handleStorySelection);

        // Update the page content when the popstate event is called. event.state will be undefined until user has
        // clicked on a navigation option.
        window.addEventListener('popstate', function(event) {
            if (event.state) {
                renderStorySelection(event.state);
            }
        });
        console.dir(parentEl);
    };

    // Set a reference to the parent element, where we'll add our story content. The id is configurable and is stored
    // in the conf variable.
    var setParentElement = function () {
        parentEl = document.getElementById(conf.parentContainer);
    };

    var handleStorySelection = function() {
        if (event.target.className === "storyLink") {
            event.preventDefault();
            // Fetch the page data using the URL in the link
            var pageURL = event.target.getAttribute('href');
            var storySelection = event.target.getAttribute('data-num');
            var title = 'Story of ' + storySelection;
            // Update the storyContent
            renderStorySelection(storySelection);
            // Create a new history item.
            history.pushState(storySelection, title, pageURL);
        }
    };

    var renderStorySelection = function(storySelection) {
        var row;
        // clear the content first
        parentEl.innerHTML = "";
        // print the title of story
        printTitle(storySelection);
        // print the lines of the story

        for (var rowNumber = 0; rowNumber <= storySelection; rowNumber++) {
            if (storySelection == 1) {
                rowNumber ++;
            }
            row = new Row(rowNumber, parentEl, storySelection);
            row.createEquation();
        }
        // create container for score display
        scoreEl = NumberBondsUtils.renderElement(parentEl,'p',{id: 'score', innerHTLM: 'Score: '});
        console.log(scoreEl);
    };

    var printTitle = function(storySelection) {
        var title = 'Story Of: ' + storySelection;
        if (storySelection == 1) {
            title = 'Story Of: Randomly Generated Numbers';
        } else if(storySelection == 20) {
            title = 'Story of: Doubles';
        }
        NumberBondsUtils.renderElement(parentEl, 'p', {innerHTML: title});
    };

    return {
        conf: conf,
        init: init,
        scoreEl: scoreEl,
        score: score
    }
}();
