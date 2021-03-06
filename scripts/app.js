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

NumberBonds.App = (function(Story) {
    'use strict';

    var conf = {
        maxNumForDouble: 20,
        storyOfRandoms: {storyNumber: 1, storyType: 'Randoms'},
        storyOfDoubles: {storyNumber: 20, storyType: 'Doubles'},
        storyOfNumbers: {storyNumber: [2, 3, 4, 5, 6, 7, 8, 9, 10], storyType: 'Numbers'}
    };

    // getPageURL

    // getStorySelection

    // getTitle

    // getStoryType
    var getStoryType = function(storySelection) {
        return (storySelection===conf.storyOfRandoms.storyNumber) ? conf.storyOfRandoms.storyType
            : (storySelection===conf.storyOfDoubles.storyNumber) ? conf.storyOfDoubles.storyType
            : conf.storyOfNumbers.storyType;
    };

    // createNewStory

    /**
     * @param containerEl{Object} HTMLElement where the content will be rendered
     */
    var init = function(containerEl) {

        // Update the page content when the click event is called. Use event bubbling so listener can be on document itself
        // Even propagation is the process by which the browser decides which objects to trigger event handlers on. For
        // events that are specific to a single object, no propagation is required. Other kinds of events, however
        // propagate or "bubble" up the document tree. It is first fired on the target element, then the containing
        // elements and the Document object itself. It is sometimes more convenient to register a single event handler
        // on a Document or other container element than to register handlers on individual elements. In another form
        // of event propagation called event capturing, handlers have the chance to intercept/capture events before
        // they are delivered to their actual target.
        document.addEventListener('click', function() {
            if (event.target.className === 'storyLink') {
                event.preventDefault(); // the default action is to follow the link and load a new page.
                var pageURL = event.target.getAttribute('href'), // Fetch the page data using the URL in the link
                    storySelection = parseInt(event.target.getAttribute('data-num'), 10),
                    title = 'Story of ' + storySelection,
                    storyType = getStoryType(storySelection),
                    story = new Story(containerEl, storySelection, storyType);

                // Update the storyContent
                story.init();

                // Create a new browser history entry, passing in the storySelection as the stateObject, title and URL
                // to display in the address bar.
                history.pushState(storySelection, title, pageURL);
            }
        });

        // The popstate event is fired on window when the active history entry changes, ie, when the browsers back or
        // forward buttons are clicked. The event passed into the listener callback contains a state property that is
        // used to retrieve the state object that is associated with the history entry.
        window.addEventListener('popstate', function(event) {
            // event.state will be undefined until user has clicked on a navigation option.
            if (event.state) {
                // I simply recreate the rows for the story at the moment
                var story = new Story(containerEl, event.state, getStoryType(event.state));
                story.init();
            }
        });

    };

    return {
        conf: conf,
        init: init
    };
})(NumberBonds.Story); // pass in the dependency


// Call the App.init function once the DOM is ready
window.onload = function() {
    'use strict';
    NumberBonds.App.init(document.getElementById('content'));
};
