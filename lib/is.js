// ==========================================================================
// Type checking utils
// ==========================================================================

const getConstructor = (input) =>
  input !== null && typeof input !== "undefined" ? input.constructor : null;
const instanceOf = (input, constructor) =>
  Boolean(input && constructor && input instanceof constructor);
const isNullOrUndefined = (input) =>
  input === null || typeof input === "undefined";
const isObject = (input) => getConstructor(input) === Object;
const isNumber = (input) =>
  getConstructor(input) === Number && !Number.isNaN(input);
const isString = (input) => getConstructor(input) === String;
const isBoolean = (input) => getConstructor(input) === Boolean;
const isFunction = (input) => getConstructor(input) === Function;
const isArray = (input) => Array.isArray(input);
const isWeakMap = (input) => instanceOf(input, WeakMap);
const isElement = (input) => instanceOf(input, Element);
const isTextNode = (input) => getConstructor(input) === Text;
const isEvent = (input) => instanceOf(input, Event);
const isKeyboardEvent = (input) => instanceOf(input, KeyboardEvent);
const isPromise = (input) =>
  instanceOf(input, Promise) && isFunction(input.then);

const isJson = (str) => {
  if (typeof str !== "string") return { value: str, valid: false };
  try {
    const result = JSON.parse(str);
    const type = Object.prototype.toString.call(result);
    if (type === "[object Object]" || type === "[object Array]") {
      return { value: result, valid: true };
    } else {
      return { value: str, valid: false };
    }
  } catch (err) {
    return { value: str, valid: false };
  }
};
const isEmpty = (input) =>
  isNullOrUndefined(input) ||
  ((isString(input) || isArray(input)) && !input.length) ||
  (isObject(input) && !Object.keys(input).length);

const isUrl = (input) => {
  // Accept a URL object
  if (instanceOf(input, window.URL)) {
    return true;
  }

  // Must be string from here
  if (!isString(input)) {
    return false;
  }

  // Add the protocol if required
  let string = input;
  if (!input.startsWith("http://") || !input.startsWith("https://")) {
    string = `http://${input}`;
  }

  try {
    return !isEmpty(new URL(string).hostname);
  } catch (e) {
    return false;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  json: isJson,

  nullOrUndefined: isNullOrUndefined,
  object: isObject,
  number: isNumber,
  string: isString,
  boolean: isBoolean,
  function: isFunction,
  array: isArray,
  weakMap: isWeakMap,

  element: isElement,
  textNode: isTextNode,
  event: isEvent,
  keyboardEvent: isKeyboardEvent,
  promise: isPromise,
  url: isUrl,
  empty: isEmpty
};
