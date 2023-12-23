/* eslint-disable react/jsx-props-no-spreading */
/**
 * TextInput
 *
 * A small text input. Used to allow users to type short texts.
 * For long ones, prefer Textarea component
 *
 * Styleguide Inputs.TextInput
 */

import React from 'react';

import { ICommonProps } from './../types/ICommonProps';
import { IFormProps } from './../types/IFormProps';
import { createUseStyles } from './../createUseStyles';

import { Error} from './../Error/common';
import { Icon, IIcon } from '../Icon/common';
import { useValidation } from './../helpers/form/form';

export const TEXTINPUTICON_DISPLAYNAME = 'TextInputIcon';
export const TEXTINPUTERASE_DISPLAYNAME = 'TextInputErase';
export const TEXTINPUTSELECT_DISPLAYNAME = 'TextInputSelect';

const useStyle = createUseStyles({
  icon: {
    display: 'flex',
    background: 'none',
    padding: 0,
    border: 0,
    cursor: 'pointer',
    color: 'var(--grey-100)',

    '&>div[aria-label="erase"]': {
      transition: 'background 0.110s ease-in-out',
      borderRadius: 'var(--rounded-25)',
    },
    // Hover effect only on the erase icon
    '&>div[aria-label="erase"]:hover': {
      background: 'rgba(34, 45, 57, 0.10)',
    },
    // Active effect only on the erase icon
    '&>div[aria-label="erase"]:active': {
      background: 'rgba(34, 45, 57, 0.20)',
    },
  },
  textInput: {
    border: 'none',
    padding: 0,
    minInlineSize: 0,
    fontFamily: 'var(--font-family-primary)',

    '& [role=combobox] > [role=alert]': {
      display: 'none',
    },

    '&>label': {
      position: 'relative',
      display: 'flex',
      gap: 'var(--spacing-2)',
      '&>input': {
        minWidth: 0,
        border: 'none',
        fontFamily: 'var(--font-family-primary)',
        fontSize: 'inherit',
        outline: 'none',

        '&::placeholder': {
          transition: 'color 0.2s ease 0.2s',
        },
      },

      '&>[aria-roledescription="label"]': {
        position: 'absolute',
        transition: 'transform 110ms ease-out, background 0ms ease-out 110ms',
      },
    },
  },
});

interface ITextInputContext {
  onErase: React.MouseEventHandler;
  disabled: boolean;
  setError: (e: string | undefined) => void;
}

export const TextInputContext = React.createContext<ITextInputContext>({
  disabled: false,
  setError: () => null,
  onErase: () => null,
});

const TEXTINPUTBEFORE_DISPLAYNAME = 'TextInputBefore';

interface ITextInputBefore {
  children: React.ReactNode;
}

const TextInputBefore = ({ children }: ITextInputBefore) => <>{children}</>;

TextInputBefore.displayName = TEXTINPUTBEFORE_DISPLAYNAME;

interface ITextInputIcon extends IIcon {
  onClick?: React.MouseEventHandler;
}

const TextInputIcon = React.forwardRef(
  ({ className = '', color, size = '16px', onClick, icon: svgIcon, ...rest }: ITextInputIcon, ref) => {
    const { icon } = useStyle();

    const content = React.useMemo(
      () => <Icon {...rest} icon={svgIcon} color={color || true} size={size} />,
      [svgIcon, color, size]
    );

    return onClick ? (
      <button
        className={`${icon} ${className}`}
        type="button"
        onClick={onClick}
        ref={ref as React.Ref<HTMLButtonElement>}
      >
        {content}
      </button>
    ) : (
      <div className={`${icon} ${className}`} ref={ref as React.Ref<HTMLDivElement>}>
        {content}
      </div>
    );
  }
);

TextInputIcon.displayName = 'TextInputIcon';

