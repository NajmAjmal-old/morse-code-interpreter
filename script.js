const translateButton = document.getElementById("translateButton");
const inputText = document.getElementById("inputText");
const morseOutput = document.getElementById("morseOutput");
const englishOutput = document.getElementById("englishOutput");

// Load Morse code map from JSON file
fetch('morse.json')
    .then(response => response.json())
    .then(morseCodeMap => {
        translateButton.addEventListener("click", translateText);

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
    });
