import logMessage from "./js/logger"

// Log message to console
logMessage("Successful express-webpack integration!")

const node = document.querySelector("#app")

const el = document.createElement("p")
el.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png" height="42" width="42">'
node.appendChild(el)
