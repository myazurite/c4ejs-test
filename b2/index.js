let toastMessage = null;

window.onload = () => {
	main();
	inputDefaultValues();
};

function main() {
	let colorSliderRed = document.getElementById("color-slider-red");
	let colorSliderGreen = document.getElementById("color-slider-green");
	let colorSliderBlue = document.getElementById("color-slider-blue");
	let copyBtn = document.getElementById("copyBtn");

	colorSliderRed.addEventListener("input", handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue));
	colorSliderGreen.addEventListener("input", handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue));
	colorSliderBlue.addEventListener("input", handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue));
	copyBtn.addEventListener("click", handleCopyBtn);
}

function handleColorSliders(red, green, blue) {
	return function () {
		const color = {
			red: parseInt(red.value),
			green: parseInt(green.value),
			blue: parseInt(blue.value)
		};
		updateColorCodeToDom(color);
	};
}

function handleCopyBtn() {
	let hexColor = document.getElementById("hex-input").value;
	if (hexColor && isValidHex(hexColor)) {
		window.navigator.clipboard.writeText(`#${hexColor}`);
		dynamicToastMsg(`#${hexColor}`);
	} else {
		alert("Invalid Hex!");
	}
}

function inputDefaultValues() {
	let color = { red: 221, green: 221, blue: 221 };
	updateColorCodeToDom(color);
}

function updateColorCodeToDom(color) {
	const hexColor = generateHexColor(color);
	const rgbColor = generateRGBColor(color);
	const cmykColor = generateCMYKColor(color);
	const hsvColor = generateHSVColor(color);
	const hslColor = generateHSLColor(color);

	document.getElementById("color-display").style.backgroundColor = `#${hexColor}`;
	document.getElementById("hex-input").value = hexColor;
	document.getElementById("rgb-input").value = rgbColor;
	document.getElementById("cmyk-input").value = cmykColor;
	document.getElementById("hsv-input").value = hsvColor;
	document.getElementById("hsl-input").value = hslColor;

	document.getElementById("color-slider-red-label").innerText = color.red;
	document.getElementById("color-slider-red").value = color.red;
	document.getElementById("color-slider-green-label").innerText = color.green;
	document.getElementById("color-slider-green").value = color.green;
	document.getElementById("color-slider-blue-label").innerText = color.blue;
	document.getElementById("color-slider-blue").value = color.blue;
}

function dynamicToastMsg(colorCode) {
	toastMessage = document.createElement("div");
	toastMessage.className = "toast-message toast-animation-slide-in";
	toastMessage.innerText = colorCode;
	document.body.appendChild(toastMessage);
	toastMessage.addEventListener("click", function () {
		toastMessage.classList.remove("toast-animation-slide-in");
		toastMessage.classList.add("toast-animation-slide-out");

		toastMessage.addEventListener("animationend", function () {
			toastMessage.remove();
			toastMessage = null;
		});
	});
}

function generateHexColor({ red, green, blue }) {
	function getTwoCode(value) {
		const hex = value.toString(16);
		return hex.length === 1 ? `0${hex}` : hex;
	}

	return `${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`.toUpperCase();
}

function generateRGBColor({ red, green, blue }) {
	return `rgb(${red}, ${green}, ${blue}`;
}

function generateCMYKColor({ red, green, blue }) {
	const r = red / 255;
	const g = green / 255;
	const b = blue / 255;
	const k = 1 - Math.max(r, g, b);
	const c = (1 - r - k) / (1 - k);
	const m = (1 - g - k) / (1 - k);
	const y = (1 - b - k) / (1 - k);
	return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;
}

function generateHSVColor({ red, green, blue }) {
	const r = red / 255;
	const g = green / 255;
	const b = blue / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const delta = max - min;
	let h, s, v;

	if (max === 0) {
		s = 0;
	} else {
		s = (delta / max) * 100;
	}

	if (max === min) {
		h = 0;
	} else {
		switch (max) {
			case r:
				h = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
				break;
			case g:
				h = ((b - r) / delta + 2) * 60;
				break;
			case b:
				h = ((r - g) / delta + 4) * 60;
				break;
		}
	}

	v = (max / 255) * 100;

	return `hsv(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(v)}%)`;
}

function generateHSLColor({ red, green, blue }) {
	const r = red / 255;
	const g = green / 255;
	const b = blue / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const delta = max - min;
	let h, s, l;

	l = (max + min) / 2;

	if (delta === 0) {
		h = 0;
		s = 0;
	} else {
		s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
		switch (max) {
			case r:
				h = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
				break;
			case g:
				h = ((b - r) / delta + 2) * 60;
				break;
			case b:
				h = ((r - g) / delta + 4) * 60;
				break;
		}
	}

	return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

document.getElementById("random-color-button").addEventListener("click", generateRandomColor);



function generateRandomColor() {
	const randomColor = getRandomColor();
	updateColorCodeToDom(randomColor);
	updateBackgroundColor(randomColor);
}

function updateBackgroundColor(color) {
	const hexColor = generateHexColor(color);
	document.body.style.backgroundColor = `#${hexColor}`;
}
function getRandomColor() {
	const red = getRandomValue(0, 255);
	const green = getRandomValue(0, 255);
	const blue = getRandomValue(0, 255);
	return { red, green, blue };
}

function getRandomValue(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isValidHex(hex) {
	return /^([0-9A-Fa-f]{3}){1,2}$/.test(hex);
}