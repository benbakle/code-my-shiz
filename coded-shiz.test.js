const codedShiz = require("./coded-shiz");

describe('The code my shiz suite', () => {
    describe('given no block of code', () => {
        it('returns an empty string', () => {
            expect(codedShiz()).toEqual("<code></code>");
        });
    });

    describe('given a block of code', () => {
        describe('that is a comment', () => {
            it('returns a string of html with a comment flag', () => {
                let _code = codeBlock("// This is a comment");
                expect(codedShiz(_code)).toEqual('<code><span class="comment">// This is a comment</span></code>');
            });
        });

        describe('that is NOT a comment', () => {
            describe('that has one or more keywords', () => {
                it('wraps each with a keyword marker', () => {
                    let _code = codeBlock("const function()")
                    expect(codedShiz(_code)).toEqual(`<code><span class='keyword'>const</span> <span class='keyword'>function</span>()</code>`)
                });
            });

            xdescribe('that has one or more variables', () => {
                it('wraps each with a variable marker', () => {
                    let _code = codeBlock(`no quotes`)
                    expect(codedShiz(_code)).toEqual(`<code><span class='variable'>no</span> <span class='variable'>quotes</span></code>`)
                });
            });

            xdescribe('that has one or more string', () => {
                it('wraps each with a string marker', () => {
                    let _code = codeBlock(`"Here is a string" "another"`)
                    expect(codedShiz(_code)).toEqual(`<code><span class='variable'>no</span> <span class='variable'>quotes</span></code>`)
                });
            });
        });
    });

    function codeBlock(text) {
        const _code = document.createElement("code");
        _code.innerText = text;
        return _code;
    }
});