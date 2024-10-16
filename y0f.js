(function () {
    let baseSpeed = 123;
    const initialBgOpacity = 0.8;
    const darkThresholdLuminance = getLuminance("#666666");

    const getRandomInt = max => Math.floor(Math.random() * max);

    const highlightElement = element => {
        element.setAttribute("original-color", element.style.color);
        element.style.setProperty("color", "#00FF00", "important");
    };

    const restoreElementColor = element => {
        const originalColor = element.getAttribute("original-color");
        element.style.setProperty("color", originalColor, "important");
    };

    function getLuminance(hex) {
        hex = hex.replace("#", "");
        const [r, g, b] = [0, 2, 4].map(offset => parseInt(hex.substr(offset, 2), 16));
        return 0.299 * r + 0.587 * g + 0.114 * b;
    }

    const isDarker = (hex) => getLuminance(hex) < darkThresholdLuminance;

    const rgbToHex = rgb => {
        const matches = rgb.match(/\d+/g).map(num => parseInt(num).toString(16).padStart(2, "0"));
        return `#${matches.join("")}`;
    };

    const processElements = (elements) => {
        const totalElements = elements.length;
        const elementsToHighlight = [];
        const selectionLimit = Math.floor(totalElements / baseSpeed);

        while (elementsToHighlight.length < selectionLimit) {
            const randomIndex = getRandomInt(totalElements);
            const randomElement = elements[randomIndex];
            const color = window.getComputedStyle(randomElement).color;
            const hexColor = rgbToHex(color);

            if (!elementsToHighlight.includes(randomElement) && isDarker(hexColor)) {
                elementsToHighlight.push(randomElement);
            }
        }

        elementsToHighlight.forEach(highlightElement);

        setTimeout(() => {
            elementsToHighlight.forEach(restoreElementColor);
            processElements(elements);
        }, baseSpeed);
    };

    const processAsciiArt = () => {
        const elements = document.querySelectorAll("#asciiArt span");
        if (elements.length > 0) {
            processElements(elements);
        }
    };

    document.addEventListener("DOMContentLoaded", processAsciiArt);

    const debounce = (func, delay) => {
        let debounceTimer;
        return (...args) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const handleSliderInput = event => {
        const sliderValue = parseInt(event.target.value);
        baseSpeed = 10 + (240 * (100 - sliderValue) / 100);

        const newOpacity = sliderValue <= 50
            ? (initialBgOpacity + (0.2 * ((50 - sliderValue) / 50)))
            : (initialBgOpacity - (initialBgOpacity * ((sliderValue - 50) / 50)));

        document.body.style.setProperty('--bg-opacity', newOpacity);
    };

    document.getElementById("speedSlider").addEventListener("input", debounce(handleSliderInput, 100));

})();

