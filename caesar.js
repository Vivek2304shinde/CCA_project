// Get the element from DOM
const form = document.getElementById("controls");
const hInput = document.querySelector("#heading-input");
const hOutput = document.querySelector("#heading-output");
const selectEncodeOrDecode = document.getElementsByName("code");
const inputText = document.getElementById("input-text");
const outputText = document.getElementById("output-text");
const shiftKey = document.getElementById("shift-input");
const modulo = document.getElementById("mod-input");
const alphabet = document.getElementById("alphabet-input");
const letterCase = document.getElementById("letter-case");
const foreignChars = document.getElementById("foreign-chars");

// Change the heading title and clear the content depending on whether to encode or decode
selectEncodeOrDecode.forEach((option) => {
    option.addEventListener("click", () => {
        if (option.value === "encode") {
            hInput.textContent = "Plaintext";
            hOutput.textContent = "Ciphertext";
            inputText.value = "";
            outputText.textContent = "";
        } else if (option.value === "decode") {
            hInput.textContent = "Ciphertext";
            hOutput.textContent = "Plaintext";
            inputText.value = "";
            outputText.textContent = "";  
        }
    });
});


form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    // Get the value of from the DOM
    let inputTextValue = inputText.value;
    let selectedOption = Array.from(selectEncodeOrDecode).find((option) => option.checked);
    let shiftValue = parseInt(shiftKey.value);
    let moduloValue = parseInt(modulo.value);
    let alphabetValue = alphabet.value;
    let letterCaseValue = letterCase.value;
    let foreignCharsValue = foreignChars.value;


    /**
   
   * @param {boolean} [decode="decode"]
   * @param {string} text 
   * @param {number} shift
   * @param {number} mod 
   * @param {string} [charset="abcdefghijklmnopqrstuvwxyz0123456789"] - 
   * @param {string} [foreignChars=1] 
   * @returns {string} 
   */
    function caesarCipher(decode, text, shift, mod, charset, foreignChars) {
        
        if (decode == "decode") {
            shift = -shift;
        }
        
        if (foreignChars == 1) {
            text = removeForeignChars(text);
        }
        charset = charset.toLowerCase();
        
        let result = "";
        for (let i = 0; i < text.length; i++) {
            let char = text.charAt(i);
            
            const index = charset.indexOf(char.toLowerCase());
            
            if (index !== -1) {
                let newIndex = (index + shift) % mod;
                
                if (newIndex < 0) {
                    newIndex += mod;
                }
                
                char = char === char.toLowerCase() ? charset[newIndex] : charset[newIndex].toUpperCase();
            }
          
            result += char;
        }
        return result;
    }



    /**

     * @param {string} input 
     * @returns {string} 
     */
    function removeForeignChars(input) {
        
        const regex = /[^a-zA-Z0-9 ]/g;
        
        return input.replace(regex, "");
    }




    // Store the caesarCipher function text output


    let cipherOutput = caesarCipher(selectedOption.value, inputTextValue, shiftValue, moduloValue, alphabetValue, foreignCharsValue);

    if (letterCaseValue == 2) {
        cipherOutput = cipherOutput.toLowerCase();
    }
    else if (letterCaseValue == 3) {
        cipherOutput = cipherOutput.toUpperCase();
    }
    
    outputText.textContent = cipherOutput;
});
