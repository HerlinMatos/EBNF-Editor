
ace.define("ace/mode/ebnf_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
    "use strict";
    
    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    
    var EbnfHighlightRules = function() {
        
        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used
        this.$rules = {
            "start" : [
                {
                    token : "nonterminal",
                    regex : "(?:[^\"\'])(?:\w+)(?:[^\"\'])"
                },
                {
                    token : "comment", // comments are not allowed, but who cares?
                    regex : "\\/\\/.*$"
                }, {
                    token : "comment.start", // comments are not allowed, but who cares?
                    regex : "\\/\\*",
                    next  : "comment"
                }, {
                    token : "paren.lparen",
                    regex : "[[({]"
                }, {
                    token : "paren.rparen",
                    regex : "[\\])}]"
                },{
                    token : "terminal",
                    regex : "[\"\'][^\"\']+[\"\']"
                }
            ],
            "comment" : [
                {
                    token : "comment.end", // comments are not allowed, but who cares?
                    regex : "\\*\\/",
                    next  : "start"
                }, {
                    defaultToken: "comment"
                }
            ]
        };
        
    };
    
    oop.inherits(EbnfHighlightRules, TextHighlightRules);
    
    exports.EbnfHighlightRules = EbnfHighlightRules;
});
