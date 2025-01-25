var Version = '1.0.7'

var autoAnswer = false;
var showAnswers = false;
var pairs = []
var spans = []
var gameCode = undefined
var lastCode = undefined
var lastAnswer = ""

function FindByAttributeValue(attribute, value, element_type) {
    element_type = element_type || "*";
    var All = document.getElementsByTagName(element_type);
    for (var i = 0; i < All.length; i++) {
        if (All[i].getAttribute(attribute) == value) {
            return All[i];
        }
    }
}

const uiElement = document.createElement('div');
uiElement.className = 'floating-ui';
uiElement.style.position = 'absolute';
uiElement.style.top = '5%';
uiElement.style.left = '5%';
uiElement.style.width = '20vw';
uiElement.style.height = 'auto';
uiElement.style.fontFamily = 'monospace';
uiElement.style.backgroundColor = '#000';
uiElement.style.borderRadius = '1vw';
uiElement.style.boxShadow = '0px 0px 10px 0px rgba(0, 0, 0, 0.5)';
uiElement.style.zIndex = '9999';

const handle = document.createElement('div');
handle.className = 'handle';
handle.style.fontSize = '1.5vw';
handle.textContent = '// Quizlet';
handle.style.color = 'white';
handle.style.width = '97.5%';
handle.style.height = '2.5vw';
handle.style.backgroundColor = '#000';
handle.style.borderRadius = '1vw 1vw 0 0';
handle.style.cursor = 'grab';
handle.style.fontWeight = '700';
handle.style.textAlign = 'left';
handle.style.paddingLeft = '2.5%';
handle.style.marginLeft = '2.5%';
handle.style.marginTop = '2.5%';
handle.style.lineHeight = '2vw';
uiElement.appendChild(handle);

const closeButton = document.createElement('div');
closeButton.className = 'close-button';
closeButton.textContent = '✕';
closeButton.style.position = 'absolute';
closeButton.style.top = '0';
closeButton.style.right = '0';
closeButton.style.width = '12.5%';
closeButton.style.height = '2.5vw';
closeButton.style.color = '#ff386a';
closeButton.style.borderRadius = '0 1vw 0 0';
closeButton.style.display = 'flex';
closeButton.style.justifyContent = 'center';
closeButton.style.alignItems = 'center';
closeButton.style.cursor = 'pointer';
closeButton.style.fontWeight = '500';
handle.appendChild(closeButton);

const minimizeButton = document.createElement('div');
minimizeButton.className = 'minimize-button';
minimizeButton.textContent = '─';
minimizeButton.style.color = '#3b3b3b';
minimizeButton.style.position = 'absolute';
minimizeButton.style.top = '0';
minimizeButton.style.right = '12.5%';
minimizeButton.style.width = '12.5%';
minimizeButton.style.height = '2.5vw';
minimizeButton.style.fontWeight = '500';
minimizeButton.style.borderRadius = '0 0 0 0';
minimizeButton.style.display = 'flex';
minimizeButton.style.justifyContent = 'center';
minimizeButton.style.alignItems = 'center';
minimizeButton.style.cursor = 'pointer';
handle.appendChild(minimizeButton);

const autoAnswerSwitchContainer = document.createElement('div');
autoAnswerSwitchContainer.className = 'switch-container';
autoAnswerSwitchContainer.style.display = 'flex';
autoAnswerSwitchContainer.style.alignItems = 'center';
autoAnswerSwitchContainer.style.justifyContent = 'center';
uiElement.appendChild(autoAnswerSwitchContainer);

const autoAnswerLabel = document.createElement('span');
autoAnswerLabel.textContent = 'Auto';
autoAnswerLabel.className = 'switch-label';
autoAnswerLabel.style.fontSize = '1.5vw';
autoAnswerLabel.style.color = 'white';
autoAnswerLabel.style.marginTop = '2.5vw';
autoAnswerLabel.style.marginBottom = '2.5vw';
autoAnswerLabel.style.marginRight = '2.5vw';
autoAnswerSwitchContainer.appendChild(autoAnswerLabel);

