/**
 * Created by ashnita on 20/07/2014.
 */

var NumberBonds = NumberBonds || {};

/**
 * Constructor for a new Story
 * @param containerEl
 * @param storySelection
 * @param storyType
 * @constructor
 */
NumberBonds.Story = function(containerEl, storySelection, storyType) {
    'use strict';
    this.containerEl = containerEl;
    this.storySelection = storySelection;
    this.storyType = storyType;
    this.storyTitle = '';
    this.rows = []; // store the rows in the story in an array
};

/**
 * Sets the story title based on the story type, ie Doubles, Random or Numbers
 */
NumberBonds.Story.prototype.setTitle = function() {
    'use strict';
    var conf = NumberBonds.App.conf;

    switch(this.storyType) {
        case conf.storyOfRandoms.storyType :
            this.storyTitle = 'Story of Random Numbers';
            break;
        case conf.storyOfDoubles.storyType :
            this.storyTitle = 'Story of Doubles';
            break;
        case conf.storyOfNumbers.storyType :
            this.storyTitle = 'Story of ' + this.storySelection;
            break;
        default :
            this.storyTitle = 'Story';
            break;
    }
};

/**
 * Prints the title of the story
 * @param storyTitle{string} The title of the story
 */
NumberBonds.Story.prototype.renderTitle = function(storyTitle) {
    'use strict';
    NumberBonds.Utilities.renderElement(document.getElementById('title'), 'h2', {innerHTML: storyTitle});
};

/**
 * Clear the HTML title, content and score elements for the new story
 */
NumberBonds.Story.prototype.clearContent = function() {
    'use strict';
    this.containerEl.innerHTML = '';
    document.getElementById('score').innerHTML = '';
    document.getElementById('title').innerHTML = '';
};

// pass in parameters as this is not accessible from nested functions
NumberBonds.Story.prototype.generateRenderFn = function(storySelection, containerEl, storyType) {
    'use strict';
    if (storySelection === 1) {
        return function() {
            var row = new NumberBonds.Row(1, containerEl, storySelection, storyType);
            row.createEquation();
        };
    } else {
        return function () {
            for (var rowNumber = 0; rowNumber <= storySelection; rowNumber++) {
                NumberBonds.Story.rows[rowNumber] = new NumberBonds.Row(rowNumber, containerEl, storySelection, storyType);
                NumberBonds.Story.rows[rowNumber].createEquation();
            }
        };
    }
};

/**
 * Creates a Row instance for each line of the story, the number of lines depends on the story selection and is 1 plus
 * the story number, e.g Story of 2 has (1+2) lines. The Story of Randoms has only one line.
 */
NumberBonds.Story.prototype.renderStoryContent = function() {
    'use strict';
    for (var rowNumber = 0; rowNumber <= this.storySelection; rowNumber++) {
        // adjust the row number so only one line is created for the Story of Randoms
        if (this.storySelection === 1) {
            ++rowNumber;
        }
        this.rows[rowNumber] = new NumberBonds.Row(rowNumber, this.containerEl, this.storySelection, this.storyType);
        this.rows[rowNumber].createEquation();
    }
};

/**
 * The main init method of Story which clears the HTML div contents, prints the title and the rows/lines of the story.
 */
NumberBonds.Story.prototype.init = function() {
    'use strict';
    console.log('story: ' + this.storySelection);
    // clear the content first
    this.clearContent();

    // set story title
    this.setTitle();

    // render the title of story
    this.renderTitle(this.storyTitle);

    // render the content of the story
    //var renderStoryContent = this.generateRenderFn(this.storySelection, this.containerEl, this.storyType);
    this.renderStoryContent();
};