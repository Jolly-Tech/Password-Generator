const outputText = document.getElementById('output-text')
const outputButton = document.getElementById('output-button')
const copyText = document.getElementById('copy-text')
const pwLengthRange = document.getElementById('pw-length')
const pwLengthIndicator = document.getElementById('pw-length__range-indicator')
const generateButton = document.getElementById('generate-button')
let timeoutID = undefined


pwLengthRange.addEventListener('input', changeRangeIndicator)
generateButton.addEventListener('click', generatePassword)
outputText.addEventListener('click', copyPassword)

init()

function init() {
  changeRangeIndicator()
}

function changeRangeIndicator() {
  pwLengthIndicator.innerHTML = pwLengthRange.value
}

function copyPassword() {
  if (outputButton.dataset.generated === "false") {
    return false
  }

  resetCopyText()

  navigator.clipboard.writeText(outputText.innerHTML)

  setCopyText()
}

function setCopyText() {
  copyText.innerHTML = "COPIED!"

  timeoutID = setTimeout(() => {
    copyText.innerHTML = "Copy..."

  }, 2000)
}

function resetCopyText() {
  if (typeof timeoutID === 'number') {
    clearTimeout(timeoutID)
    copyText.innerHTML = "Copy..."
  }
}

function generatePassword() {
  let length = Number(pwLengthRange.value)

  outputText.innerHTML = generate(length)

  outputButton.dataset.generated = "true"

  resetCopyText()
}

function generate(length) {
  let numerical = document.getElementById('pw-character__numerical').checked
  let special = document.getElementById('pw-character__special').checked

  var result = "";
  var pattern = new RegExp("[a-zA-Z" + (numerical ? "0-9" : "") + (special ? "_\.\,\!\?\+\-\=" : "") + "]");
  for (var i = 0; i < length; i++) {
    var char = String.fromCharCode(getRandomByte());
    while (!pattern.test(char)) {
      char = String.fromCharCode(getRandomByte());
    }
    result += char;
  }
  return result;
}




// random byte
function getRandomByte() {
  // http://caniuse.com/#feat=getrandomvalues
  if (window.crypto && window.crypto.getRandomValues) {
    var result = new Uint8Array(1);
    window.crypto.getRandomValues(result);
    return result[0];
  }
  else if (window.msCrypto && window.msCrypto.getRandomValues) {
    var result = new Uint8Array(1);
    window.msCrypto.getRandomValues(result);
    return result[0];
  }
  else {
    return Math.floor(Math.random() * 256);
  }
}
