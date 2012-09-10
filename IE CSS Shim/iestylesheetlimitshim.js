// Copyright 2012 Kenneth Heutmaker
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
   
/**
 *  PoC that move style rules from one style tag to another. The purpose is to overcome the stylesheet limit imposed by IE9 or lower.
 */
String.prototype.trim = function() {
    return this.replace(/^[\s\{]+|[\s\}]+$/g, "");
};

function cssshim() {
    var styleTags = document.getElementsByTagName("style");
    var mainTag = document.styleSheets[0];
    while (styleTags.length > 1) {
        var removingTag = styleTags[1];
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
