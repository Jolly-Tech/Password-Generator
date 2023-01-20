const outputText = document.getElementById('output-text')
const outputButton = document.getElementById('output-button')
let timeoutID = undefined
const copyText = document.getElementById('copy-text')


document.getElementById('generate-button').addEventListener('click', generatePassword)
outputText.addEventListener('click', copyPassword)

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
  outputText.innerHTML = generate(20)

  outputButton.dataset.generated = "true"

  resetCopyText()
}


function generate(length) {
  let pattern = /[a-zA-Z0-9_\-\+\.]/

  return Array.apply(null, { 'length': length })
    .map(function() {
      var result;
      while (true) {
        result = String.fromCharCode(getRandomByte());
        if (pattern.test(result)) {
          return result;
        }
      }
    }, this)
    .join('');
}

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
