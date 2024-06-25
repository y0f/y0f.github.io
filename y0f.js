(function y0f(f0Y) {
    let baseSpeed = 123;
  
    function y0fY0F(fY0) {
      return Math.floor(Math.random() * fY0);
    }
  
    function y0fy(fy0F) {
      fy0F.setAttribute("y0f-original-color", fy0F.style.color);
      fy0F.style.setProperty("color", "#00FF00", "important");
    }
  
    function y0fF0(f0Y) {
      const y0Fy = f0Y.getAttribute("y0f-original-color");
      f0Y.style.setProperty("color", y0Fy, "important");
    }
  
    function y0fyf0(hex) {
      hex = hex.replace("#", "");
      const y0fR = parseInt(hex.substr(0, 2), 16);
      const y0fG = parseInt(hex.substr(2, 2), 16);
      const y0fB = parseInt(hex.substr(4, 2), 16);
      return 0.299 * y0fR + 0.587 * y0fG + 0.114 * y0fB;
    }
  
    function y0fYf(hex, y0fT) {
      return y0fyf0(hex) < y0fyf0(y0fT);
    }
  
    function y0fFy(rgb) {
      const y0fMatch = rgb.match(/\d+/g).map(function (x) {
        return parseInt(x).toString(16).padStart(2, "0");
      });
      return `#${y0fMatch.join("")}`;
    }
  
    function y0fy0f() {
      const y0fAll = document.querySelectorAll("#asciiArt span");
      if (y0fAll.length === 0) {
        return;
      }
  
      function y0fY0() {
        const y0fList = [];
        while (y0fList.length < y0fAll.length / baseSpeed) {
          const y0fIdx = y0fY0F(y0fAll.length);
          const y0fCol = window.getComputedStyle(y0fAll[y0fIdx]).color;
          const y0fHex = y0fFy(y0fCol);
          if (!y0fList.includes(y0fAll[y0fIdx]) && y0fYf(y0fHex, "#666666")) {
            y0fList.push(y0fAll[y0fIdx]);
          }
        }
        y0fList.forEach((y0fElem) => y0fy(y0fElem));
        setTimeout(() => {
          y0fList.forEach((y0fElem) => y0fF0(y0fElem));
          y0fY0();
        }, baseSpeed);
      }
      y0fY0();
    }
  
    document.addEventListener("DOMContentLoaded", y0fy0f);
  
    document.getElementById("speedSlider").addEventListener("input", function (event) {
      const yy00ff = parseInt(event.target.value);
      baseSpeed = 10 + (240 * (100 - yy00ff) / 100); 
    });
  })("y0f");
  