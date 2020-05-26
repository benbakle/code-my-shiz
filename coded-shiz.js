
String.prototype.splitByMultipleChars = function (characters) {
    let initialSplit

    if (characters.length > 0)
        initialSplit = this.split(regEx(characters));

    if (characters.length > 1)
        return handleMultiSplit(initialSplit, characters.splice(1))

    return initialSplit;

    function handleMultiSplit(strings, chars) {
        let _result = [];

        if (chars.length > 0)
            for (let s = 0; s < strings.length; s++)
                _result = handleSplitByCharacter(_result, strings[s], chars[0])

        if (chars.length > 1)
            _result = handleMultiSplit(_result, chars.splice(1));

        return _result.filter(s => s !== "");
    }

    function handleSplitByCharacter(resultArray, string, char) {
        return (string.includes(char))
            ? [...resultArray, ...string.split(regEx(char))]
            : [...resultArray, string];
    }

    function regEx(char) {
        return new RegExp("([" + char + "])");
    }
}

module.exports = function (codeBlockElement) {
    let _codeText = !!codeBlockElement ? codeBlockElement.innerText : "";

    if (isComment())
        return `<code><span class="comment">${_codeText}</span></code>`;

    _codeText = wrapKeywords(_codeText);

    return `<code>${_codeText}</code>`;

    function wrapKeywords(text) {
        const keywords = ["const", "function"];

        for (const k of keywords)
            text = wrapWithMarker(text, k, "keyword");

        return text
    }

    function wrapWithMarker(searchableText, searchString, marker) {
        return searchableText.split(new RegExp(searchString)).join(`<span class='${marker}'>${searchString}</span>`)
    }

    function isComment() {
        return _codeText.startsWith("//");
    }
}