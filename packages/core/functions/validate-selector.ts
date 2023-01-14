/**
 * Checks if a selector is a potential custom element name.
 * Using logic from is-potential-custom-element-name
 * @see https://github.com/mathiasbynens/is-potential-custom-element-name
 * 
 * @author Mathias Bynens
 * @license MIT
 * 
 * All credit to Mathias Bynens for the original code.
 */

const elementRegex = /^[a-z](?:[\.0-9_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*-(?:[\x2D\.0-9_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/;
const isPotentialCustomElementName = function(string) {
	return elementRegex.test(string);
};

/**
 * Validates a custom element name.
 * @see https://html.spec.whatwg.org/multipage/scripting.html#valid-custom-element-name
 * 
 * Using logic from validate-element-name.js
 * @see https://github.com/sindresorhus/validate-element-name
 * 
 * @author Sindre Sorhus
 * @license MIT
 * 
 * All credit to Sindre Sorhus for the original code.
 */

const reservedNames = new Set([
	'annotation-xml',
	'color-profile',
	'font-face',
	'font-face-src',
	'font-face-uri',
	'font-face-format',
	'font-face-name',
	'missing-glyph'
]);

function hasError(name) {
	if (!name) {
		return 'Missing element name.';
	}

	if (/[A-Z]/.test(name)) {
		return 'Custom element names must not contain uppercase ASCII characters.';
	}

	if (!name.includes('-')) {
		return 'Custom element names must contain a hyphen. Example: unicorn-cake';
	}

	if (/^\d/i.test(name)) {
		return 'Custom element names must not start with a digit.';
	}

	if (/^-/i.test(name)) {
		return 'Custom element names must not start with a hyphen.';
	}

	// https://html.spec.whatwg.org/multipage/scripting.html#prod-potentialcustomelementname
	if (!isPotentialCustomElementName(name)) {
		return 'Invalid element name.';
	}

	if (reservedNames.has(name)) {
		return 'The supplied element name is reserved and can\'t be used.\nSee: https://html.spec.whatwg.org/multipage/scripting.html#valid-custom-element-name';
	}
}

function hasWarning(name) {
	if (/^polymer-/i.test(name)) {
		return 'Custom element names should not start with `polymer-`.\nSee: http://webcomponents.github.io/articles/how-should-i-name-my-element';
	}

	if (/^x-/i.test(name)) {
		return 'Custom element names should not start with `x-`.\nSee: http://webcomponents.github.io/articles/how-should-i-name-my-element/';
	}

	if (/^ng-/i.test(name)) {
		return 'Custom element names should not start with `ng-`.\nSee: http://docs.angularjs.org/guide/directive#creating-directives';
	}

	if (/^xml/i.test(name)) {
		return 'Custom element names should not start with `xml`.';
	}

	if (/^[^a-z]/i.test(name)) {
		return 'This element name is only valid in XHTML, not in HTML. First character should be in the range a-z.';
	}

	if (name.endsWith('-')) {
		return 'Custom element names should not end with a hyphen.';
	}

	if (/\./.test(name)) {
		return 'Custom element names should not contain a dot character as it would need to be escaped in a CSS selector.';
	}

	if (/[^\u0020-\u007E]/.test(name)) {
		return 'Custom element names should not contain non-ASCII characters.';
	}

	if (/--/.test(name)) {
		return 'Custom element names should not contain consecutive hyphens.';
	}

	if (/[^a-z\d]{2}/i.test(name)) {
		return 'Custom element names should not contain consecutive non-alpha characters.';
	}
}

export interface ValidateSelectorResult {
  isValid: boolean;
  message: string;
}

export const validateSelector = (selector: string): any => {
  const errorMessage = hasError(selector);

	return {
		isValid: !errorMessage,
		message: errorMessage || hasWarning(selector)
	};
}