export interface ITextInputBase extends ICommonProps, IFormProps {
  /**
   * Input type
   */
  htmlType?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
  /**
   * Placeholder content to show in the TextInput
   */
  placeholder?: string;
  /**
   * Label associated with the TextInput
   */
  label?: React.ReactNode;
  /**
   * Get focus on page load. Only on field per page.
   */
  autofocus?: boolean;
  /**
   * Maximum string length
   */
  maxLength?: number;
  /**
   * Minimum string length
   */
  minLength?: number;
  /**
   * Read only mode
   */
  readonly?: boolean;
  /**
   * Should activate spellcheck
   */
  spellcheck?: boolean;
  /**
   * The values of the list attribute is the id of a <datalist> element located in the same document. The <datalist> provides a list of predefined values to suggest to the user for this input. Any values in the list that are not compatible with the type are not included in the suggested options. The values provided are suggestions, not requirements: users can select from this predefined list or provide a different value.
   */
  list?: string;
  /**
   * Max value if type number
   */
  max?: number;
  /**
   * Min value if type number
   */
  min?: number;
  /**
   * Step increase if type number
   */
  step?: number;
  /**
   * Regexp that value must match
   */
  pattern?: string;
  /**
   * Optional additional elements
   */
  children?:
    | Array<React.ReactElement<unknown, typeof TextInputIcon>>
    | React.ReactElement<unknown, typeof TextInputIcon>;
  /**
   * All other props can be passed to the input
   */
  [x: string]: any;
}

const TextInputBase = React.forwardRef(
  (
    {
      autofocus,
      checkValidity,
      className,
      defaultValue,
      disabled,
      id,
      label,
      maxLength,
      minLength,
      name,
      onChange,
      onInvalid,
      placeholder,
      readonly,
      required,
      spellcheck,
      style,
      testId,
      validateOnChange,
      value,
      htmlType: type = 'text',
      list,
      max,
      min,
      pattern,
      step,
      children,
      ...rest
    }: ITextInputBase,
    ref
  ) => {
    const { textInput } = useStyle();
    const input = React.useRef<HTMLInputElement>(null);
    const uid = React.useId();
    const internalId = id || uid;

    const {
      error,
      setError,
      onInput,
      onInvalid: onInternalInvalid,
    } = useValidation({
      root: input,
      validateOnChange: validateOnChange || false,
      checkValidity,
      onInvalid,
    });

    const { before, icons, erase, select, others } = React.useMemo(() => {
      const wIcons: Array<React.ReactNode> = [];
      const wErase: Array<React.ReactNode> = [];
      const wSelect: Array<React.ReactNode> = [];
      const wOthers: Array<React.ReactNode> = [];
      const wBefore: Array<React.ReactNode> = [];

      React.Children.toArray(children).forEach((c) => {
        const child = c as React.ReactElement<unknown, typeof TextInputIcon>;
        if (child.type?.displayName === TEXTINPUTICON_DISPLAYNAME) wIcons.push(child);
        else if (child.type?.displayName === TEXTINPUTERASE_DISPLAYNAME) wErase.push(child);
        else if (child.type?.displayName === TEXTINPUTSELECT_DISPLAYNAME) wSelect.push(child);
        else if (child.type?.displayName === TEXTINPUTBEFORE_DISPLAYNAME) wBefore.push(child);
        else wOthers.push(child);
      });

      return {
        icons: wIcons,
        erase: wErase,
        select: wSelect,
        others: wOthers,
        before: wBefore,
      };
    }, [children]);

    const onErase = React.useCallback(() => {
      input.current.value = '';
      const event = new Event('change', { bubbles: true });
      Object.defineProperty(event, 'target', { writable: false, value: input.current });
      input.current.dispatchEvent(event);
      if (onChange) onChange(event as unknown as React.ChangeEvent);
    }, [onChange]);

    return (
      <TextInputContext.Provider value={{ disabled: disabled || false, setError, onErase }}>
        <fieldset
          aria-invalid={!!error}
          ref={ref as React.Ref<HTMLFieldSetElement>}
          className={`${textInput} ${className}`}
          style={style}
          data-testid={testId}
        >
          <label htmlFor={internalId}>
            {before}
            <input
              {...rest}
              ref={input as never}
              type={type}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={autofocus}
              disabled={disabled}
              id={internalId}
              maxLength={maxLength}
              minLength={minLength}
              name={name}
              onChange={onChange}
              // we set " " to allow the css :placeholder-shown to work even when no placeholder
              placeholder={placeholder || ' '}
              readOnly={readonly}
              required={required}
              spellCheck={spellcheck}
              value={value}
              list={list}
              max={max}
              min={min}
              pattern={pattern}
              step={step}
              defaultValue={defaultValue}
              onInvalid={onInternalInvalid}
              onInput={onInput}
            />
            {label && <span aria-roledescription="label">{label}</span>}
            {erase}
            {icons}
            {select}
            {others}
          </label>
          {error && <Error>{error}</Error>}
        </fieldset>
      </TextInputContext.Provider>
    );
  }
);

TextInputBase.displayName = 'TextInputBase';

export { TextInputBase, TextInputIcon, TextInputBefore };
