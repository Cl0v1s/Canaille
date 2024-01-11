/**
 * Props for component needed accessibility features (buttons, forms, images etc...)
 */
export interface IAccessibilityProps {
  /**
   * The aria role associated with the element
   */
  role?: React.AriaRole;
  /**
   * The aria-hidden state indicates whether the element is exposed to an accessibility API.
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden
   */
  ariaHidden?: boolean;
  /**
   * The aria-label attribute defines a string value that labels an interactive element.
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   */
  ariaLabel?: string;
}
