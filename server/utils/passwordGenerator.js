const { generatePassword } = require('majo-generator-password') 
 
const maxLength = 16
const minLength = 8
const uppercaseMinCount = 1
const lowercaseMinCount = 1
const numberMinCount = 1
const specialMinCount = 1
const UPPERCASE_RE = /([A-Z])/g
const LOWERCASE_RE = /([a-z])/g
const NUMBER_RE = /([\d])/g
const SPECIAL_CHAR_RE = /([\?\-])/g
const NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g
 
function isStrongEnough(password) {
  const uc = password.match(UPPERCASE_RE);
  const lc = password.match(LOWERCASE_RE);
  const n = password.match(NUMBER_RE);
  const sc = password.match(SPECIAL_CHAR_RE);
  const nr = password.match(NON_REPEATING_CHAR_RE);
  return password.length >= minLength &&
    !nr &&
    uc && uc.length >= uppercaseMinCount &&
    lc && lc.length >= lowercaseMinCount &&
    n && n.length >= numberMinCount &&
    sc && sc.length >= specialMinCount;
}
 
function genPassword() {
  // в теории возможен кейс, когда будет невалиден
  let pwd = ""
  while(!isStrongEnough(pwd)) {
    pwd = generatePassword(14)
  }
  return pwd
}

module.exports = genPassword