const settingsBtn = document.querySelector('.side-bar-icon'),
	sideBar = document.querySelector('.sidebar-content'),
	darkModeBtn = document.querySelector('.dark'),
	lightModeBtn = document.querySelector('.light'),
	amount = document.querySelector('#amount'),
	amountNumber = document.querySelector('.blob-amount span'),
	backgroundBlur = document.querySelector('#blur'),
	section = document.querySelector('.section-1'),
	blob1 = document.querySelector('.blob-1'),
	customBlobs = document.querySelector('.custom-blobs')
// blob1.style.backgroundImage = 'linear-gradient(45deg ,var(--acc-color-2), var(--acc-color-4))'

window.onload = () => document.body.classList.add('darkmode')
settingsBtn.onclick = () => {
	sideBar.classList.toggle('active')
}

darkModeBtn.onclick = () => {
	document.body.classList.add('darkmode')
}
lightModeBtn.onclick = () => {
	document.body.classList.remove('darkmode')
}

backgroundBlur.onchange = () => {
	section.style.backdropFilter = `blur(${backgroundBlur.value}px)`
	if (backgroundBlur.value < 0) {
		return
	}
}

// Create Blobs
const createBlobs = (amount) => {
	for (let i = 1; i < amount; i++) {
		newDiv = document.createElement('div')
		newDiv.classList.add('blob')
		newDiv.classList.add(`blob-${[i]}`)
		document.body.appendChild(newDiv)
	}

	const blobs = [...document.getElementsByClassName('blob')],
		winWidth = window.innerWidth,
		winHeight = window.innerHeight

	let k = 0
	blobs.forEach((blob) => {
		k++
		randomTop = getRandomNumber(0, winHeight - 50)
		randomLeft = getRandomNumber(0, winWidth - 200)
		randomAccentColor = getRandomNumber(1, 7)
		randomAccentColor2 = getRandomNumber(1, 7)

		blob.style.top = randomTop + 'px'
		blob.style.left = randomLeft + 'px'
		blob.style.backgroundImage = `linear-gradient(45deg ,var(--acc-color-${Math.floor(randomAccentColor)}), var(--acc-color-${Math.floor(randomAccentColor2)}))`

		newDiv = document.createElement('div')
		newDiv.classList.add('blob-style')
		customBlobs.appendChild(newDiv)
		newDiv.innerHTML = ` First Color: <input type="color" class='color-input color-input-1' name="" id="color-${k}" value='${getComputedStyle(newDiv, '').getPropertyValue('--acc-color-' + `${Math.floor(randomAccentColor)}`)}'>` + `Second Color: <input type="color" class='color-input  color-input-2' name="" id="color-2-${k}" value='${getComputedStyle(newDiv, '').getPropertyValue('--acc-color-' + `${Math.floor(randomAccentColor2)}`)}'> <input type='button' class='confirmColor' id='${k}' value='Confirm'>`

		document.querySelectorAll('.confirmColor').forEach((confirm) => {
			confirm.addEventListener('click', (e) => {
				color1 = document.getElementById(`color-${e.target.id}`).value
                color2 = document.getElementById(`color-2-${e.target.id}`).value
                document.querySelector(`.blob-${e.target.id}`).style.backgroundImage = `linear-gradient(45deg ,${color1}, ${color2})`
			})
		})

	})
}
const getRandomNumber = (min, max) => {
	return Math.random() * (max - min) + min
}
const blobAmount = amount.value
createBlobs(blobAmount)

amount.onchange = () => {
	amountNumber.innerHTML = amount.value - 1
	const blobs = [...document.querySelectorAll('.blob')]
	const customBlobs = [...document.querySelectorAll('.blob-style')]
	blobs.forEach((blob) => {
		blob.parentNode.removeChild(blob)
	})
	customBlobs.forEach((blob) => {
		blob.parentNode.removeChild(blob)
	})
	createBlobs(amount.value)
}
