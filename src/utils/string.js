const StringUtil = {}

/**
 * Check if type of a variable is string.
 * @param {string} targetString target string
 * @return {boolean} true - string; false - not string
 */
StringUtil.isString = function (targetString) {
  return typeof targetString === 'string'
}

/**
 * Check if type of a variable is string.
 * @param {string} targetString target string
 * @return {boolean} true - not string; false - string
 */
StringUtil.isNotString = function (targetString) {
  return typeof targetString !== 'string'
}

/**
 * Check if a string is empty.
 * @param {string} targetString target string
 * @return {boolean} true - empty; false - not empty
 */
StringUtil.isEmpty = function (targetString) {
  if (StringUtil.isNotString(targetString)) {
    return true
  }
  return targetString.trim().length === 0
}

/**
 * Check if a string is not empty.
 * @param {string} targetString target string
 * @return {boolean} true - not empty; false - empty
 */
StringUtil.isNotEmpty = function (targetString) {
  if (StringUtil.isString(targetString)) {
    return targetString.trim().length !== 0
  }
  return false
}

/**
 * Check if a string is blank.
 * e.g. if a string's value is ``, `  `, null or undefined, then the string is blank
 * @param targetString{string} target string
 * @return {boolean} true - blank, false - not blank
 */
StringUtil.isBlank = function (targetString) {
  const isEmpty = StringUtil.isEmpty(targetString)
  if (isEmpty) {
    return isEmpty
  }
  const regExp = /^\s*$/
  return regExp.test(targetString)
}

/**
 * Check if a string is not blank.
 * e.g. if a string's value is ``, `  `, null or undefined, then the string is blank
 * @param targetString{string} target string
 * @return {boolean} true - not blank, false - blank
 */
StringUtil.isNotBlank = function (targetString) {
  return !StringUtil.isBlank(targetString)
}

/**
 * Check if length of a string is less than threshold value.
 * @param {string} targetString target string
 * @param {number} threshold threshold value
 * @return {boolean} true - length of a string is less than threshold value
 */
StringUtil.isLengthLessThen = function (targetString, threshold) {
  if (StringUtil.isNotString(targetString)) {
    throw new Error('Type of argument targetString expected string, but got ' + typeof targetString)
  }
  if (typeof threshold !== 'number') {
    throw new Error('Type of argument minLength expected number, but got ' + typeof minLength)
  }
  return targetString.length < threshold
}

/**
 * Check if length of a string is not grater than threshold value.
 * @param {string} targetString target string
 * @param {number} threshold threshold value
 * @return {boolean} true - length of a string is not grater than threshold value
 */
StringUtil.isLengthNotGreaterThen = function (targetString, threshold) {
  if (StringUtil.isNotString(targetString)) {
    throw new Error('Type of argument targetString expected string, but got ' + typeof targetString)
  }
  if (typeof threshold !== 'number') {
    throw new Error('Type of argument minLength expected number, but got ' + typeof minLength)
  }
  return targetString.length <= threshold
}

/**
 * Check if length of a string is grater than threshold value.
 * @param {string} targetString target string
 * @param {number} threshold threshold value
 * @return {boolean} true - length of a string is less than threshold value
 */
StringUtil.isLengthGraterThen = function (targetString, threshold) {
  if (StringUtil.isNotString(targetString)) {
    throw new Error('Type of argument targetString expected string, but got ' + typeof targetString)
  }
  if (typeof threshold !== 'number') {
    throw new Error('Type of argument minLength expected number, but got ' + typeof minLength)
  }
  return targetString.length > threshold
}

/**
 * Check if length of a string is not less than threshold value.
 * @param {string} targetString target string
 * @param {number} threshold threshold value
 * @return {boolean} true - length of a string is not less than threshold value
 */
StringUtil.isLengthNotLessThen = function (targetString, threshold) {
  if (StringUtil.isNotString(targetString)) {
    throw new Error('Type of argument targetString expected string, but got ' + typeof targetString)
  }
  if (typeof threshold !== 'number') {
    throw new Error('Type of argument minLength expected number, but got ' + typeof minLength)
  }
  return targetString.length >= threshold
}

/**
 * Check if length of a string is between min length and max length.
 * @param {string} targetString target string
 * @param {number} minLength min length
 * @param {number} maxLength max length
 * @return {boolean} true - length of a string is between min length and max length
 */
StringUtil.isLengthBetween = function (targetString, minLength, maxLength) {
  if (StringUtil.isNotString(targetString)) {
    throw new Error('Type of argument targetString expected string, but got ' + typeof targetString)
  }
  if (typeof minLength !== 'number') {
    throw new Error('Type of argument minLength expected number, but got ' + typeof minLength)
  }
  if (typeof maxLength !== 'number') {
    throw new Error('Type of argument maxLength expected number, but got ' + typeof minLength)
  }
  return minLength <= targetString.length && targetString.length <= maxLength
}

/**
 * Check if a email string is valid
 * @param {string} email email string
 * @return {boolean} true - email string is valid
 */
StringUtil.isEmail = function (email) {
  // emailRegExp is from http://emailregex.com/
  const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegExp.test(email)
}

Object.freeze(StringUtil)
export default StringUtil