const autoAnswerSwitch = document.createElement('label');
autoAnswerSwitch.className = 'switch';
autoAnswerSwitchContainer.appendChild(autoAnswerSwitch);

const autoAnswerInput = document.createElement('input');
autoAnswerInput.type = 'checkbox';
autoAnswerInput.addEventListener('change', function() {
    autoAnswer = this.checked;
});
autoAnswerSwitch.appendChild(autoAnswerInput);

const autoAnswerSlider = document.createElement('span');
autoAnswerSlider.className = 'slider';
autoAnswerSwitch.appendChild(autoAnswerSlider);

const showAnswersSwitchContainer = document.createElement('div');
showAnswersSwitchContainer.className = 'switch-container';
showAnswersSwitchContainer.style.display = 'flex';
showAnswersSwitchContainer.style.alignItems = 'center';
showAnswersSwitchContainer.style.justifyContent = 'center';
uiElement.appendChild(showAnswersSwitchContainer);

const showAnswersLabel = document.createElement('span');
showAnswersLabel.textContent = 'Show';
showAnswersLabel.className = 'switch-label';
showAnswersLabel.style.fontSize = '1.5vw';
showAnswersLabel.style.color = 'white';
showAnswersLabel.style.marginTop = '2.5vw';
showAnswersLabel.style.marginBottom = '2.5vw';
showAnswersLabel.style.marginRight = '2.5vw';
showAnswersSwitchContainer.appendChild(showAnswersLabel);

const showAnswersSwitch = document.createElement('label');
showAnswersSwitch.className = 'switch';
showAnswersSwitchContainer.appendChild(showAnswersSwitch);

const showAnswersInput = document.createElement('input');
showAnswersInput.type = 'checkbox';
showAnswersInput.addEventListener('change', function() {
    showAnswers = this.checked;
});
showAnswersSwitch.appendChild(showAnswersInput);

const showAnswersSlider = document.createElement('span');
showAnswersSlider.className = 'slider';
showAnswersSwitch.appendChild(showAnswersSlider);

const style = document.createElement('style');
style.textContent = `
.custom-slider {
    background: white
    border: none;
    outline: none;
    cursor: ew-resize;
    appearance: none; 
    height: 0; 
}

.custom-slider::-webkit-slider-thumb {
    appearance: none; 
    width: 1.75vw; 
    height: 1.75vw; 
    background-color: rgb(47, 47, 47); 
    border-radius: 50%; 
    cursor: ew-resize; 
    margin-top: -0.5vw; 
}

.custom-slider::-webkit-slider-runnable-track {
    width: 100%; 
    height: 0.75vw; 
    background-color: white; 
    cursor: ew-resize; 
    border-radius: 1vw; 
    background: linear-gradient(to right, red, yellow, limegreen); 
}

:root {
  --switch-width: 5.9vw;
  --switch-height: 3.3vw;
  --slider-size: 2.5vw;
  --slider-thumb-size: 1.3vw;
}

.switch {
  position: relative;
  display: inline-block;
  width: var(--switch-width);
  height: var(--switch-height);
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ff386a;
  transition: 0.8s;
  border-radius: 1vw
}

.slider:before {
  position: absolute;
  content: "";
  height: var(--slider-size);
  width: var(--slider-size);
  left: calc(var(--slider-thumb-size) / 3);
  bottom: calc(var(--slider-thumb-size) / 3);
  background-color: #fff;
  transition: 0.8s;
  border-radius: 1vw
}

input:checked + .slider {
  background-color: #4aff95;
}

input:focus + .slider {
  box-shadow: 0 0 1px #4aff95;
}

input:checked + .slider:before {
  transform: translateX(calc(var(--slider-size)));
}

`;
document.head.appendChild(style);
closeButton.addEventListener('click', () => {
    document.body.removeChild(uiElement);
    autoAnswer = false;
    showAnswers = false;
});

let isMinimized = false;

