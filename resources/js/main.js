const characters = 'AaBbCcDdEeFfGg1234567890ß!"§$%&/()=?,.-'
const outputText = document.getElementById('output-text')


document.getElementById('generate-button').addEventListener('click', generatePassword)


function generatePassword() {
  outputText.innerHTML = generate(20)
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
