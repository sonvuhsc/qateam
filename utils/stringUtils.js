/**
 * Utility functions for string operations
 */

/**
 * Normalizes a string to NFC (Canonical Decomposition, followed by Canonical Composition)
 * This ensures consistent Unicode representation
 * @param {string} text - The text to normalize
 * @returns {string} - The normalized text
 */
function normalize(text) {
  return text.normalize('NFC');
}

module.exports = {
  normalize
};