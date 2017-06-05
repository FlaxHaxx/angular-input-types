angular.module('inputTypes')

.service('inputUtils', function() {
    this.getCursorPos = function(htmlElement) {
        return htmlElement.selectionEnd;
    };

    this.setCursorPos = function(htmlElement, pos) {
        if (htmlElement.setSelectionRange) {
            htmlElement.focus();
            window.setTimeout(function() {
                // Android Chrome
                htmlElement.setSelectionRange(pos, pos);
            });
        } else if(htmlElement.createTextRange) {
            // IE compatible
            var range = htmlElement.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };
});
