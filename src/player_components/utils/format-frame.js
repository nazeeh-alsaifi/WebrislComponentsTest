/**
 * @Nazeeh-Saifi:file from videojs need to be editied for our project
 * @file format-frame.js
 * @module format-frame
 */

/**
 * Format frames
 *
 */
const defaultImplementation = function(seconds) {
  return "" + Math.floor(seconds);
};

// Internal pointer to the current implementation.
let implementation = defaultImplementation;
/**
 * Replaces the default formatFrame implementation with a custom implementation.
 *
 * @param {Function} customImplementation
 *        A function which will be used in place of the default formatFrame
 *        implementation. Will receive the current time in seconds and the
 *        guide (in seconds) as arguments.
 */
export function setFormatTime(customImplementation) {
  implementation = customImplementation;
}

/**
 * Resets formatFrame to the default implementation.
 */
export function resetFormatTime() {
  implementation = defaultImplementation;
}

/**
 * Delegates to either the default time formatting function or a custom
 * function supplied via `setFormatTime`.
 *
 * Formats seconds as a time string (H:MM:SS or M:SS). Supplying a
 * guide (in seconds) will force a number of leading zeros to cover the
 * length of the guide.
 *
 * @static
 * @example  formatFrame(125, 600) === "02:05"
 * @param    {number} seconds
 *           Number of seconds to be turned into a string
 *
 * @param    {number} guide
 *           Number (in seconds) to model the string after
 *
 * @return   {string}
 *           Time formatted as H:MM:SS or M:SS
 */
function formatFrame(seconds) {
  return implementation(seconds);
}

export default formatFrame;
