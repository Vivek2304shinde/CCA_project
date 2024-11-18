
function generateKey(str, key) {
    key = key.split("");
    if (str.length == key.length) return key.join("");
    else {
        let temp = key.length;
        for (let i = 0; i < (str.length - temp); i++) {
            key.push(key[i % key.length]);
        }
    }
    return key.join("");
}


function cipherText(str, key) {
    let cipher_text = "";
    for (let i = 0; i < str.length; i++) {
       
        let x = (str[i].charCodeAt(0) + key[i].charCodeAt(0)) % 26;
        x += 'A'.charCodeAt(0);
        cipher_text += String.fromCharCode(x);
    }
    return cipher_text;
}



// Function to decrypt 
function originalText(cipher_text, key) {
    let orig_text = "";
    for (let i = 0; i < cipher_text.length; i++) {
        let x = (cipher_text[i].charCodeAt(0) - key[i].charCodeAt(0) + 26) % 26;

        x += 'A'.charCodeAt(0);
        orig_text += String.fromCharCode(x);
    }
    return orig_text;
}

// Function to convert lowercase characters to uppercase
function LowerToUpper(s) {
    let str = s.split("");
    for (let i = 0; i < s.length; i++) {
        if (s[i] == s[i].toLowerCase()) {
            str[i] = s[i].toUpperCase();
        }
    }
    return str.join("");
}

// Event listeners for form submission
document.getElementById("encrypt-btn").addEventListener("click", function () {
    let str = document.getElementById("input-text").value;
    let keyword = document.getElementById("shift-input").value;

    // Convert both the message and keyword to uppercase
    str = LowerToUpper(str);
    keyword = LowerToUpper(keyword);

    // Generate the key and encrypt the message
    let key = generateKey(str, keyword);
    let cipher_text = cipherText(str, key);
    console.log(cipherText);
    // Display the encrypted message
    document.getElementById("output-text").textContent = "Ciphertext: " + cipher_text;
});

document.getElementById("decrypt-btn").addEventListener("click", function () {
    let str = document.getElementById("input-text").value;
    let keyword = document.getElementById("shift-input").value;

    // Convert both the message and keyword to uppercase
    str = LowerToUpper(str);
    keyword = LowerToUpper(keyword);

    // Generate the key and decrypt the message
    let key = generateKey(str, keyword);
    let original_text = originalText(str, key);

    // Display the decrypted message
    document.getElementById("output-text").textContent = "Original Text: " + original_text;
});
