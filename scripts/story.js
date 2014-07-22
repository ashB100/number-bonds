/**
 * Created by ashnita on 20/07/2014.
 */

var NumberBonds = NumberBonds || {};

NumberBonds.Story = function(containerEl, storySelection, storyType) {
    'use strict';
    this.containerEl = containerEl;
    this.storySelection = storySelection;
    this.storyType = storyType;
    this.storyTitle = '';
};

NumberBonds.Story.prototype.setTitle = function() {
    'use strict';

    switch(this.storyType) {
        case NumberBonds.App.conf.storyOfRandoms.storyType :
            this.storyTitle = 'Story of Random Numbers';
            break;
        case NumberBonds.App.conf.storyOfDoubles.storyType :
            this.storyTitle = 'Story of Doubles';
            break;
        case NumberBonds.App.conf.storyOfNumbers.storyType :
            this.storyTitle = 'Story of ' + this.storySelection;
            break;
        default :
            this.storyTitle = 'Story';
            break;
    }
};

NumberBonds.Story.prototype.renderTitle = function(storyTitle) {
    'use strict';
    NumberBonds.Utilities.renderElement(this.containerEl, 'p', {innerHTML: storyTitle});
};

NumberBonds.Story.prototype.clearContent = function() {
    'use strict';
    this.containerEl.innerHTML = '';
};

NumberBonds.Story.prototype.generateRenderFn = function(containerEl, storySelection) {
    'use strict';
    if (storySelection === 1) {
        return function() {
            var row = new NumberBonds.Lines.Row(1, containerEl, storySelection);
            row.createEquation();
        };
    } else {
        return function () {
            for (var rowNumber = 0; rowNumber <= storySelection; rowNumber++) {
                var row = new NumberBonds.Lines.Row(rowNumber, containerEl, storySelection);
                row.createEquation();
                console.log(row);
            }
        };
    }
};

NumberBonds.Story.prototype.init = function(storySelection) {
    'use strict';
    console.log(this);
    // clear the content first
    this.clearContent();

    // set story title
    this.setTitle();

    // render the title of story
    this.renderTitle(this.storyTitle);

    // render the content of the story
    var renderStoryContent = this.generateRenderFn(this.containerEl, storySelection);
    renderStoryContent();
};


/*
NumberBonds.Story = (function(Lines, Utils) {
    'use strict';

    var containerEl;

    var setContainer = function(el) {
        containerEl = el;
    };

    var renderStorySelection = function(storySelection) {
        var row;

        // clear the content first
        console.dir(containerEl);
        containerEl.innerHTML = '';

        // print the title of story
        printTitle(storySelection);

        // print the lines of the story (0-rowNumber, except for Random Numbers which only has one row)
        for (var rowNumber = 0; rowNumber <= storySelection; rowNumber++) {
            // storySelection 1 is for Story of Random Numbers. Adjust rowNumber so only one row gets created
            if (storySelection === 1) {
                ++rowNumber;
            }
            row = new Lines.Row(rowNumber, containerEl, storySelection);
            row.createEquation();
        }
    };

    var printTitle = function(storySelection) {
        var title = 'Story Of ' + storySelection;
        if (storySelection === 1) {
            title = 'Story Of Randomly Generated Numbers';
        } else if(storySelection === 20) {
            title = 'Story of Doubles';
        }
        Utils.renderElement(containerEl, 'p', {innerHTML: title});
    };

    return {
        setContainer: setContainer,
        renderStorySelection: renderStorySelection
    };
})(NumberBonds.Lines, NumberBonds.Utilities);
*/