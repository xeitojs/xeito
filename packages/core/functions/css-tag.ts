
export const css = (strings: TemplateStringsArray, ...values: any[]): CSSStyleSheet => {
  const cssString = strings.reduce((result, str, i) => {
    // Remove escape characters
    str = str.replace(/\\([0-9a-f]{1,6})\s?/gi, (match, code) => {
      code = parseInt(code, 16);

      // Don't unescape ASCII characters, assuming they're encoded for a good reason
      if (code < 0x80) return match;

      return String.fromCharCode(code);
    });

    let value = values[i];

    if (value === null || value === undefined) {
      value = '';
    }

    if (Array.isArray(value)) {
      value = value.join(' ');
    }

    if (typeof value === 'function') {
      value = value();
    }

    return result + str + (value || '');
  }, '');

  // Convert the css string to a constructable stylesheet
  const stylesheet = new CSSStyleSheet();
  stylesheet.replaceSync(cssString);
  return stylesheet;
}
