const characters = 'AaBbCcDdEeFfGg1234567890ß!"§$%&/()=?,.-'
const outputText = document.getElementById('output-text')


document.getElementById('generate-button').addEventListener('click', generatePassword)


function  generatePassword() {
 console.log('generate') 

  let length = 20

  let password = ''

  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  outputText.innerHTML = password  
}
