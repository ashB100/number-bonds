/**
 * Created by Ashnita on 30/12/2013.
 * NumberBonds is an app that helps children learn and remember combination of numbers that add up to a number so they
 * don't have to calculate them each time. It presents each number (numbers between 2-10 and doubles of numbers up to 20)
 * as a story of that number (or a story of Doubles). The content is rendered by JS according to the user's selection.
 */
/** Refactored to create NumberBonds namespace with App, Story and Utilities modules in this namespace, on 19/07/2014...*/

/**
 * NumberBonds follows the Revealing Module Pattern. For namespacing, it has NumberBonds as main module with following
 * modules in it: App, Story, Lines and Utilities
 *
 * The application gets the parent container where the content will be added, adds the event listener for users' selection and
 * uses the Row object to create the lines(rows) for the story selected.
 * The content is rendered differently for "Double" or "Number" selections, eg. Double: 2 + 2 = ---, Number: --- + --- = 2
 * A row is created (containing input and span elements for operand1 + operand2 = answer (feedback) ) for each
 * pair of numbers that add up to the selected number (ie, n+1). Eg. The combinations for Story of 2 are:
 * 0 + 2 = 2, 1 + 1 = 2, 2 + 0 = 2, therefore 3 rows/lines are created for the Story of 2.
 */


var NumberBonds = NumberBonds || {};

NumberBonds.App = (function() {
    'use strict';

    var conf = {
        maxNumForDouble: 20,
        storyOfRandoms: {storyNumber: 1, storyType: 'Randoms'},
        storyOfDoubles: {storyNumber: 20, storyType: 'Doubles'},
        storyOfNumbers: {storyNumber: [2, 3, 4, 5, 6, 7, 8, 9, 10], storyType: 'Numbers'}
    };

    var getStoryType = function(storySelection) {
        return (storySelection===conf.storyOfRandoms.storyNumber) ? conf.storyOfRandoms.storyType
            : (storySelection===conf.storyOfDoubles.storyNumber) ? conf.storyOfDoubles.storyType
            : conf.storyOfNumbers.storyType;
    };

    /**
     * @param containerEl{Object} HTMLElement where the content will be rendered
     */
    var init = function(containerEl) {

        // Update the page content when the click event is called. Use event bubbling so listener can be on document itself
        document.addEventListener('click', function() {
            if (event.target.className === 'storyLink') {
                event.preventDefault();

                var pageURL = event.target.getAttribute('href'), // Fetch the page data using the URL in the link
                    storySelection = parseInt(event.target.getAttribute('data-num'), 10),
                    title = 'Story of ' + storySelection,
                    storyType = getStoryType(storySelection),
                    story = new NumberBonds.Story(containerEl, storySelection, storyType);

                // Update the storyContent
                story.init(storySelection);

                // Create a new history item.
                history.pushState(storySelection, title, pageURL);
            }
        });

        // Update the page content when the popstate event is called. event.state will be undefined until user has
        // clicked on a navigation option.
        window.addEventListener('popstate', function(event) {
            if (event.state) {
                NumberBonds.Story.init(event.state);
            }
        });

    };

    return {
        conf: conf,
        init: init
    };
})();


// Call the App.init function once the DOM is ready
window.onload = function() {
    'use strict';

    NumberBonds.App.init(document.getElementById('content'));
};
