/**
 * Created by ashnita on 20/07/2014.
 */

var NumberBonds = NumberBonds || {};

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
