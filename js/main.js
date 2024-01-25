const secret = "test-secret";
const encodeBtn = document.querySelector(".button.encode");
const decodeBtn = document.querySelector(".button.decode");

const textContainer = document.querySelector(".text-container");

function addBounceAnimation(element, time){
    element.style.animation = `bounce ${time}`
}


function encodeAndDecode(encode){
    const input = document.getElementById("text-area");
    const helpText = document.querySelector(".help-text");
    const p = document.createElement("p");
    if(!input.value){
        input.style.border = "1px solid var(--color-4)";
        input.value = "";
        return null;
    } else {
        input.style.border = "none";
    }
    p.classList.add("text");
    if(encode){
        p.innerText = encryptText(input.value, secret);
        p.classList.add("encoded");
    } else {
        p.innerText = decryptText(input.value, secret);
        if(!p.innerText) return null;
    }
    p.addEventListener("click", event => {
        input.value = event.currentTarget.innerText;
        input.scrollIntoView();
    });
    addBounceAnimation(p, ".8s");
    if(helpText.style.display === "none"){
        addBounceAnimation(helpText, "1.5s");
    }
    input.value = "";
    helpText.style.display = "block";
    textContainer.appendChild(p);
    p.scrollIntoView();
}

encodeBtn.addEventListener("click", event => {
    encodeAndDecode(true);
});

decodeBtn.addEventListener("click", event => {
    encodeAndDecode(false);
});
function encryptText(text, passphrase) {
    return CryptoJS.AES.encrypt(text, passphrase).toString();
}

function decryptText(ciphertext, passphrase) {
    var bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    return bytes.toString(CryptoJS.enc.Utf8);
}