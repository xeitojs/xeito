/**
 * Basic validation for a selector
 * It just checks the most common errors and pitfall when assigning a selector for a custom element
 * Custom element names should start with a-z and contain a-z and at least one - with optionally 0-9.
 * You should not use the x-, polymer-, ng- prefixes.
 */

const hasError = (selector: string): string | boolean => {
	if (!selector) return 'Selector is required';
	const regex = /^[a-z]+(-[a-z0-9]+)*$/;
	if (!regex.test(selector)) return 'Selector should start with a-z and contain a-z and at least one - with optionally 0-9';
	if (selector.startsWith('x-')) return 'Selector should not start with x-';
	if (selector.startsWith('polymer-')) return 'Selector should not start with polymer-';
	if (selector.startsWith('ng-')) return 'Selector should not start with ng-';
	return false;
}


export interface ValidateSelectorResult {
  isValid: boolean;
  message: string;
}

export const validateSelector = (selector: string): any => {
  const errorMessage = hasError(selector);

	return {
		isValid: !errorMessage,
		message: errorMessage
	};
}