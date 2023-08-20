let morseCodeMap;

// Fetch the Morse code map from morse.json
fetch('morse.json')
    .then(response => response.json())
    .then(data => {
        morseCodeMap = data;
        initTranslation();
    })
    .catch(error => console.error('Error fetching morse.json:', error));

function initTranslation() {
    const translateButton = document.getElementById("translateButton");
    const inputText = document.getElementById("inputText");
    const morseOutput = document.getElementById("morseOutput");
    const englishOutput = document.getElementById("englishOutput");

    translateButton.addEventListener("click", translateText);
    inputText.addEventListener("input", translateLive);

    function translateText() {
        const text = inputText.value.toUpperCase();
        let morseTranslation = "";
        let englishTranslation = "";

        for (let char of text) {
            if (char in morseCodeMap) {
                morseTranslation += morseCodeMap[char] + " ";
                englishTranslation += char + " ";
            } else if (char === " ") {
                morseTranslation += "/ ";
                englishTranslation += "/ ";
            }
        }

        morseOutput.textContent = morseTranslation;
        englishOutput.textContent = englishTranslation;
    }

function translateLive() {
    const input = inputText.value.trim();
    let morseTranslation = "";
    let englishTranslation = "";

    if (input !== "") {
        if (input.match(/^[.\-/\/\s]+$/)) {
            const morseWords = input.split(" / ");
            for (let morseWord of morseWords) {
                const morseChars = morseWord.split(" ");
                for (let morseChar of morseChars) {
                    for (let key in morseCodeMap) {
                        if (morseCodeMap[key] === morseChar) {
                            englishTranslation += key;
                            break;
                        }
                    }
                }
                englishTranslation += " ";
            }
        } else {
            const englishChars = input.split(" ");
            for (let char of englishChars) {
                if (char in morseCodeMap) {
                    morseTranslation += morseCodeMap[char] + " ";
                } else if (char === "/") {
                    morseTranslation += "/ ";
                }
            }
        }
    }

    morseOutput.textContent = morseTranslation;
    englishOutput.textContent = englishTranslation;
}
