String.prototype.trim = function() {
    return this.replace(/^[\s\{]+|[\s\}]+$/g, "");
};

function cssshim() {
    var styleTags = document.getElementsByTagName("style");
    var mainTag = document.styleSheets[0];
    while (styleTags.length > 1) {
        var removingTag = styleTags[1];
        //var rules = removingTag.innerHTML;
        var rulesString = removingTag.innerHTML.replace(/[\s]+/g, " ");
        var rules = rulesString.match(/[^{]+{[^}]+}/g);
        for (var i=0, iMax=rules.length; i<iMax; i++) {
            var tokens= rules[i].match(/[^{}]+/g);
            var selector = tokens[0].trim();
            var declaration = tokens[1].trim();
            mainTag.addRule(selector, declaration);
        }
        removingTag.parentNode.removeChild(removingTag);
    }
}
