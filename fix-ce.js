/**
 * a tiny JavaScript to fix the composition for Chinese-English mixed web posts.
 * https://github.com/jsntn/fix-ce
 *
 * @version  0.2
 *
 * @author  Jason TIAN (https://jsntn.com)
 *
 */

var fixCE_tag = document.getElementById('fix-ce');
var query = fixCE_tag.src.replace(/^[^\?]+\??/,''); 
// Parse the query string into arguments and parameters
var vars = query.split("&");
var args = {};
for (var i=0; i < vars.length; i++) {
  var pair = vars[i].split("=");
  // decodeURI doesn't expand "+" to a space.
  args[pair[0]] = decodeURI(pair[1]).replace(/\+/g, ' ');
}

// CJK: www.unicode.org/charts/
var CJKcharacter = "[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]"
// ASCII Punctuation: www.unicode.org/charts/PDF/U0000.pdf
// ! - u0021
// ) - u0029
// . - u002e
// ? - u003f
var punctuationMark = "\u0021\u0029\u002e\u003f"

try {
  x = document.getElementById(args['id']);
  // fix the single/double quotation marks display in English text. reference link - http://jsfiddle.net/uM2fY/
  // series of letters/numbers wrapped with single/double quotation marks: 'test', "test", '123', "123"
  x.innerHTML = x.innerHTML.replace(new RegExp('\u201C([a-zA-Z0-9]+)\u201D', 'g'), '&#34;$1&#34');
  x.innerHTML = x.innerHTML.replace(new RegExp('\u2018([a-zA-Z0-9]+)\u2019', 'g'), '&#39;$1&#39');

  // single quotation mark between two letters: let's
  x.innerHTML = x.innerHTML.replace(new RegExp('([a-zA-Z])\u2018([a-zA-Z])', 'g'), '$1&#39;$2');
  x.innerHTML = x.innerHTML.replace(new RegExp('([a-zA-Z])\u2019([a-zA-Z])', 'g'), '$1&#39;$2');

  // single quotation mark after at least single letter:
  // done'
  // done.'
  x.innerHTML = x.innerHTML.replace(new RegExp(`([a-zA-Z]${punctuationMark}?)\u2018`, 'g'), '$1&#39;');
  x.innerHTML = x.innerHTML.replace(new RegExp(`([a-zA-Z]${punctuationMark}?)\u2019`, 'g'), '$1&#39;');

  // double quotation mark after at least single letter:
  // done"
  // done."
  x.innerHTML = x.innerHTML.replace(new RegExp(`([a-zA-Z]${punctuationMark}?)\u201C`, 'g'), '$1&#34;');
  x.innerHTML = x.innerHTML.replace(new RegExp(`([a-zA-Z]${punctuationMark}?)\u201D`, 'g'), '$1&#34;');

  // single quotation mark before at least single letter:
  // he said 'it is OK
  // 'OK
  // NOT -> 他说‘OK’
  x.innerHTML = x.innerHTML.replace(new RegExp('([a-zA-Z] )\u2018([a-zA-Z])', 'g'), '$1&#39;$2');
  x.innerHTML = x.innerHTML.replace(new RegExp('([a-zA-Z] )\u2019([a-zA-Z])', 'g'), '$1&#39;$2');
  x.innerHTML = x.innerHTML.replace(new RegExp(`([^${CJKcharacter}])\u2018([a-zA-Z])`, 'g'), '$1&#39;$2');
  x.innerHTML = x.innerHTML.replace(new RegExp(`([^${CJKcharacter}])\u2019([a-zA-Z])`, 'g'), '$1&#39;$2');

  // double quotation mark before at least single letter:
  // he said "it is OK
  // "OK
  x.innerHTML = x.innerHTML.replace(new RegExp('([a-zA-Z] )\u201C([a-zA-Z])', 'g'), '$1&#34;$2');
  x.innerHTML = x.innerHTML.replace(new RegExp('([a-zA-Z] )\u201D([a-zA-Z])', 'g'), '$1&#34;$2');
  x.innerHTML = x.innerHTML.replace(new RegExp(`([^${CJKcharacter}])\u201C([a-zA-Z])`, 'g'), '$1&#34;$2');
  x.innerHTML = x.innerHTML.replace(new RegExp(`([^${CJKcharacter}])\u201D([a-zA-Z])`, 'g'), '$1&#34;$2');
  // https://en.wikipedia.org/wiki/List_of_Unicode_characters
  // https://theasciicode.com.ar/ascii-printable-characters/double-quotes-quotation-mark-speech-marks-ascii-code-34.html
  // https://theasciicode.com.ar/ascii-printable-characters/double-quotes-quotation-mark-speech-marks-ascii-code-39.html

  // add space between English and CJK characters
  x.innerHTML = x.innerHTML.replace(new RegExp(`([a-zA-Z0-9])(${CJKcharacter})`, 'g'), '$1 $2');
  x.innerHTML = x.innerHTML.replace(new RegExp(`(${CJKcharacter})([a-zA-Z0-9])`, 'g'), '$1 $2');
  // reference:
  // https://stackoverflow.com/questions/21109011/javascript-unicode-string-chinese-character-but-no-punctuation
  // http://flyingsky.github.io/2018/01/26/javascript-detect-chinese-japanese/
  // https://github.com/alsotang/is-chinese/blob/master/ischinese.js
  // https://apps.timwhitlock.info/js/regex
} catch (err) {
  // pass
}