minimizeButton.addEventListener('click', () => {
    isMinimized = !isMinimized;

    if (isMinimized) {

        autoAnswerSwitchContainer.style.display = 'none';
        showAnswersSwitchContainer.style.display = 'none';

        uiElement.style.height = '2.5vw';
        handle.style.height = '100%';
        closeButton.style.height = '100%';
        minimizeButton.style.height = '100%';
    } else {
        handle.style.height = '2.5vw';
        uiElement.style.height = 'auto';
        closeButton.style.height = '2.5vw';
        minimizeButton.style.height = '2.5vw';

        autoAnswerSwitchContainer.style.display = 'flex';
        showAnswersSwitchContainer.style.display = 'flex';
    }
});

document.body.appendChild(uiElement);

let isDragging = false;
let offsetX, offsetY;

handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - uiElement.getBoundingClientRect().left;
    offsetY = e.clientY - uiElement.getBoundingClientRect().top;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        uiElement.style.left = x + 'px';
        uiElement.style.top = y + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

function getPair(str) {
    result = undefined
    pairs.forEach(function(pair) {
        if (pair[0] == str) {
            result = pair[1]
        }
        if (pair[1] == str) {
            result = pair[0]
        }
    })
    return result
}

function getAnswerIndex() {
    resultIdx = undefined

    answer = getPair(document.querySelector(".FormattedText").textContent)
    if (!answer) {
        location.reload();
        pairs = []
    }

    document.querySelectorAll(".a1w6enf9").forEach(function(elem, idx) {
        if (elem.textContent == answer) {
            resultIdx = idx
        }
    })

    return resultIdx
}

function answerQuestion(index) {
    try {
        document.querySelectorAll(".a1w6enf9")[index].click()
    } catch { return false}
    return true
}

function highlight(index) {
    document.querySelectorAll(".a1w6enf9").forEach(function(elem, idx) {
        if (idx == index) {
            elem.style.color = 'rgb(152, 241, 209)'
        } else {
            elem.style.color = 'rgb(218, 69, 67)'
        }

    })
}

const originalXhrOpen = XMLHttpRequest.prototype.open;
const originalXhrSend = XMLHttpRequest.prototype.send;

XMLHttpRequest.prototype.open = function (method, url, ...rest) {
  this._interceptedUrl = url; 
  return originalXhrOpen.call(this, method, url, ...rest);
};

XMLHttpRequest.prototype.send = function (...args) {
  this.addEventListener('load', function () {
    if (this.responseText) {
        let text = this.responseText
        let index = text.indexOf("42[")
        if (index != -1) {
            let cards = JSON.parse(text.slice(index+2))[1].cards
            pairs = cards.map(function (card){
                return card.cardSides.map(side => side.media[0].plainText)
            })
            console.log(pairs)
        }
    }
  });
  return originalXhrSend.call(this, ...args);
};

setInterval(function() {
 if (document.querySelector(".StudentEndView")) lastAnswer = ""
    if (pairs.length != 0) {
        if (document.querySelector(".FormattedText")) {
            const answerIndex = getAnswerIndex()

            if (autoAnswer && lastAnswer != answer) {
                 if (answerQuestion(answerIndex)) lastAnswer = answer
            }
            if (showAnswers) {
                highlight(answerIndex)
            } else {
                document.querySelectorAll(".a1w6enf9").forEach(function(elem) {
                    elem.style.color = '';
                });
            }
        }
    }
}, 1)
let isUIVisible = true; 

function toggleUIVisibility() {
    isUIVisible = !isUIVisible; 

    uiElement.style.display = isUIVisible ? 'block' : 'none';

    if (!isUIVisible) {
        autoAnswer = false;
        showAnswers = false;

        if (autoAnswerInput) autoAnswerInput.checked = false;
        if (showAnswersInput) showAnswersInput.checked = false;
    }
}

document.addEventListener('keydown', (event) => {
    if (event.altKey && event.key.toLowerCase() === 'x') {
        toggleUIVisibility(); 
    }
});